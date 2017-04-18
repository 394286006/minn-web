/**
* @auth:minn
* @qq:394286006
*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    connect: {
      options: {
        port: 9000,
        keepalive:true,
        spawn: true,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 32789,
        open:true
      }
      ,
      reload: {
        options: {
          spawn: true,
          open: true,
          middleware: function (connect,options, middlewares) {
            //res.end('Hello, world!');
          //  middlewares.unshift(function(req, res, next) {
           //if (req.url !== '/hello/world') return next();

          // res.end('Hello, world from port #' + options.port + '!');
        // });
            return middlewares;
            }
          }
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.srcPath %>/**/*.js',
        dist: 'public/<%= pkg.name %>.min.js'
      }
    },
    copy: {
      public: {
        files: [{
          expand: true,
          cwd: 'bower_components',
          src: ['jquery/dist/jquery.min.js',
                'angular/angular.min.js','angular-animate/angular-animate.min.js',
                'angular-route/angular-route.min.js','angular-touch/angular-touch.min.js',
                'angular-bootstrap/ui-bootstrap-tpls.min.js','JsBarcode/dist/JsBarcode.all.min.js'
               ],
          dest: '<%= pkg.dist %>/p/minn/scripts'
        }]
      },
      publicstyles: {
        expand: true,
        cwd: 'bower_components',
        src: ['bootstrap/dist/css/bootstrap.min.css'],
        dest: '<%= pkg.dist %>/p/minn/styles'
      },
      publicscript: {
        expand: true,
        cwd: '<%= pkg.srcPath %>/p/minn/scripts',
        src: ['*.js'],
        dest: '<%= pkg.dist %>/p/minn/scripts'
      },
      html: {
        expand: true,
        cwd: '<%= pkg.srcPath %>',
        src: ['index.html','p/minn/views/*.html'],
        dest: '<%= pkg.dist %>'
      },
      scripts: {
        expand: true,
        cwd: '<%= pkg.srcPath %>',
        src: ['p/minn/*.js','p/minn/controllers/*.js'],
        dest: '<%= pkg.dist %>'
      },
      styles: {
        expand: true,
        cwd: '<%= pkg.srcPath %>/p/minn/styles',
        src: '*.css',
        dest: '<%= pkg.dist %>/p/minn/styles/'
      }
    },
    concurrent: {
        public: {
            tasks:[
              'clean:server',
              'wiredep',
              'copy',
              'autoprefixer',
              'connect:reload'
           ],
          logConcurrentOutput:false
          },
        html: {
            tasks:[
              'copy:html'
           ],
          logConcurrentOutput:false
        },scripts: {
            tasks:[
              'copy:scripts'
           ],
          logConcurrentOutput:false
        },styles: {
            tasks:[
              'copy:styles'
           ],
          logConcurrentOutput:false
        }
      },
      watch: {
        options: {
            livereload: true,
        },
        html: {
        files: ["<%= pkg.srcPath %>/index.html","<%= pkg.srcPath %>/p/minn/views/*.html"],
        tasks: ["concurrent:html"],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250
        }
      },
        scripts: {
        files: ["<%= pkg.srcPath %>/p/minn/*.js","<%= pkg.srcPath %>/p/minn/controllers/*.js"],
        tasks: ["concurrent:scripts"],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250
        }
      },
      styles: {
      files: ["<%= pkg.srcPath %>/p/minn/styles/*.css"],
      tasks: ["concurrent:styles"],
      options: {
        nospawn: true,
        interrupt: false,
        debounceDelay: 250
      }
    }
      },
      autoprefixer: {
        options: {
          browsers: ['last 1 version']
        },
        dist: {
          files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dist: '.tmp/styles/'
          }]
        }
      },
      wiredep: {
        app: {
          src: ['<%= pkg.srcPath %>/index.html'],
          ignorePath:  /\.\.\//
        }
      },
      clean: {
        server: '.tmp',
        html:{
          files: [{
            dot: true,
            src: ["<%= pkg.dist %>/*.html","<%= pkg.dist %>/p/minn/views/*.html"]
          }]
        },
        scripts:{
          files: [{
            dot: true,
            src: ["<%= pkg.dist %>/p/minn/*.js","<%= pkg.dist %>/p/minn/controllers/*.js"]
          }]
        },
        styles:{
          files: [{
            dot: true,
            src: ["<%= pkg.dist %>/p/minn/styles/*.css"]
          }]
        }
      }
  });

  grunt.registerTask('public', ['concurrent:public']);

  grunt.registerTask('default', ['watch']);


};
