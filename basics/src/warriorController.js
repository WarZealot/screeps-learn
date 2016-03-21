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
        var warriors = Memory.spawns[name].warriors;
        if (warriors.length == 0) {
            continue;
        }

        var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function (enemy) {
                if (enemy.owner.username == Constants.NAME_SOURCE_KEEPER) {
                    return false;
                }
                return true;
            }
        });

        for (var i in warriors) {
            var creep = Game.creeps[warriors[i]];

            if (creep == null || creep.memory.role != Constants.ROLE_WARRIOR) {
                continue;
            }
            if (targets.length) {
                var closest = creep.pos.findClosestByPath(targets);

                if (creep.attack(closest) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }
            } else {
                //TODO select staging ground
                creep.moveTo(25, 25);
            }
        }
    }
}

