const { src,dest,parallel,watch } = require('gulp');

const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//live server
function browser() {
  browserSync.init({
    server: {
      baseDir:"./"
    }
  })

  watch("*.html").on('change',browserSync.reload);
}
//function copie le sass dans le fichier css
function sass() {
  return src('./sass/import.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());

}
//watch les changements du dossier sass pour l'intégrer dans le css en temps réel
function watcher(done) {
  watch('./sass/components/*.scss', sass)
  browserSync.reload();
  done();
}

module.exports = {
  sass,
  watcher,
  // PictoPng,
  browser: parallel(browser,watcher),
  //  build: parallel(css, sass),
  //  build2: series(css,sass)
}
