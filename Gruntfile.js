
module.exports = function(grunt) {

require('load-grunt-tasks')(grunt);

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	//Compress build directory into <name>.zip and <name>-<version>.zip
	compress: {
		main: {
			options: {
				mode: 'zip',
				archive: './build/<%= pkg.name %>.zip'
			},
			expand: true,
			cwd: 'build/<%= pkg.name %>/',
			src: ['**/*'],
			dest: '<%= pkg.name %>/'
		}
	},

	// Clean up build directory
	clean: {
		main: ['build/<%= pkg.name %>']
	},

	// Copy the theme into the build directory
	copy: {
		main: {
			src:  [
				'**',
				'!node_modules/**',
				'!build/**',
				'!.git/**',
				'!Gruntfile.js',
				'!package.json',
				'!.gitignore',
				'!.gitmodules',
				'!.wti',
				'!**/Gruntfile.js',
				'!**/README.md',
				'!**/*~'
			],
			dest: 'build/<%= pkg.name %>/'
		}
	},

	po2mo: {
		files: {
				src: 'languages/*.po',
			expand: true,
		},
	},

	pot: {
		options:{
			text_domain: '<%= pkg.name %>',
			dest: 'languages/',
			keywords: [
				'__:1',
				'_e:1',
				'_x:1,2c',
				'esc_html__:1',
				'esc_html_e:1',
				'esc_html_x:1,2c',
				'esc_attr__:1',
				'esc_attr_e:1',
				'esc_attr_x:1,2c',
				'_ex:1,2c',
				'_n:1,2',
				'_nx:1,2,4c',
				'_n_noop:1,2',
				'_nx_noop:1,2,3c'
			],
		},
		files: {
			src: [
				'**/*.php',
				'!node_modules/**',
				'!build/**',
				'!**/*~',
			],
			expand: true
		}
	},

	checktextdomain: {
		options:{
			text_domain: '<%= pkg.name %>',
			correct_domain: true,
			keywords: [
				'__:1,2d',
				'_e:1,2d',
				'_x:1,2c,3d',
				'esc_html__:1,2d',
				'esc_html_e:1,2d',
				'esc_html_x:1,2c,3d',
				'esc_attr__:1,2d',
				'esc_attr_e:1,2d',
				'esc_attr_x:1,2c,3d',
				'_ex:1,2c,3d',
				'_n:1,2,4d',
				'_nx:1,2,4c,5d',
				'_n_noop:1,2,3d',
				'_nx_noop:1,2,3c,4d'
			]
		},
		files: {
			src:  [
				'**/*.php',
				'!**/class-tgm-plugin-activation.php',
				'!node_modules/**',
				'!build/**',
				'!**/*~'
			],
			expand: true
		}
	}

});

// Default task(s).
grunt.registerTask( 'default', [ 'checktextdomain', 'po2mo', 'clean', 'copy', 'compress' ] );

};