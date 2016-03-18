/**
 * Created by Konstantin on 18.03.2016.
 */

var harvesterController = require('harvesterController');
var spawnController = require('spawnController');
var builderController = require('builderController');
var constructionSiteChooser = require('constructionSiteChooser');

module.exports.loop = function () {

    for(var name in Game.rooms) {
        var room = Game.rooms[name];
        constructionSiteChooser(room);
    }

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        spawnController(spawn);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            harvesterController(creep);
        }

        if(creep.memory.role == 'builder') {
            builderController(creep);
        }

        if(creep.memory.role == 'guard') {
            var targets = creep.room.find(FIND_HOSTILE_CREEPS);
            if(targets.length) {
                if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
}