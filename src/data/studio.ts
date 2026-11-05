import { IMAGES, SITE } from '../config/site';

export const SERVICES = [
  {
    number: '01', title: 'Recording', intro: 'A considered space to capture performances with detail and intention.',
    items: ['Recording sessions', 'Karaoke recordings', 'Voiceover & dubbing', 'Film dubbing', 'Foley recording', 'Instrument recording'],
  },
  {
    number: '02', title: 'Music production', intro: 'From the first musical idea to a finished, release-ready production.',
    items: ['Original songs', 'Cover songs', 'Karaoke songs', 'Remixes & fusions', 'Jingles / TV / radio ads', 'Film & background scores', 'Voiceovers', 'Podcasts', 'Sound design', 'Reels & AV'],
  },
  {
    number: '03', title: 'Mix & master', intro: 'Translation, balance and impact across listening environments.',
    items: ['Stereo (2.1) mix & master', '5.1 mix & master', 'Dolby mix & master'],
  },
  {
    number: '04', title: 'Video production', intro: 'A visual idea, developed from concept and direction through finishing.',
    items: ['Video shoot', 'Video editing', 'Colour grading / DI', 'Direction & concept', 'Script writing'],
  },
  {
    number: '05', title: 'Artist branding & consulting', intro: 'Creative and release support for artists building a lasting presence.',
    items: ['Branding', 'Cover art', 'Consultation', 'Distribution', 'Legal coordination', 'Online promotion & social media', 'Collaborations', 'Record label support'],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Vishal Malviya',
    quote: 'First of all its not easy to record in studio but Aikarth & Guru datt these two buddies make it so easy even for any beginner. If you want to record a class apart music you have only one place that’s the baselard studios and believe me its my experience. Thank you for your awesome work.',
    rating: 'Rated 5 out of 5',
  },
  {
    name: 'Lokesh Paliwal',
    quote: 'Baselard is more than a studio, it offers creative space, tecinical support and quality music production services at very reasonable price.',
    rating: 'Rated 5 out of 5',
  },
  {
    name: 'Yogendra Purohit',
    quote: 'I recommend you all the time because you guys are the best. Your playing and recording quality are of the highest stand-ards. You do great work at a very fair price. I’m really impressed with your work !!',
    rating: 'Rated 5 out of 5',
  },
  {
    name: 'Shipra Majumdar',
    quote: 'Best music studio in udaipur. Professionalism and music quality is on point. Dedication and hardwork of the team can be seen in each and every song the studio composes.',
    rating: 'Rated 5 out of 5',
  },
];

export interface PressOutlet {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Collaborator {
  id: string;
  name: string;
  note: string;
  category: string;
  badge: string;
}

export const PRESS_OUTLETS: PressOutlet[] = [
  { id: 'the-statesman', name: 'The Statesman', url: 'https://www.thestatesman.com/', type: 'National Broadsheet' },
  { id: 'ani', name: 'ANI', url: 'https://www.aninews.in/', type: 'News Agency' },
  { id: 'mid-day', name: 'Mid-Day', url: 'https://www.mid-day.com/', type: 'Daily Newspaper' },
  { id: 'yahoo-news', name: 'Yahoo News', url: 'https://ca.news.yahoo.com/', type: 'Digital Media' },
  { id: 'dailyhunt', name: 'Dailyhunt', url: 'https://m.dailyhunt.in/', type: 'News Aggregator' },
  { id: 'ibtimes', name: 'IBTimes', url: 'https://www.ibtimes.sg/', type: 'Business Press' },
  { id: 'udaipurblog', name: 'UdaipurBlog', url: 'https://udaipurblog.com/', type: 'City & Culture' },
  { id: 'latestly', name: 'LatestLY', url: 'https://www.latestly.com/', type: 'Digital Publishing' },
];

export const COLLABORATORS: Collaborator[] = [
  {
    id: 'zee-music',
    name: 'Zee Music Company',
    category: 'Record Label & Publishing',
    note: 'Music label / release credit',
    badge: 'RELEASE LABEL',
  },
  {
    id: 'global-music',
    name: 'Global Music Junction',
    category: 'Music Distribution & Label',
    note: 'Music label / release credit',
    badge: 'DISTRIBUTION',
  },
  {
    id: 'balaji-telefilms',
    name: 'Balaji Telefilms',
    category: 'Film & Television Production',
    note: 'Film production collaboration',
    badge: 'PRODUCTION',
  },
];

export const AWARDS = [
  'Making Udaipur Proud — Shades of Udaipur',
  'Sangeet Gaurav Award',
  'Social Media Influencer — Mewar Award',
  'Rotary Foundation Award',
  'Independence Award — St. Mathew’s School',
];

export const STUDIO = {
  founder: 'Aikarth Purohit',
  role: 'Music Director · Singer · Founder',
  founded: SITE.founded,
  location: 'Udaipur, Rajasthan',
  intro: 'Baselard Studios is an independent audio-visual studio in Udaipur, bringing music production, recording, mix & mastering, video production and artist services together under one roof.',
  story: 'Built around a love of music and the craft behind it, the studio works with artists, performers and brands to take ideas from a first recording to a finished release. Its public work spans original songs, film music, dubbing, commercial audio and video.',
  images: IMAGES,
};
