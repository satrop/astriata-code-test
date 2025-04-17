const fs = require('fs');
const path = require('path');

// Path to the HTML file
const htmlFilePath = path.join(__dirname, '../index.html');

function fixNestedPictures() {
  try {
    // Read the HTML file
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    
    // Pattern to match nested picture elements
    const nestedPicturePattern = /<picture>\s*<source[^>]*>\s*<source[^>]*>\s*<picture>[\s\S]*?<\/picture>\s*<\/picture>/g;
    
    // Pattern to match a single correct picture element
    const correctPicturePattern = /<picture>\s*<source[^>]*>\s*<source[^>]*>\s*<img[^>]*>\s*<\/picture>/g;
    
    // First check if we have nested picture elements
    if (nestedPicturePattern.test(htmlContent)) {
      console.log('Found nested picture elements. Fixing...');
      
      // Replace nested picture elements with a single picture element
      htmlContent = htmlContent.replace(nestedPicturePattern, (match) => {
        // Extract the inner picture element's content
        const innerPictureMatch = match.match(/<picture>([\s\S]*?)<picture>([\s\S]*?)<\/picture>/);
        if (innerPictureMatch && innerPictureMatch[2]) {
          // Get the content of the innermost picture
          const innerContent = innerPictureMatch[2].trim();
          // Extract sources and img from inner content
          const sources = innerContent.match(/<source[^>]*>/g) || [];
          const img = innerContent.match(/<img[^>]*>/g)?.[0] || '';
          
          // Create a clean picture element
          return `<picture>\n${sources.join('\n')}\n${img}\n</picture>`;
        }
        return match;
      });
      
      // Write the fixed HTML back to the file
      fs.writeFileSync(htmlFilePath, htmlContent);
      console.log('Fixed nested picture elements');
      
      // Check if we still have any nested picture elements
      if (nestedPicturePattern.test(htmlContent)) {
        console.log('Warning: Some nested pictures may still exist. Consider running the script again.');
      }
    } else {
      console.log('No nested picture elements found.');
    }
  } catch (error) {
    console.error('Error fixing HTML:', error);
  }
}

fixNestedPictures();