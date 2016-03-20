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
    if (creep.memory.role == 'warrior') {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function (enemy) {
                if (enemy.owner.username == 'Source Keeper'){
                    return false;
                }
                return true;
            }
        });
        if (targets.length) {
            if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            creep.moveTo(Game.spawns[creep.memory.creatorName]);
        }
    }
}

