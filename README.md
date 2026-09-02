# Modern Gulp SCSS Development Environment

A production-ready Gulp workflow for HTML/CSS/JS development with Bootstrap 5.3.3, SCSS compilation, PurgeCSS optimization, and CSS minification.

## 📋 Features

- ✅ **SCSS Compilation** - Latest Sass compiler with sourcemaps
- ✅ **Autoprefixer** - Automatic vendor prefixes for cross-browser compatibility
- ✅ **PurgeCSS** - Remove unused CSS declarations
- ✅ **CSS Minification** - Compress CSS for production
- ✅ **Dual CSS Output** - Full version AND purged+minified version
- ✅ **Bootstrap 5.3.3** - Latest version included
- ✅ **Browser Sync** - Live reload development server
- ✅ **Clean Structure** - Organized file structure

## 📦 What You Get

After running the build, you'll have:

```
src/css/
├── full/
│   ├── style.css           # Full compiled CSS with all declarations
│   ├── style.css.map       # Sourcemap for debugging
│   └── style.min.css       # Minified full version
├── style.css               # Purged CSS (unused styles removed)
└── style.min.css           # Purged + Minified (production-ready)
```

## 🚀 Installation

```bash
# Install all dependencies
npm install
```

This will install:
- **Production dependencies**: Bootstrap 5.3.3, jQuery, Popper
- **Development dependencies**: Gulp, Sass, PurgeCSS, CleanCSS, Autoprefixer, BrowserSync

## 📖 Usage

### Development Mode (Recommended)

Starts the development server with live reload:

```bash
npm start
# or
gulp watch
```

This will:
1. Clean old CSS files
2. Compile SCSS → Full CSS
3. Generate purged CSS
4. Minify both versions
5. Copy vendor JS files
6. Start BrowserSync server at http://localhost:3000
7. Watch for changes and auto-reload

### Individual Tasks

```bash
# Compile SCSS only (no purge/minify)
npm run css
# or
gulp css

# Compile + Purge + Minify
npm run css:purge
# or
gulp css:purge

# Full production build
npm run build
# or
gulp build

# Clean CSS output directories
npm run clean
# or
gulp clean
```

## 🏗️ Project Structure

```
project/
├── src/
│   ├── scss/
│   │   ├── style.scss              # Main SCSS file
│   │   ├── modules/                # Modular SCSS components
│   │   │   ├── _common.scss
│   │   │   ├── _header.scss
│   │   │   ├── _footer.scss
│   │   │   └── ...
│   │   ├── plugins/                # Plugin styles
│   │   └── theme-variables/        # Variables & mixins
│   ├── css/
│   │   ├── full/                   # Full compiled CSS
│   │   └── (purged CSS files here)
│   ├── js/
│   │   ├── vendor/                 # Auto-copied vendor scripts
│   │   └── script.js               # Your custom JS
│   ├── images/
│   └── *.html                      # HTML files
├── gulpfile.js
├── package.json
└── README.md
```

## 🎯 Workflow Explained

### 1. SCSS Compilation
- Compiles `src/scss/style.scss` → `src/css/full/style.css`
- Generates sourcemap for debugging
- Adds vendor prefixes automatically
- Expanded output for readability

### 2. PurgeCSS
- Scans all HTML and JS files in `src/`
- Removes unused CSS classes
- Creates `src/css/style.css` (purged version)
- Keeps Bootstrap classes that are used
- Safelist includes: modals, dropdowns, carousels, etc.

### 3. Minification
- Minifies FULL version → `src/css/full/style.min.css`
- Minifies PURGED version → `src/css/style.min.css` (smallest file)
- Level 2 optimization for maximum compression
- IE9+ compatibility

### 4. Which CSS File to Use?

**Development:**
- `src/css/full/style.css` - Full CSS with all Bootstrap (use with sourcemap)

**Production:**
- `src/css/style.min.css` - Purged + Minified (RECOMMENDED - smallest size)
- `src/css/full/style.min.css` - Full + Minified (if you need all Bootstrap classes)

## ⚙️ Configuration

### Customize PurgeCSS Safelist

Edit `gulpfile.js` to modify which classes are kept:

```javascript
safelist: {
    standard: ['show', 'active', 'fade'], // Exact matches
    deep: [/^modal/, /^dropdown/],        // Regex patterns
    greedy: [/^data-/, /^aria-/]          // Attribute selectors
}
```

### Autoprefixer Browser Support

Add to `package.json`:

```json
"browserslist": [
  "last 2 versions",
  "> 1%",
  "IE 11"
]
```

### Change Output Style

In `gulpfile.js`, modify the `compileSCSS` function:

```javascript
.pipe(sass({
    outputStyle: 'compressed' // or 'compact', 'nested'
}).on('error', sass.logError))
```

## 📊 File Sizes Comparison

Typical results after build:

```
Full CSS:         ~250KB (all Bootstrap + your styles)
Full Minified:    ~200KB
Purged CSS:       ~50KB  (only used styles)
Purged Minified:  ~40KB  (production-ready)
```

**Savings: ~80% reduction in file size!**

## 🔧 Plugin Versions (All Latest)

| Package | Version | Purpose |
|---------|---------|---------|
| gulp | ^4.0.2 | Task runner |
| gulp-sass | ^5.1.0 | SCSS compiler wrapper |
| sass | ^1.77.8 | Dart Sass compiler |
| gulp-purgecss | ^6.0.0 | Remove unused CSS |
| gulp-clean-css | ^4.3.0 | CSS minification |
| gulp-autoprefixer | ^9.0.0 | Add vendor prefixes |
| gulp-sourcemaps | ^3.0.0 | Generate sourcemaps |
| gulp-rename | ^2.0.0 | Rename output files |
| browser-sync | ^3.0.2 | Live reload server |
| bootstrap | ^5.3.3 | UI framework |

## 🌟 Best Practices

### 1. Development Workflow

```bash
# Start development server
npm start

# Make changes to SCSS files
# Browser auto-reloads with changes
# Check style.css.map for debugging
```

### 2. Before Production Deploy

```bash
# Clean build
npm run clean
npm run build

# Use these files in production:
src/css/style.min.css        # Main CSS
src/js/vendor/bootstrap.bundle.min.js
src/js/vendor/jquery.min.js
```

### 3. Adding Bootstrap Components

Bootstrap is automatically imported. Just use classes in HTML:

```html
<button class="btn btn-primary">Button</button>
```

PurgeCSS will keep only the classes you use!

## 🐛 Troubleshooting

### CSS classes are being removed by PurgeCSS

Add them to the safelist in `gulpfile.js`:

```javascript
safelist: {
    standard: ['my-custom-class'],
    deep: [/^my-pattern/]
}
```

### Sourcemaps not working

Ensure you're using the full CSS file during development:

```html
<link rel="stylesheet" href="css/full/style.css">
```

### Browser not auto-reloading

Check that BrowserSync is running and you're on `http://localhost:3000`

### Node Sass errors

This setup uses **Dart Sass** (modern), not Node Sass (deprecated).
No Python or C++ compilers needed!

## 📝 NPM Scripts Quick Reference

```bash
npm start          # Start development server with watch
npm run build      # Production build
npm run css        # Compile SCSS only
npm run css:purge  # Compile + purge + minify
npm run clean      # Delete generated CSS files
```

## 📄 License

ISC

## 👤 Author

farkas imre

---

**Ready to start?** Run `npm install` then `npm start`! 🚀
