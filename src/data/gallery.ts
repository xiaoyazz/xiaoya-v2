import type { GalleryItem } from './types';

// The Photos carousel: personal photos in public/assets/photos.
// `title` is the name shown in the Photos window; file names are URL-safe versions of it.
// width/height are the displayed (upright) size; files are 1600px on the long edge.
export const galleryItems: GalleryItem[] = [
  { id: 'mycatt', file: 'mycatt.jpg', src: 'assets/photos/mycatt.jpg', title: 'mycatt', width: 1200, height: 1600 },
  { id: 'qingdao', file: 'qingdao.jpg', src: 'assets/photos/qingdao.jpg', title: 'qingdao', width: 1200, height: 1600 },
  { id: 'smore', file: 'smore.jpg', src: 'assets/photos/smore.jpg', title: 's’more', width: 1200, height: 1600 },
  { id: 'presquile-provincial-park', file: 'presquile-provincial-park.jpg', src: 'assets/photos/presquile-provincial-park.jpg', title: 'presqu’ile provincial park', width: 1200, height: 1600 },
  { id: 'snowboarding', file: 'snowboarding.jpg', src: 'assets/photos/snowboarding.jpg', title: '🏂', width: 1200, height: 1600 },
  { id: 'spicyyy', file: 'spicyyy.jpg', src: 'assets/photos/spicyyy.jpg', title: 'spicyyy', width: 1200, height: 1600 },
  { id: 'summer', file: 'summer.jpg', src: 'assets/photos/summer.jpg', title: 'summer', width: 1200, height: 1600 },
];
