/**
 * Created by Konstantin on 18.03.2016.
 */

var initGlobalMethods = require('globalMethods');
var evaluateDeathsAndBirths = require('evaluatorDeathBirth');

var spawnController = require('spawnController');
var creepController = require('creepController');
var constructionSiteChooser = require('constructionSiteChooser');

module.exports.loop = function () {
    if (!Memory.initialized){
        Memory.sources = {satisfied: []};
        Memory.statistics = {economy: 0, infrastructure: 0, military: 0};
        Memory.initialized = true;
    }
    
    //needs to be done every tick
    initGlobalMethods();
    evaluateDeathsAndBirths();

    for (var name in Game.rooms) {
        var room = Game.rooms[name];
        constructionSiteChooser(room);
    }

    for (var name in Game.spawns) {
        var spawn = Game.spawns[name];
        spawnController(spawn);
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        creepController(creep);
    }
}