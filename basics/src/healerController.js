/**
 * Created by Konstantin on 18.03.2016.
 */
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
var Constants = require('Constants');

module.exports = function () {
    for (var name in Game.spawns) {
        var healers = Memory.spawns[name].healers;
        if (healers.length == 0) {
            continue;
        }

        var targets = Game.spawns[name].room.find(FIND_MY_CREEPS).filter(function (creep) {
            if (creep.hits < creep.hitsMax) {
                return true;
            }
            return false;
        });

        if (targets.length == 0) {
            continue;
        }

        for (var i in healers) {
            var creep = Game.creeps[healers[i]];

            if (creep == null || creep.spawning || creep.memory.role != Constants.ROLE_HEALER) {
                continue;
            }
            if (targets.length) {
                var closest = creep.pos.findClosestByPath(targets);
                if (creep.heal(closest) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }
            } else {
                //TODO select staging ground
                creep.moveTo(25, 25);
            }
        }
    }
}

