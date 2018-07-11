const gulp = require('gulp')
const run = require('gulp-run-command').default

let command = 'mkdocs'
command += ' build'
command += ' -c'
command += ' -f'
command += ' site/mkdocs.yml'

gulp.task('docs', run(command))
