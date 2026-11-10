/**
 * Hero Ritual — client behaviour.
 * - Turntable state machine: idle -> dropping -> playing (10s) -> lifting -> idle
 * - Animated wave + SOUND letters riding it
 * - Web Audio synth (no audio file needed; created lazily on first click)
 * - Vinyl light, custom cursor (mouse only)
 * Loops pause when the hero is off-screen or the tab is hidden.
 */

type State = "idle" | "dropping" | "playing" | "lifting";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const PLAY_SECONDS = 10;
const ARM_PARKED = 5;
const ARM_ON_RECORD = 64;

// precomputed wave envelope (x every 4 units across the 640-wide viewBox)
const XS: number[] = [];
const ENV: number[] = [];
for (let x = 0; x <= 640; x += 4) {
  XS.push(x);
  ENV.push(Math.pow(Math.sin((Math.PI * x) / 640), 1.1));
}

function drawWave(paths: SVGPathElement[], amp: number, ph: number, bump: number, bx: number) {
  const hasBump = bump > 0.001;
  paths.forEach((p, i) => {
    let d = "";
    for (let n = 0; n < XS.length; n++) {
      const x = XS[n];
      const s = Math.sin(x * 0.034 + ph * (1 + i * 0.3) + i) + 0.55 * Math.sin(x * 0.071 - ph * 1.3);
      const b = hasBump ? 1 + bump * Math.exp(-Math.pow((x - bx) / 80, 2)) : 1;
      const y = 90 - (amp * (i ? 0.42 : 1) * b * 62 * ENV[n] * s) / 1.55;
      d += (n ? "L" : "M") + x + " " + y.toFixed(1);
    }
    p.setAttribute("d", d);
  });
}

