# 🚀 INSTALLATION & SETUP GUIDE

## 📦 What's Included

Your new Gulp SCSS development environment with:
- ✅ Modern package.json with latest dependencies
- ✅ Optimized gulpfile.js with 8+ tasks
- ✅ Complete source files (SCSS, HTML, JS, images)
- ✅ Comprehensive documentation
- ✅ Quick start guide

## 🎯 Installation Steps

### STEP 1: Setup Project
```bash
# Navigate to your project directory
cd /path/to/your/project

# Copy all files from this package to your project
# (or extract if this is a zip file)
```

### STEP 2: Install Node Modules
```bash
# Install all dependencies (will download ~50MB)
npm install
```

**This installs:**
- Bootstrap 5.3.3
- jQuery 3.7.1
- Popper 2.11.8
- Gulp 4.0.2
- Sass compiler (Dart Sass 1.77.8)
- PurgeCSS 6.0.0
- CleanCSS, Autoprefixer, Rename
- BrowserSync 3.0.2
- And more...

### STEP 3: Start Development
```bash
# Start the development server
npm start
```

This will:
1. Clean old CSS files
2. Compile all SCSS files
3. Generate 4 CSS versions (full, full-min, purged, purged-min)
4. Copy vendor JS files
5. Start BrowserSync server on http://localhost:3000
6. Watch for file changes

**Your browser will open automatically!**

## 📁 Project Structure After Installation

```
your-project/
├── node_modules/          ← Created after npm install
├── src/
│   ├── scss/
│   │   ├── style.scss
│   │   ├── modules/
│   │   ├── plugins/
│   │   └── theme-variables/
│   ├── css/               ← Generated after build
│   │   ├── full/
│   │   │   ├── style.css
│   │   │   ├── style.css.map
│   │   │   └── style.min.css
│   │   ├── style.css
│   │   └── style.min.css
│   │   ├── fonts/         ← Existing fonts
│   │   └── images/        ← Existing images
│   ├── js/
│   │   ├── vendor/        ← Generated (jQuery, Bootstrap)
│   │   └── script.js
│   ├── images/
│   ├── favicon/
│   └── *.html
├── package.json
├── package-lock.json      ← Created after npm install
├── gulpfile.js
├── .gitignore
├── README.md
├── QUICKSTART.txt
└── COMPARISON.md
```

## 🎨 CSS Output Explained

After running `npm start` or `npm run build`, you get **4 CSS versions**:

### 1. Full CSS (Development)
**File:** `src/css/full/style.css`
- All Bootstrap classes included
- Expanded format (readable)
- Has sourcemap for debugging
- **Use in:** Development

### 2. Full CSS Minified
**File:** `src/css/full/style.min.css`
- All Bootstrap classes included
- Minified (compressed)
- No sourcemap
- **Use in:** Production (if you need all Bootstrap)

### 3. Purged CSS
**File:** `src/css/style.css`
- Only used CSS classes (PurgeCSS applied)
- Expanded format
- No sourcemap
- **Use in:** Testing purge results

### 4. Purged CSS Minified ⭐ RECOMMENDED
**File:** `src/css/style.min.css`
- Only used CSS classes
- Minified (compressed)
- Smallest file size (~80% smaller!)
- **Use in:** Production (BEST choice)

## 📖 Usage Examples

### Development Workflow

```bash
# Start dev server
npm start

# Make changes to SCSS files
# src/scss/modules/_header.scss

# Save file → Auto compiles → Browser reloads!
```

### Production Build

```bash
# Clean build for deployment
npm run clean
npm run build

# Use in your HTML:
<link rel="stylesheet" href="css/style.min.css">
```

### Individual Tasks

```bash
# Just compile SCSS (no purge/minify)
npm run css

# Compile + purge + minify
npm run css:purge

# Copy vendor JavaScript files
gulp vendor
```

## 🔧 Configuration

### Update HTML Files to Use New CSS

**For Development:**
```html
<link rel="stylesheet" href="css/full/style.css">
```

**For Production:**
```html
<link rel="stylesheet" href="css/style.min.css">
```

### Update JavaScript Paths

**Old paths:**
```html
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
```

**New paths:**
```html
<script src="js/vendor/jquery.min.js"></script>
<script src="js/vendor/bootstrap.bundle.min.js"></script>
```

## 🎯 Customization

### Add New SCSS File

```bash
# 1. Create new file
touch src/scss/modules/_my-component.scss

# 2. Edit the file
# src/scss/modules/_my-component.scss
.my-component {
    background: blue;
}

# 3. Import in main SCSS
# Edit src/scss/style.scss, add:
@import 'modules/my-component';

# 4. Save → Auto compiles!
```

### Prevent CSS Classes from Being Purged

