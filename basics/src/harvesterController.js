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
module.exports = function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var source = Game.getObjectById(creep.memory.sourceId);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        } else if (creep.harvest(source) == ERR_INVALID_TARGET) {
            creep.say("I don't know where to go!");
        }
    }
    else {
        var target = Game.spawns[creep.memory.creatorName];
        if (creep.transfer(target, RESOURCE_ENERGY) == OK) {
            creep.extendLife();
        } else {
            creep.moveTo(target);
        }
    }
}

