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
    var type = 'harvester';
    var body = [MOVE, WORK, CARRY];
    var name = spawn.name + "_" + type + "_" + spawn.memory.harvesters.length;
    var memory = {role: type, creator: spawn};

    if (spawn.canCreateCreep(body, name)) {
        var creep = spawn.createCreep(body, name, memory);
        spawn.memory.harvesters.push(creep);
    } else {
        //TODO
    }
}