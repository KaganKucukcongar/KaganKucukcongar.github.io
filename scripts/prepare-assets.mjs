import { copyFile, mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

await mkdir("public", { recursive: true });
// Keep the original published files untouched; only copy approved assets into the export.
await Promise.all([
  copyFile("CNAME", "public/CNAME"),
  copyFile("k.png", "public/k.png"),
  writeFile("public/.nojekyll", ""),
  sharp("public/social.svg").png().toFile("public/social.png"),
]);
