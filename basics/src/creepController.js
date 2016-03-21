/**
 * Created by Konstantin on 20.03.2016.
 */
var builderController = require('builderController');
var warriorController = require('warriorController');
var harvesterController = require('harvesterController');
var healerController = require('healerController');

var Constants = require('Constants');

module.exports = function () {
    //creep.extendLife(); TODO

    harvesterController();
    warriorController();
    builderController();
    healerController();
}