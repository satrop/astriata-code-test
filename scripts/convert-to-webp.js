const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Source and destination directories
const sourceDir = path.join(__dirname, "../src/img");
const distDir = path.join(__dirname, "../dist/img");

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Function to convert an image to WebP
async function convertToWebP(inputPath) {
  const filename = path.basename(inputPath);
  const filenameWithoutExt = path.parse(filename).name;
  const outputPath = path.join(distDir, `${filenameWithoutExt}.webp`);

  try {
    await sharp(inputPath)
      .webp({ quality: 80 }) // You can adjust quality as needed (0-100)
      .toFile(outputPath);
    console.log(`Converted: ${filename} -> ${filenameWithoutExt}.webp`);

    // Also copy the original file to the dist directory for backward compatibility
    const originalOutputPath = path.join(distDir, filename);
    fs.copyFileSync(inputPath, originalOutputPath);
    console.log(`Copied original: ${filename}`);
  } catch (error) {
    console.error(`Error converting ${filename}:`, error);
  }
}

// Process all images in the directory
async function processDirectory() {
  try {
    const files = fs.readdirSync(sourceDir);

    // Filter JPG and PNG files
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
    });

    console.log(`Found ${imageFiles.length} image files to convert`);

    // Process each file
    const promises = imageFiles.map((file) =>
      convertToWebP(path.join(sourceDir, file))
    );

    await Promise.all(promises);
    console.log("All images converted successfully!");
  } catch (error) {
    console.error("Error processing directory:", error);
  }
}

// Run the conversion
processDirectory();
