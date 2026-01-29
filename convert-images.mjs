import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, 'src', 'assets');

const images = [
    'manitos.jpg',
    'travels.jpg',
    'wyndham.jpg',
    'space.jpg'
];

async function convertToWebP() {
    for (const image of images) {
        const inputPath = join(assetsDir, image);
        const outputPath = join(assetsDir, image.replace('.jpg', '.webp'));

        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️  ${image} not found, skipping...`);
            continue;
        }

        try {
            await sharp(inputPath)
                .webp({ quality: 85 })
                .toFile(outputPath);

            const originalSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(outputPath).size;
            const savings = ((1 - newSize / originalSize) * 100).toFixed(2);

            console.log(`✅ ${image} → ${image.replace('.jpg', '.webp')} (${savings}% smaller)`);
        } catch (error) {
            console.error(`❌ Error converting ${image}:`, error.message);
        }
    }

    console.log('\n🎉 Image conversion complete!');
}

convertToWebP();
