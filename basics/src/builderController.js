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
    for (var name in Game.spawns) {
        var builders = Memory.spawns[name].builders;
        if (builders.length == 0) {
            continue;
        }

        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

        for (var wName in builders) {
            var creep = Game.getObjectById(wName);

            if (creep == null || creep.memory.role != Constants.ROLE_BUILDER) {
                continue;
            }
            if (creep.carry.energy == 0) {
                var target = Game.spawns[creep.memory.creatorName];
                if (target.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                if (targets.length) {
                    //TODO select optimal target
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
    }


}

