/**
 * Created by Konstantin on 18.03.2016.
 */
var getCreepCost = require('creepCostCalculator');

module.exports = function (spawn) {
    var type = 'warrior';
    var body = [MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH];
    var name = spawn.name + "_" + type + "_" + spawn.memory.warriors.length;
    var memory = {role: type, creatorName: spawn.name};

    while (spawn.canCreateCreep(body, name) == ERR_NAME_EXISTS) {
        name += '0';
    }

    if (spawn.canCreateCreep(body, name) == OK) {
        spawn.createCreep(body, name, memory);
        spawn.memory.warriors.push(name);
        Memory.statistics.military = Memory.statistics.military + getCreepCost(body);
    }
}
