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

var getCreepCost = require('creepCostCalculator');
var Constants = require('Constants');

module.exports = function (spawn) {
    var type = Constants.ROLE_BUILDER;
    var body = [WORK, CARRY, WORK, MOVE];
    var name = spawn.name + "_" + type + "_" + spawn.memory.builders.length;
    var cost = getCreepCost(body);
    var memory = {role: type, creatorName: spawn.name, cost: cost};

    if (spawn.canCreateCreep(body, name) == OK) {
        spawn.createCreep(body, name, memory);
        spawn.memory.builders.push(name);
        Memory.statistics.infrastructure = Memory.statistics.infrastructure + cost;
    }
}