function initHeroRitual(): void {
  const root = document.querySelector<HTMLElement>("[data-hero-ritual]");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";

  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector(sel) as T;
  const art = $(".hr-art");
  const turntable = $(".hr-turntable");
  const disc = $(".hr-disc");
  const arm = $<SVGGElement>(".hr-arm");
  const ring = $(".hr-ring");
  const sheen = $(".hr-sheen");
  const glint = $(".hr-glint");
  const waveSvg = $<SVGSVGElement>(".hr-wave");
  const cueEl = $(".hr-cue");
  const cueText = $(".hr-cue span");
  const cursor = $(".hr-cursor");
  const rec = $(".hr-rec");
  const title = $(".hr-title");
  const vision = $(".hr-vision");
  const paths = [...waveSvg.querySelectorAll<SVGPathElement>("path")];
  const letters = [...root.querySelectorAll<HTMLElement>(".hr-l")];

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const ac = new AbortController();
  const { signal } = ac;

  // ---------- state ----------
  let state: State = "lifting"; // starts on the record, lifts off after a short delay
  let tS = -0.6; // seconds in current state (negative = start delay)
  let armFrom = ARM_ON_RECORD;
  let armA = ARM_ON_RECORD;
  let played = false;
  let ign = 0; // 0..1 how "alive" the wave is
  let rot = 0;
  let phase = 0;
  let mx = -1e4;
  let my = -1e4;
  let hasPointer = false;
  let prox = 0;
  let level = 0;
  let cs = 1;
  let sn = 0;
  let glow = 0;
  let gx = 50;
  let gy = 50;
  let drift = 0;
  let cpx = 0;
  let cpy = 0;
  let cursorInit = false;
  let cursorMode = "";
  let recLive = false;
  const tLoad = performance.now();
  let last = tLoad;

  // ---------- audio (lazy, synthesised) ----------
  let ctx: AudioContext | undefined;
  let analyser: AnalyserNode | undefined;
  let master: GainNode | undefined;
  let timer: number | undefined;
  let audioOn = false;
  let buf: Uint8Array<ArrayBuffer> | undefined;

  const kick = () => {
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.18);
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.4);
  };

  const initAudio = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    buf = new Uint8Array(512);
    master.connect(analyser);
    analyser.connect(ctx.destination);
    const lp = ctx.createBiquadFilter();
    lp.frequency.value = 300;
    const pad = ctx.createGain();
    pad.gain.value = 0.22;
    ([[55, "sine"], [82.4, "triangle"], [110, "sine"]] as [number, OscillatorType][]).forEach(([f, type]) => {
      const o = ctx!.createOscillator();
      o.type = type;
      o.frequency.value = f;
      o.connect(lp);
      o.start();
    });
    lp.connect(pad).connect(master);
  };

  const startSound = () => {
    if (!ctx || !master) return;
    audioOn = true;
    master.gain.setTargetAtTime(0.35, ctx.currentTime, 0.05);
    kick();
    timer = window.setInterval(kick, 500);
  };

  const stopSound = () => {
    audioOn = false;
    if (timer) window.clearInterval(timer);
    timer = undefined;
    if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
  };

  // ---------- cue ----------
  const setCue = (txt: string | null) => {
    if (txt === null) cueEl.classList.add("is-hidden");
    else {
      cueText.textContent = txt;
      cueEl.classList.remove("is-hidden");
    }
  };

  // ---------- transitions ----------
  const beginDrop = () => {
    if (!ctx) initAudio();
    void ctx!.resume();
    state = "dropping";
    armFrom = armA;
    tS = 0;
    setCue(null);
  };

  const beginLift = () => {
    state = "lifting";
    armFrom = armA;
    tS = 0;
    stopSound();
  };

  const land = () => {
    played = true;
    if (!reduce) {
      ring.classList.remove("is-go");
      void ring.offsetWidth; // restart the CSS animation
      ring.classList.add("is-go");
    }
    startSound();
  };

  const toggle = () => {
    if (state === "playing") beginLift();
    else if (state === "idle" || state === "lifting") beginDrop();
  };

  // ---------- frame ----------
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    tS += dt;
    const T = (now - tLoad) / 1000;

    if (state === "dropping") {
      armA = armFrom + (ARM_ON_RECORD - armFrom) * easeInOut(clamp(tS / 1.7));
      if (tS >= 1.7) {
        state = "playing";
        tS = 0;
        land();
      }
    } else if (state === "playing") {
      armA = ARM_ON_RECORD - 2 * easeOut(clamp(tS / 0.6));
      if (tS >= PLAY_SECONDS) beginLift();
    } else if (state === "lifting") {
      armA = armFrom + (ARM_PARKED - armFrom) * easeInOut(clamp(tS / 1.5));
      if (tS >= 1.5) {
        state = "idle";
        armA = ARM_PARKED;
        setCue(played ? "Click to replay" : "Click the record to play");
      }
    }
    arm.style.transform = `rotate(${armA}deg)`;

    // record keeps spinning at all times (ramps up on load)
    const spin = clamp(T / 2.5);
    if (!reduce) rot += (360 / 28) * easeOut(spin) * dt;
    disc.style.transform = `rotate(${rot}deg)`;

    // wave "aliveness"
    const target = state === "playing" ? 1 : 0;
    ign = target > ign ? Math.min(1, ign + dt * 0.45) : Math.max(0, ign - dt * 0.9);
    const ie = ign * ign * (3 - 2 * ign);
    const kk = state === "playing" ? 0.5 * Math.exp(-tS * 2.5) : 0;

    // pointer proximity to the art block
    const r = art.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    prox += (clamp(1 - Math.hypot(mx - cx, my - cy) / r.width / 0.75) - prox) * 0.08;

    // custom cursor: flies out of the REC dot over the player, back into it when leaving
    if (fine) {
      const inside = hasPointer && mx > r.left && mx < r.right && my > r.top && my < r.bottom;
      const dr = rec.getBoundingClientRect();
      const hx = dr.width ? dr.left + dr.width / 2 : mx;
      const hy = dr.width ? dr.top + dr.height / 2 : my;
      if (!cursorInit) {
        cpx = hx;
        cpy = hy;
        cursorInit = true;
      }
      cpx += ((inside ? mx : hx) - cpx) * 0.16;
      cpy += ((inside ? my : hy) - cpy) * 0.16;
      cursor.style.transform = `translate3d(${cpx}px,${cpy}px,0)`;
      cursor.classList.toggle("is-on", inside);
      const mode = state === "playing" ? "stop" : state === "dropping" ? "busy" : "play";
      if (mode !== cursorMode) {
        cursorMode = mode;
        cursor.classList.toggle("is-stop", mode === "stop");
        cursor.classList.toggle("is-busy", mode === "busy");
      }
    }

    const live = state === "playing";
    if (live !== recLive) {
      recLive = live;
      rec.classList.toggle("is-live", live);
    }

    // audio level -> wave / letters / record pulse
    let rms = 0;
    if (audioOn && analyser && buf) {
      analyser.getByteTimeDomainData(buf);
      let s = 0;
      for (let i = 0; i < buf.length; i++) {
        const n = (buf[i] - 128) / 128;
        s += n * n;
      }
      rms = Math.sqrt(s / buf.length);
    }
    level += (rms - level) * 0.25;

    const wr = waveSvg.getBoundingClientRect();
    const bx = ((mx - wr.left) / wr.width) * 640;
    const amp = 0.65 * (1 - ie) + ie * (0.6 + 0.7 * prox + level * 2.4) + kk;
    phase += dt * (0.35 + 1.25 * ie + ie * (2.2 * prox + level * 6));
    drawWave(paths, amp, phase, ie * prox * 1.1, bx);

    const aL = 0.5 * (1 - ie) + ie * (1 + 0.35 * prox + level * 2);
    for (let i = 0; i < letters.length; i++) {
      const s = Math.sin(i * 1.15 + phase * 2.4);
      letters[i].style.transform = `translateY(${(s * aL * 7).toFixed(1)}px) scaleY(${(1 + 0.035 * s).toFixed(3)})`;
    }

    // vinyl light follows the pointer angle (drifts slowly when no pointer)
    drift += dt;
    const tr = turntable.getBoundingClientRect();
    const tx = tr.left + tr.width / 2;
    const ty = tr.top + tr.height / 2;
    const ang = hasPointer ? Math.atan2(my - ty, mx - tx) + Math.PI / 2 : drift * 0.1;
    cs += (Math.cos(ang) - cs) * 0.07;
    sn += (Math.sin(ang) - sn) * 0.07;
    sheen.style.setProperty("--a", `${(Math.atan2(sn, cs) * 180) / Math.PI}deg`);
    sheen.style.opacity = String(0.3 + 0.7 * easeOut(spin));
    const g = hasPointer ? clamp(1.1 - Math.hypot(mx - tx, my - ty) / tr.width) : 0;
    glow += (g - glow) * 0.1;
    gx += ((((mx - tr.left) / tr.width) * 100 || 50) - gx) * 0.2;
    gy += ((((my - tr.top) / tr.height) * 100 || 50) - gy) * 0.2;
    glint.style.setProperty("--go", String(glow));
    glint.style.setProperty("--gx", `${gx}%`);
    glint.style.setProperty("--gy", `${gy}%`);

    turntable.style.scale = String(1 + level * 0.05);
  };

  // ---------- loop control (pauses off-screen / hidden tab) ----------
  let raf = 0;
  let visible = true;
  const loop = (now: number) => {
    frame(now);
    raf = requestAnimationFrame(loop);
  };
  const start = () => {
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      root.classList.toggle("is-paused", !visible);
      if (visible && !document.hidden) start();
      else {
        if (state === "playing") beginLift(); // never leave sound running off-screen
        stop();
      }
    },
    { threshold: 0.01 }
  );
  io.observe(root);

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        if (state === "playing") beginLift();
        stop();
      } else if (visible) start();
    },
    { signal }
  );

  // ---------- input ----------
  window.addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      hasPointer = true;
    },
    { signal, passive: true }
  );

  art.addEventListener("click", toggle, { signal });
  art.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    { signal }
  );

  // click the headline: replay the VISION focus-pull
  title.addEventListener(
    "click",
    () => {
      vision.style.animation = "none";
      void vision.offsetWidth;
      vision.style.animation = "";
    },
    { signal }
  );

  // ---------- teardown (Astro view transitions) ----------
  document.addEventListener(
    "astro:before-swap",
    () => {
      ac.abort();
      io.disconnect();
      stop();
      stopSound();
      void ctx?.close();
    },
    { once: true }
  );

  start();
}

initHeroRitual();
// re-init after client-side navigation when <ViewTransitions /> is enabled
document.addEventListener("astro:page-load", initHeroRitual);
