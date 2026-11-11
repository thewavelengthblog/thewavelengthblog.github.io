import path from 'node:path';
import { imageSizeFromFile } from 'image-size/fromFile';

// True when an uploaded cover image is taller than it is wide (a poster).
// Posters are shown whole, wide images are cropped to fill their frame.
export async function isPortrait(cover) {
  if (!cover || !cover.startsWith('/')) return false;
  try {
    const file = path.join(process.cwd(), 'public', decodeURIComponent(cover));
    const { width, height } = await imageSizeFromFile(file);
    return height > width;
  } catch {
    return false;
  }
}
