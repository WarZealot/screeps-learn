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

module.exports = function (spawn, source) {
    var type = Constants.ROLE_HARVESTER;
    var body = [MOVE, WORK, CARRY, MOVE];
    var name = spawn.name + "_" + type + "_" + spawn.memory.harvesters.length;
    var cost = getCreepCost(body);
    var memory = {role: type, creatorName: spawn.name, sourceId: source.id, cost: cost};

    while (spawn.canCreateCreep(body, name) == ERR_NAME_EXISTS) {
        name += '0';
    }

    if (spawn.canCreateCreep(body, name) == OK) {
        spawn.createCreep(body, name, memory);
        spawn.memory.harvesters.push(name);
        Memory.statistics.economy += cost;
    }
}
