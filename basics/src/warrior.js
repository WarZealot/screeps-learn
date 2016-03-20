/**
 * Created by Konstantin on 18.03.2016.
 */
var getCreepCost = require('creepCostCalculator');
var Constants = require('Constants');

module.exports = function (spawn) {
    var type = Constants.ROLE_WARRIOR;
    var body = [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE];
    var name = spawn.name + "_" + type + "_" + spawn.memory.warriors.length;
    var cost = getCreepCost(body);
    var memory = {role: type, creatorName: spawn.name, cost: cost};

    while (spawn.canCreateCreep(body, name) == ERR_NAME_EXISTS) {
        name += '0';
    }

    if (spawn.canCreateCreep(body, name) == OK) {
        spawn.createCreep(body, name, memory);
        spawn.memory.warriors.push(name);
        Memory.statistics.military = Memory.statistics.military + cost;
    }
}
