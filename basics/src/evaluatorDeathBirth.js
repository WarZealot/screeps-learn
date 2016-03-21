/**
 * Created by Konstantin on 20.03.2016.
 */

var Constants = require('Constants');

module.exports = function () {
    //currently only deaths evaluated, births during create phase in corresponding model class
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            var creepMemory = Memory.creeps[name];
            var role = creepMemory.role;
            var cost = creepMemory.cost;
            var array = [];
            if (role == Constants.ROLE_HARVESTER) {
                array = Memory.spawns[creepMemory.creatorName].harvesters;
                Memory.statistics.economy -= cost;
                var index = Memory.sources.satisfied.indexOf(creepMemory.sourceId);
                Memory.sources.satisfied = Memory.sources.satisfied.splice(index, 1);
            } else if (role == Constants.ROLE_BUILDER) {
                array = Memory.spawns[creepMemory.creatorName].builders;
                Memory.statistics.infrastructure -= cost;
            } else if (role == Constants.ROLE_WARRIOR) {
                array = Memory.spawns[creepMemory.creatorName].warriors;
                Memory.statistics.military -= cost;
            } else if (role == Constants.ROLE_HEALER){
                array = Memory.spawns[creepMemory.creatorName].healers;
                Memory.statistics.military -= cost;
            }
            var index = array.indexOf(name);
            if (index > -1) {
                array.splice(index, 1);
            }
            
            delete Memory.creeps[name];
        }
    }
}