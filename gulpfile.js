var gulp = require('gulp');
var ts = require('gulp-typescript');
var shell = require('gulp-shell');
var del = require('del');
var merge = require('merge2');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var filenames = require('gulp-filenames');
var gprint = require('gulp-print');
var coverage = require('gulp-coverage');
var coveralls = require('gulp-coveralls');
var gulpFn = require('gulp-fn');
var fs = require('fs');

gulp.task('cleanscripts', function () {
    return del(['dev-build/scripts/**/*.js', 'dev-build/scripts/**/*.js.map', 'dev-build/scripts/**/*.d.ts']);
});

gulp.task('cleanprodscripts', function () {
    return del(['prod-build/scripts/**/*.js', 'prod-build/scripts/**/*.d.ts']);
});

gulp.task('cleanspecs', function () {
    return del(['dev-build/spec/**/*.js', 'dev-build/spec/**/*.d.ts']);
});

gulp.task('compilescripts', function () {
    var tsScriptsProject = ts.createProject('scripts/tsconfig.json');
    var tsResult = tsScriptsProject.src('**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsScriptsProject));
    return merge([
        tsResult.dts.pipe(gulp.dest('')),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(''))
    ]);
});

gulp.task('buildprodscripts', ['cleanprodscripts'], function () {
    var tsScriptsProject = ts.createProject('scripts/prod.tsconfig.json');
    var tsResult = tsScriptsProject.src('**/*.ts')
        .pipe(ts(tsScriptsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('')),
        tsResult.js.pipe(uglify()).pipe(gulp.dest(''))
    ]);
});

gulp.task('compilespecs', function () {
    var tsSpecProject = ts.createProject('spec/UnitTests/tsconfig.json');
    var tsResult = tsSpecProject.src('**/*.ts')
        .pipe(ts(tsSpecProject));
    return tsResult.pipe(gulp.dest(''));
});

gulp.task('compileperformancespecs', function () {
    var tsSpecProject = ts.createProject('spec/PerformanceTests/tsconfig.json');
    var tsResult = tsSpecProject.src('**/*.ts')
        .pipe(ts(tsSpecProject));
    return tsResult.pipe(gulp.dest(''));
});

gulp.task('concatunittestswithcode', function () {
    return gulp.src(['dev-build/scripts/typesharp.js', 'dev-build/spec/typesharpspecs.js'])
        .pipe(concat('specfile.js'))
        .pipe(gulp.dest('dev-build/spec/'));
});

gulp.task('concatperftestswithcode', function () {
    return gulp.src(['dev-build/scripts/typesharp.js', 'dev-build/spec/performancespecs.js'])
        .pipe(concat('perfspecfile.js'))
        .pipe(gulp.dest('dev-build/spec/'));
});

gulp.task('printfiles', function () {
    return gulp.src(['**/*.*', '!node_modules/**/*.*'])
        .pipe(gprint());
});

gulp.task('cleanall', ['cleanscripts', 'cleanspecs']);

gulp.task('runperfs', function () {
    return gulp.src('dev-build/spec/perfspecfile.js')
        .pipe(jasmine({
            config: {
                "spec_dir": "dev-build",
                "spec_files": [
                    "spec/perfspecfile.js"
                ],
                "helpers": [
                    "../scripts/**/*.js"
                ],
                "stopSpecOnExpectationFailure": false,
                "random": false
            }
        }));
});

gulp.task('executetests', function (done) {
    runSequence('buildscripts', 'buildspecs', 'coverage', done);
});

gulp.task('buildscripts', function (done) {
    runSequence('cleanscripts', 'compilescripts', done);
});

gulp.task('buildspecs', function (done) {
    runSequence('cleanspecs', 'compilespecs', 'concatunittestswithcode', 'compileperformancespecs', 'concatperftestswithcode', done);
});

gulp.task('buildall', function (done) {
    runSequence('buildscripts', 'buildspecs', done);
});

gulp.task('travis', function () {
    return gulp.src('dev-build/spec/specfile.js')
        .pipe(coverage.instrument({
            pattern: ['dev-build/spec/specfile.js']
        }))
        .pipe(jasmine({
            config: {
                "spec_dir": "dev-build",
                "spec_files": [
                    "spec/specfile.js"
                ],
                "helpers": [
                    "../scripts/**/*.js"
                ],
                "stopSpecOnExpectationFailure": false,
                "random": false
            }
        }))
        .pipe(coverage.gather())
        .pipe(coverage.format(['lcov']))
        .pipe(coveralls());
});

gulp.task('coverage', function () {
    return gulp.src('dev-build/spec/specfile.js')
        .pipe(coverage.instrument({
            pattern: ['dev-build/spec/specfile.js']
        }))
        .pipe(jasmine({
            config: {
                "spec_dir": "dev-build",
                "spec_files": [
                    "spec/specfile.js"
                ],
                "helpers": [
                    "../scripts/**/*.js"
                ],
                "stopSpecOnExpectationFailure": false,
                "random": false
            }
        }))
        .pipe(coverage.gather())
        .pipe(coverage.format(['json']))
        .pipe(gulp.dest('reports/'))
        .pipe(gulpFn(function(){
          var coverageData = JSON.parse(fs.readFileSync('reports/coverage.json', 'utf8'));
          console.log("Coverage Data" + coverageData.coverage);
        }));
});

gulp.task('ts:watch', function(){
  gulp.watch('**/*.ts',['executetests']);
})
