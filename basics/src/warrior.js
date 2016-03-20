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
module.exports = function (spawn) {
    var type = 'warrior';
    var body = [MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH];
    var name = spawn.name + "_" + type + "_" + spawn.memory.warriors.length;
    var memory = {role: type, creatorName: spawn.name};

    while (spawn.canCreateCreep(body, name) == ERR_NAME_EXISTS) {
        name += '0';
    }

    if (spawn.canCreateCreep(body, name) == OK) {
        var creep = spawn.createCreep(body, name, memory);
        spawn.memory.warriors.push(creep.name);
        Memory.statistics.military = Memory.statistics.military + creep.getCost();
    }
}
