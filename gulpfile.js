const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');

// Paths configuration
const paths = {
    scss: {
        src: 'src/scss/**/*.scss',
        main: 'src/scss/style.scss',
        dest: 'src/css/full'
    },
    css: {
        full: 'src/css/full/**/*.css',
        purged: 'src/css'
    },
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    content: ['src/**/*.html', 'src/**/*.js'] // Content for PurgeCSS
};

// Clean CSS output directories
function clean() {
    return del(['src/css/**/*', '!src/css/fonts', '!src/css/fonts/**', '!src/css/images', '!src/css/images/**']);
}

// Compile SCSS to CSS (FULL VERSION with sourcemaps)
function compileSCSS() {
    return gulp.src(paths.scss.main)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['node_modules'],
            quietDeps: true,  // Suppress deprecation warnings from dependencies
            silenceDeprecations: ['legacy-js-api', 'import']  // Suppress specific warnings
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

// PurgeCSS (PURGED VERSION)
function purgeCSSTask() {
    return gulp.src('src/css/full/style.css')
        .pipe(purgecss({
            content: paths.content,
            safelist: {
                standard: ['show', 'active', 'fade', 'modal-backdrop', 'collapsing','img-ratio',/^img-\d+-\d+$/,],
                deep: [/^modal/, /^dropdown/, /^carousel/, /^collapse/, /^nav/, /^form/, /^splide/, /^gslide/, /^glightbox/],
                greedy: [/^data-/, /^aria-/]
            },
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.css.purged))
        .pipe(browserSync.stream());
}

// Minify CSS (creates .min.css versions)
function minifyCSS() {
    // Minify FULL version
    gulp.src('src/css/full/style.css')
        .pipe(cleanCSS({
            level: 2,
            compatibility: 'ie9'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/css/full'));

    // Minify PURGED version
    return gulp.src('src/css/style.css')
        .pipe(cleanCSS({
            level: 2,
            compatibility: 'ie9'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.css.purged))
        .pipe(browserSync.stream());
}

// Copy vendor JS files
function copyVendorJS() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'node_modules/@popperjs/core/dist/umd/popper.min.js'
        ])
        .pipe(gulp.dest('src/js/vendor'));
}

// Browser Sync - Live Server
function serve() {
    browserSync.init({
        server: {
            baseDir: './src'
        },
        port: 3000,
        notify: false,
        open: true
    });
}

// Watch files for changes
function watchFiles() {
    gulp.watch(paths.scss.src, gulp.series(compileSCSS, purgeCSSTask, minifyCSS));
    gulp.watch(paths.html).on('change', gulp.series(purgeCSSTask, minifyCSS, browserSync.reload));
    gulp.watch(paths.js).on('change', browserSync.reload);
}

// Complex tasks
const css = gulp.series(compileSCSS); // Just compile SCSS
const cssPurge = gulp.series(compileSCSS, purgeCSSTask, minifyCSS); // Full CSS workflow
const build = gulp.series(clean, compileSCSS, purgeCSSTask, minifyCSS, copyVendorJS); // Complete build
const watch = gulp.series(build, gulp.parallel(serve, watchFiles)); // Development mode

// Export tasks
exports.clean = clean;
exports.css = css;
exports['css:purge'] = cssPurge;
exports.minify = minifyCSS;
exports.purge = purgeCSSTask;
exports.vendor = copyVendorJS;
exports.build = build;
exports.watch = watch;
exports.default = watch;
