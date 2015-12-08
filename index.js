'use strict';

var _ = require('lodash'),
    path = require('path'),
    glob = require('glob'),
    debug = require('debug')('icybit:config');

function ConfigurationLoader(env) {
    var self = this;

    if (!(self instanceof ConfigurationLoader)) {
        return new ConfigurationLoader(env);
    }

    self.env = env || 'development';
    self.config = {};
}

ConfigurationLoader.prototype.ConfigurationLoader = ConfigurationLoader;

ConfigurationLoader.prototype.load = function load(configDirectory, callback) {
    loadConfigurations.call(this, configDirectory, callback);
};

ConfigurationLoader.prototype.get = function get(path) {
    return _.get(this.config, path);
};

ConfigurationLoader.prototype.set = function set(path, value) {
    return _.set(this.config, path, value);
};

function loadConfigurations(configDirectory, callback) {
    var self = this;

    glob(path.resolve(configDirectory, './' + self.env + '/*.js'), function (err, configs) {
        if (err) {
            debug(err);
            callback(err);
        } else {
            if (!configs.length) {
                debug('No configurations found for ' + self.env);
            } else {
                debug('Loading ' + self.env + ' environment configurations');
            }

            debug(configs);

            configs.forEach(function (configPath) { 
                _.extend(self.config, require(path.resolve(configPath)));
            });

            debug(self.config);

            callback(null);
        }
    });
}

module.exports = new ConfigurationLoader(process.env.NODE_ENV);
