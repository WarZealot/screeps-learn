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
module.exports = function () {
    for (var name in Game.spawns) {
        var harvesterNames = Memory.spawns[name].harvesters;

        for (var hName in harvesterNames) {
            var creep = Game.getObjectById(hName);

            if (creep.carry.energy < creep.carryCapacity) {
                var source = Game.getObjectById(creep.memory.sourceId);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                } else if (creep.harvest(source) == ERR_INVALID_TARGET) {
                    creep.say("Invalid target!");
                }
            }
            else {
                var target = Game.spawns[creep.memory.creatorName];
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}

