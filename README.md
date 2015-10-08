# configuration-loader

A simple environment configuration loader for Node.js

## API

```js
var config = require('configuration-loader');
```

Returns a singleton instance of the configuration loader using `process.env.NODE_ENV` as the environment identifier (defaults to `development`).

### config.ConfigurationLoader([environment])

Returns the constructor function for the configuration loader (for use when more than one configuration loader is required).
Accepts an optional `environment` identifier (defaults to `development` if not specified).

### config.load(directory, callback)

Loads the configuration files found at the specified _fully-qualified_ `directory`.
Accepts a `callback(err)` function which is called when all configurations for the specified environment have been loaded, or an error occurs.

The configuration files should be placed _under a subdirectory_ (named after `process.env.NODE_ENV` or `environment`) of `directory` (refer to [examples](#Examples)).

### config.get(path)

Returns the configuration property value at `path` of the loaded configuration, or `undefined`.

### config.set(path, value)

Sets the configuration property `value` at `path` of the loaded configuration. 
If a portion of `path` does not exist, it is created.

## Examples

### Usage

Imagine that we have the following directory structure for our project

```
.
+-- config
|	+-- development
	|	+-- app.js
	|	+-- mongo.js
	|	+-- log.js
|	+-- production
	|	+-- app.js
	|	+-- mongo.js
+-- index.js
```

and the `config` folder holds various configurations for different environments. 
Each configuration file should export a namespaced object containing necessary configuration entries.
For example, the contents of `app.js` for the `development` environment could be:

```js
'use strict';

module.exports = {
	app: {	// The namespace for our configuration
		title: 'Demo',
		description: 'Configuration loader demo app',
		port: 3000
	}
};
```

Then in our `index.js` file we could do the following:

```js
'use strict';

var path = require('path'),
	config = require('configuration-loader');
	
	config.load(path.resolve(__dirname, './config'), function(err) {
		if (err) {
			// handle error
		}
		config.get('app.title'); // returns 'Demo'
		config.set('app.port', 3001);
		config.get('app.port'); // returns 3001
	});
```

### Multiple loaders

The module returns a singleton object by default. In order to have more than one configuration loader instance, use the exported constructor function:

```js
'use strict';

var config = require('configuration-loader'),
	otherConfig = new config.ConfigurationLoader();
	
	console.log(config === otherConfig); // false
```

## Debug

To enable debugging output, use `DEBUG=icybit:config` when starting Your application.

## License

[MIT](LICENSE)
