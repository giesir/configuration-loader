'use strict';

var test = require('tape'),
    path = require('path'),
    configurationLoader = require('../index');

test('Should create single instance', function (t) {
    var configurationLoader2 = require('../index');

    t.plan(1);
    t.equal(configurationLoader, configurationLoader2, 'should match');
});

test('Should create new instance', function (t) {
    var ConfigurationLoader = configurationLoader.ConfigurationLoader,
        newConfigurationLoader = new ConfigurationLoader();

    t.plan(1);
    t.notEqual(configurationLoader, newConfigurationLoader, 'should not match');
});

test('Should load configuration files', function (t) {
    configurationLoader.load(path.resolve(__dirname, './resources'), function (err) {
        t.error(err, 'should not exist');
        t.true(configurationLoader.get('sample'), 'should exist');
        t.true(configurationLoader.get('sample2'), 'should exist');
        t.end();
    });
});

test('Should not load missing configurations', function (t) {
    var ConfigurationLoader = configurationLoader.ConfigurationLoader,
        testConfigurationLoader = new ConfigurationLoader('test');

    testConfigurationLoader.load(path.resolve(__dirname, './resources'), function (err) {
        t.error(err, 'should not exist');
        t.false(testConfigurationLoader.get('sample'), 'should not exist');
        t.false(testConfigurationLoader.get('sample2'), 'should not exist');
        t.end();
    });
});

test('Should return nested property', function (t) {
    configurationLoader.load(path.resolve(__dirname, './resources'), function (err) {
        t.error(err, 'should not exist');
        t.true(configurationLoader.get('sample.first'), 'should return existing value');
        t.end();
    });
});

test('Should update nested property', function (t) {
    configurationLoader.load(path.resolve(__dirname, './resources'), function (err) {
        var oldValue = configurationLoader.get('sample.first'),
            newValue = 'New value';

        t.error(err, 'should not exist');
        configurationLoader.set('sample.first', newValue);
        t.notEqual(configurationLoader.get('sample.first'), oldValue, 'should not equal old value');
        t.equal(configurationLoader.get('sample.first'), newValue, 'should equal new value');
        t.end();
    });
});