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

module.exports = function (spawn, source) {
    var type = 'harvester';
    var body = [MOVE, MOVE, WORK, CARRY];
    var name = spawn.name + "_" + type + "_" + spawn.memory.harvesters.length;
    var memory = {role: type, creatorName: spawn.name, sourceId: source.id};

    while (spawn.canCreateCreep(body, name) == ERR_NAME_EXISTS) {
        name += '0';
    }

    if (spawn.canCreateCreep(body, name) == OK) {
        spawn.createCreep(body, name, memory);
        spawn.memory.harvesters.push(name);
        var cost = getCreepCost(body);
        Memory.statistics.economy = Memory.statistics.economy + cost;
    }
}
