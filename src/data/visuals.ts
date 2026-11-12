export interface VideoEntry {
  id: number;
  title: string;
  date: string;
  duration: string;
  thumb: string;
  url: string;
  master?: string;
  edition?: string;
}

// 1. ARCHIVO DE VIDEO COMPLETO (reutilizado)
export const videos: VideoEntry[] = [
  { id: 1, title: "Badder Inverview: Lucas Ferro X Luis Zerillo", date: "2024.09", duration: "21:37", thumb: "https://img.youtube.com/vi/iHym3gylzV0/0.jpg", url: "https://www.youtube.com/watch?v=iHym3gylzV0&t=92s", edition: "Agustin Galeazzi - Uriel Galeano - Lucas Nicolas Bengochea" },
  { id: 2, title: "Badder Showcase @anguis._", date: "2025.03", duration: "1:27:04", thumb: "https://img.youtube.com/vi/3ahzMf9fGlQ/0.jpg", url: "https://www.youtube.com/watch?v=3ahzMf9fGlQ&t=2103s", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 3, title: "Badder Showcase - Juanma Daguerre", date: "2025.03", duration: "1:47:02", thumb: "https://img.youtube.com/vi/nMTN10KK_iA/0.jpg", url: "https://www.youtube.com/watch?v=nMTN10KK_iA", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 4, title: "Badder Showcase - Uriel Galeano", date: "2025.03", duration: "1:18:52", thumb: "https://img.youtube.com/vi/zaPx9fMtTBs/0.jpg", url: "https://www.youtube.com/watch?v=zaPx9fMtTBs", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 5, title: "Anguis & Juani Pollini | EMERGENT X BADDER", date: "2025.03", duration: "1:34:35", thumb: "https://img.youtube.com/vi/agPtIpnsQnI/0.jpg", url: "https://www.youtube.com/watch?v=agPtIpnsQnI", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 6, title: "Uriel Galeano | EMERGENT X BADDER", date: "2025.03", duration: "1:28:01", thumb: "https://img.youtube.com/vi/O1OO_UqMUQA/0.jpg", url: "https://www.youtube.com/watch?v=O1OO_UqMUQA&t=5111s", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
];

// 2. MOTION FLYERS (Extraídos desde FlyerSection)
export const motionProjects = [
  { id: 1, title: "BADDER SHOWCASE - TOM", designer: "Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/u4OHM6iSZHc/maxresdefault.jpg", link: "https://www.youtube.com/shorts/u4OHM6iSZHc", desc: "Pieza promocional audiovisual para el evento.", context: "Campaña IG Reels / TikTok" },
  { id: 3, title: "EMERGENT X BADDER", designer: "Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/hDdVop4HASI/maxresdefault.jpg", link: "https://www.youtube.com/shorts/hDdVop4HASI", desc: "Teaser conceptual formato vertical.", context: "Archivo RRSS" },
  { id: 5, title: "BOOTLEG SESSION PROMO", designer: "Nahuel Matias Bengochea - Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/vspTa2EnaMk/maxresdefault.jpg", link: "https://www.youtube.com/shorts/vspTa2EnaMk", desc: "Motion flyer promocionando el segundo drop.", context: "Lanzamiento indumentaria" },
  { id: 7, title: "ROSSET CLUB", designer: "Lucas Nicolas Bengochea", date: "2025", thumb: "https://img.youtube.com/vi/5J9-T1h2cMA/maxresdefault.jpg", link: "https://www.youtube.com/shorts/5J9-T1h2cMA", desc: "Promoción oficial fecha Rosset.", context: "Campaña digital" },
  { id: 12, title: "YOU LOOK AT ME (ORIGINAL MIX) VISUAL CONCEPT", designer: "Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/DpxjA5v0SuM/maxresdefault.jpg", link: "https://www.youtube.com/watch?v=DpxjA5v0SuM", desc: "Concepto visual inmersivo acompañando el track original.", context: "YouTube Visualizer" },
];
