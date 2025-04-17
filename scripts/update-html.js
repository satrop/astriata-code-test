const fs = require("fs");
const path = require("path");

// Path to the HTML file
const htmlFilePath = path.join(__dirname, "../index.html");

// Function to update image references in HTML
function updateHTML() {
  try {
    // Read the HTML file
    let htmlContent = fs.readFileSync(htmlFilePath, "utf8");

    // Find all image references to jpg and png files
    const imgPattern = /src="(.*\.(jpg|jpeg|png))"/gi;
    let match;
    let replacements = [];

    while ((match = imgPattern.exec(htmlContent)) !== null) {
      const fullMatch = match[0];
      const imgPath = match[1];

      // Skip SVG images
      if (imgPath.includes(".svg")) {
        continue;
      }

      // Extract filename and path
      const filename = path.basename(imgPath);
      const filenameWithoutExt = path.parse(filename).name;
      const dirPath = path.dirname(imgPath);

      // Create the WebP path
      const webpPath = `${dirPath}/${filenameWithoutExt}.webp`;

      // Create the picture element replacement
      const pictureElement = `<picture>
        <source srcset="${webpPath}" type="image/webp">
        <source srcset="${imgPath}" type="image/${path
        .extname(imgPath)
        .slice(1)}">
        <img src="${imgPath}" alt="${getAltText(fullMatch)}" ${getImgAttributes(
        fullMatch
      )}>
      </picture>`;

      replacements.push({
        original: fullMatch,
        replacement: pictureElement,
        imgTag: match[0],
      });
    }

    // Apply replacements in reverse order to avoid position issues
    replacements.reverse().forEach((item) => {
      // Replace the img tag with the picture element
      htmlContent = htmlContent.replace(
        new RegExp("<img\\s+[^>]*" + escapeRegExp(item.imgTag) + "[^>]*>", "g"),
        item.replacement
      );
    });

    // Write the updated HTML back to the file
    fs.writeFileSync(htmlFilePath, htmlContent);
    console.log("HTML file updated with WebP picture elements");
  } catch (error) {
    console.error("Error updating HTML:", error);
  }
}

// Helper function to extract alt text from img tag
function getAltText(imgTag) {
  const altMatch = imgTag.match(/alt="([^"]*)"/i);
  return altMatch ? altMatch[1] : "";
}

// Helper function to extract other attributes like width and height
function getImgAttributes(imgTag) {
  const widthMatch = imgTag.match(/width="([^"]*)"/i);
  const heightMatch = imgTag.match(/height="([^"]*)"/i);

  let attributes = "";
  if (widthMatch) attributes += widthMatch[0] + " ";
  if (heightMatch) attributes += heightMatch[0] + " ";

  return attributes.trim();
}

// Helper function to escape special characters in regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Run the update
updateHTML();