If PurgeCSS removes a class you need:

```javascript
// Edit gulpfile.js, find safelist section:
safelist: {
    standard: ['my-important-class'],
    deep: [/^my-pattern/],
    greedy: [/^data-my/]
}
```

### Change BrowserSync Port

```javascript
// Edit gulpfile.js, find browserSync.init:
browserSync.init({
    server: {
        baseDir: './src'
    },
    port: 8080,  // Change from 3000 to 8080
    notify: false
});
```

## 📊 Performance Benefits

### File Size Comparison

| Version | Size | Use Case |
|---------|------|----------|
| Full CSS | ~250KB | Development only |
| Full Minified | ~200KB | Production (all Bootstrap) |
| Purged | ~50KB | Testing |
| Purged Minified | ~40KB | **Production (recommended)** |

**Result: 84% file size reduction!**

### Page Load Impact

- **Before:** 250KB CSS = ~500ms load (3G)
- **After:** 40KB CSS = ~80ms load (3G)
- **Improvement:** 84% faster load time

## 🐛 Troubleshooting

### Issue: "npm install" fails

**Solution:**
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
Change port in gulpfile.js (see Customization section)

### Issue: CSS classes are removed by PurgeCSS

**Solution:**
Add to safelist in gulpfile.js (see Customization section)

### Issue: Sourcemaps not showing

**Solution:**
Use the full CSS file during development:
```html
<link rel="stylesheet" href="css/full/style.css">
```

### Issue: Bootstrap JavaScript not working

**Solution:**
Ensure you're using `bootstrap.bundle.min.js` (includes Popper):
```html
<script src="js/vendor/bootstrap.bundle.min.js"></script>
```

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] `npm install` completed successfully
- [ ] `npm start` opens browser at localhost:3000
- [ ] Files are being watched (change SCSS → browser reloads)
- [ ] 4 CSS files generated in src/css/
- [ ] Vendor JS files copied to src/js/vendor/
- [ ] BrowserSync shows your HTML pages
- [ ] CSS changes reflect in browser
- [ ] No console errors in browser

## 📚 Documentation Files

- **README.md** - Complete documentation
- **QUICKSTART.txt** - Quick reference guide
- **COMPARISON.md** - Old vs new setup comparison
- **This file** - Installation guide

## 🎓 Learning Resources

### Understanding the Workflow

1. **SCSS → CSS:** Sass compiler converts SCSS to CSS
2. **Autoprefixer:** Adds vendor prefixes for browser compatibility
3. **PurgeCSS:** Removes unused CSS classes
4. **Minification:** Compresses CSS for smaller file size
5. **BrowserSync:** Live reload development server

### Gulp Tasks Explained

```bash
gulp css         # Just compile SCSS
gulp purge       # Just run PurgeCSS
gulp minify      # Just minify CSS
gulp css:purge   # Compile + purge + minify
gulp build       # Full production build
gulp watch       # Development mode (default)
```

## 🔄 Update Checklist

When deploying to production:

1. ✅ Run `npm run build`
2. ✅ Update HTML to use `css/style.min.css`
3. ✅ Update JS paths to `js/vendor/`
4. ✅ Test all pages
5. ✅ Check browser console for errors
6. ✅ Test on different browsers
7. ✅ Verify all Bootstrap components work
8. ✅ Check responsive design
9. ✅ Test all JavaScript functionality
10. ✅ Deploy!

## 🌟 Best Practices

1. **Development:** Always use full CSS with sourcemap
2. **Production:** Always use purged + minified CSS
3. **Version Control:** Add node_modules to .gitignore
4. **Clean Builds:** Run `npm run clean` before production builds
5. **Testing:** Test with purged CSS before deployment
6. **Backup:** Keep old CSS files until deployment is verified

## 🚀 Next Steps

1. Run `npm install`
2. Run `npm start`
3. Edit SCSS files in `src/scss/`
4. See changes live in browser
5. Run `npm run build` for production
6. Deploy with `css/style.min.css`

## 💡 Tips

- Use Chrome DevTools to see sourcemaps during development
- Run `gulp clean` if CSS seems cached
- Check console for Gulp task output
- BrowserSync URL shows on all network interfaces
- PurgeCSS safelist can be adjusted anytime

## 📞 Getting Help

If you encounter issues:

1. Check TROUBLESHOOTING section above
2. Read README.md for detailed info
3. Review QUICKSTART.txt for common tasks
4. Check gulpfile.js for task details
5. Verify all files are in correct locations

---

## 🎉 Ready to Start?

```bash
npm install
npm start
```

**Your development server will start in seconds!**

---

*Last updated: February 2026*
*Node.js version required: 14.x or higher*
*npm version required: 6.x or higher*
