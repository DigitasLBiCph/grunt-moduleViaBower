
'use strict';

module.exports = function(grunt) {
	var pluginName = 'moduleViaBower';

	grunt.registerTask(pluginName, '', function() {

		var path = require('path'),
			fs = require('fs-extra'),
            cwd = process.cwd(),
	    	config = grunt.config(pluginName);

	    // verify settings
	    if (!config){
	    	grunt.log.error(pluginName + ' could not find expected config item "' + pluginName +'".');
	    }

    	for (var i = 0 ; i < config.length ; i ++){

	        var configItem = config[i],
				targetPath = path.join(cwd, configItem.target),
	        	sourcePath = path.join(cwd, configItem.src),
    	        isClone = directoryExists(path.join(targetPath, '.git'));

	        if (!isClone){
	            fs.ensureDirSync(targetPath);
	            fs.copySync(sourcePath, targetPath, { filter : '!.bower.json' });
	            console.log('Copied module to ' + configItem.target  + '.');
	        } else {
	            console.log('Git found at ' + configItem.target + ', skipping copy.');
	        }
    	}

        function directoryExists(path)
        {
            var fs = require('fs');

            try
            {
                return fs.statSync(path).isDirectory();
            }
            catch (err)
            {
                return false;
            }
        }
		
	});
};