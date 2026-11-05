export type ProjectCategory = 'Originals' | 'Film & screen' | 'Artist collaborations' | 'YouTube discovery';
export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  services: string;
  summary: string;
  featured?: boolean;
  visual: 'mic' | 'console' | 'live' | 'type';
  watchUrl: string;
  publishedAt?: string;
};

import { YOUTUBE_RELEASES } from './generated/youtube-releases';

const yt = (query: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

/** Titles and service credits are drawn from the public Originals page and homepage. */
export const PROJECTS: Project[] = [
  { id: 'mera-dil-pahadon-me', title: 'Mera Dil Pahadon Me — Shrey & Aikarth', category: 'Originals', services: 'Music production · Recording · Mix & master', summary: 'A melodic original release credited on the studio homepage.', featured: true, visual: 'live', watchUrl: yt('Mera Dil Pahadon Me Shrey Aikarth') },
  { id: 'chhore-rajasthan-ke', title: 'Chhore Rajasthan Ke — Baawale Chore', category: 'Artist collaborations', services: 'Music direction · Recording · Mix & master', summary: 'A regional collaboration from the studio’s recent-project list.', featured: true, visual: 'type', watchUrl: yt('Chhore Rajasthan Ke Baawale Chore') },
  { id: 'sabarmati-raja-ram', title: 'The Sabarmati Report — Raja Ram (Teaser Version)', category: 'Film & screen', services: 'Music direction · Recording · Mix & master', summary: 'A film-song collaboration listed in the studio’s public work archive.', featured: true, visual: 'console', watchUrl: yt('The Sabarmati Report Raja Ram teaser Baselard Studios') },
  { id: 'tum-prem-ho', title: 'Tum Prem Ho', category: 'Film & screen', services: 'Dubbing', summary: 'Dubbing credit listed in the public Originals archive.', visual: 'mic', watchUrl: yt('Tum Prem Ho Baselard Studios') },
  { id: 'raja-ram-female', title: 'Raja Ram — Female Version', category: 'Film & screen', services: 'Music production · Lyrics', summary: 'A companion version listed in the studio’s Originals archive.', visual: 'type', watchUrl: yt('Raja Ram Female Version Baselard Studios') },
  { id: 'raja-ram-male', title: 'Raja Ram — Male Version', category: 'Film & screen', services: 'Music direction · Recording · Mix & master', summary: 'A companion version listed in the studio’s Originals archive.', visual: 'console', watchUrl: yt('Raja Ram Male Version Baselard Studios') },
  { id: 'naina-milaike', title: 'Naina Milaike — Sanjay & Aikarth', category: 'Originals', services: 'Lyrics · Music direction · Arrangement · Mix & master · Composition · Dubbing', summary: 'A traditional-fusion collaboration credited on the public archive.', visual: 'live', watchUrl: yt('Naina Milaike Sanjay Aikarth') },
  { id: 'rdx-kaam-ka-hisaab', title: 'Kaam Ka Hisaab — RDX', category: 'Artist collaborations', services: 'Music production · Recording · Mix & master', summary: 'A record-label release credited to the studio.', visual: 'type', watchUrl: yt('RDX Kaam Ka Hisaab Aikarth') },
  { id: 'rdx-matlab-ki-baat', title: 'Matlab Ki Baat — RDX', category: 'Artist collaborations', services: 'Music production · Recording · Mix & master', summary: 'An artist collaboration listed in the public archive.', visual: 'console', watchUrl: yt('RDX Matlab Ki Baat Baselard Studios') },
  { id: 'aao-piyaji', title: 'Aao Piyaji — Baawale Chore', category: 'Artist collaborations', services: 'Music direction · Arrangement · Mix & master · Dubbing', summary: 'A regional music production credit from the public archive.', visual: 'live', watchUrl: yt('Aao Piyaji Baawale Chore') },
  { id: 'antaheen', title: 'Antaheen — Shrey', category: 'Originals', services: 'Music direction · Recording · Mix & master', summary: 'An original song credit listed by the studio.', visual: 'mic', watchUrl: yt('Antaheen Shrey Baselard Studios') },
  { id: 'haan-hum-desi-hai', title: 'Haan Hum Desi Hai — Baawale Chore', category: 'Artist collaborations', services: 'Music direction · Recording · Mix & master', summary: 'A regional music production credit from the public archive.', visual: 'type', watchUrl: yt('Haan Hum Desi Hai Baawale Chore') },
  { id: 'kaya-praveen', title: 'Kaya — Praveen Bhaiya', category: 'Artist collaborations', services: 'Music direction · Recording · Arrangements · Backing vocals · Mix & master', summary: 'A song production credit listed in the public archive.', visual: 'mic', watchUrl: yt('Kaya Praveen Bhaiya Baselard Studios') },
  { id: 'durge-nandini', title: 'Durge Nandini — Praveen Bhaiya', category: 'Artist collaborations', services: 'Music direction · Recording · Arrangements · Backing vocals · Mix & master', summary: 'A song production credit listed in the public archive.', visual: 'type', watchUrl: yt('Durge Nandini Praveen Bhaiya') },
  { id: 'meri-aankhein', title: 'Meri Aankhein — Gaurav Medatwal', category: 'Artist collaborations', services: 'Music direction · Recording · Mix & master', summary: 'A song production credit listed in the public archive.', visual: 'live', watchUrl: yt('Meri Aankhein Gaurav Medatwal') },
  { id: 'pehla-ishq', title: 'Pehla Ishq — Vishal', category: 'Artist collaborations', services: 'Music production · Recording · Mix & master', summary: 'A song production credit listed in the public archive.', visual: 'mic', watchUrl: yt('Pehla Ishq Vishal Baselard Studios') },
  { id: 'aisa-desh', title: 'Aisa Desh Banana Hai — Gaurav', category: 'Originals', services: 'Lyrics · Music direction · Arrangement · Mix & master · Composition · Dubbing', summary: 'A song production credit listed in the public archive.', visual: 'type', watchUrl: yt('Aisa Desh Banana Hai Gaurav Baselard') },
  { id: 'ek-taraf', title: 'Ek Taraf Thi Jab Mohabbat', category: 'Originals', services: 'Lyrics · Music direction · Arrangement · Mix & master · Composition · Dubbing', summary: 'A song production credit listed in the public archive.', visual: 'console', watchUrl: yt('Ek Taraf Thi Jab Mohabbat Baselard Studios') },
  { id: 'tujhko-pata-hai', title: 'Tujhko Pata Hai — Shrey', category: 'Originals', services: 'Music production & direction · Recording · Guitar · Mix & master', summary: 'A song production credit listed in the public archive.', visual: 'live', watchUrl: yt('Tujhko Pata Hai Shrey Baselard Studios') },
  { id: 'tu-hi-zameen', title: 'Tu Hi Zameen', category: 'Originals', services: 'Music production · Music direction · Recording · Mix & master', summary: 'A song production credit listed in the public archive.', visual: 'mic', watchUrl: yt('Tu Hi Zameen Baselard Studios') },
  { id: 'kaise-batau', title: 'Kaise Batau — Sahil', category: 'Originals', services: 'Music production · Recording · Mix & master', summary: 'A song production credit listed in the public archive.', visual: 'type', watchUrl: yt('Kaise Batau Sahil Baselard Studios') },
  { id: 'chalo-ayodhya', title: 'Chalo Ayodhya Dham — Baawale Chore', category: 'Artist collaborations', services: 'Music direction · Recording · Mix & master', summary: 'A regional music production credit listed in the public archive.', visual: 'console', watchUrl: yt('Chalo Ayodhya Dham Baawale Chore') },
];

export const YOUTUBE_PROJECTS: Project[] = YOUTUBE_RELEASES.map((release) => ({
  id: `youtube-${release.videoId}`,
  title: release.title,
  category: 'YouTube discovery',
  services: 'Auto-discovered release · verify studio credit before featuring',
  summary: release.description.slice(0, 190) || 'Public upload from the configured YouTube channel.',
  visual: 'type',
  watchUrl: `https://www.youtube.com/watch?v=${release.videoId}`,
  publishedAt: release.publishedAt,
}));

// Auto-discovered releases appear first in the archive. The homepage uses the latest
// three only after the feed has been explicitly configured; otherwise it uses the
// three projects currently featured on Baselard's public homepage.
const knownTitles = new Set(PROJECTS.map((project) => project.title.toLowerCase()));
export const ALL_PROJECTS = [
  ...YOUTUBE_PROJECTS.filter((project) => !knownTitles.has(project.title.toLowerCase())),
  ...PROJECTS,
];
export const FEATURED_PROJECTS = YOUTUBE_PROJECTS.length
  ? [...YOUTUBE_PROJECTS].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')).slice(0, 3)
  : PROJECTS.filter((project) => project.featured);
