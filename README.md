# astriata-code-test

A simple web project with HTML, JavaScript, and SCSS compilation setup.

## Project Structure

```
index.html              # Main HTML file
package.json            # Node.js project configuration
src/
  ├── js/               # JavaScript source files
  │   └── main.js       # Main JavaScript file
  └── scss/             # SCSS source files
      └── style.scss    # Main SCSS file
dist/                   # Compiled output (generated)
  ├── css/              # Compiled CSS
  │   └── style.css     # Compiled from style.scss
  └── js/               # JavaScript distribution files
      └── main.js       # Copied from src/js/main.js
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v12.0.0 or higher)
- npm (comes with Node.js)

## Installation

Clone the repository and install the dependencies:

```bash
# Navigate to the project directory
cd astriata-code-test

# Install dependencies
npm install
```

## Compiling SCSS to CSS

This project uses Sass for styling. The following npm scripts are available:

### One-time Compilation

To compile SCSS files to CSS once:

```bash
npm run sass
```

### Development Mode (Watch)

To automatically compile SCSS files when changes are detected:

```bash
npm run sass:watch
# or
npm start
```

### Production Build

To compile SCSS files with compression for production:

```bash
npm run build
```

This command will:

- Compile SCSS to CSS with compression
- Copy JavaScript files from src/js to dist/js

## Running the Project

After compiling, you can open `index.html` in your browser to see the project in action.

## Notes

- The compiled CSS and copied JS files are in the `dist` folder
- The `dist` folder is ignored by Git as these are generated files
