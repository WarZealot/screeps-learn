/**
 * Created by Konstantin on 18.03.2016.
 */
var harvester = require('harvester');
var builder = require('builder');

module.exports = function (spawn) {
    if (spawn.memory.harvesters == undefined) {
        spawn.memory.harvesters = [];
        spawn.memory.builders = [];
    }

    var sources = spawn.room.find(FIND_SOURCES);
    for (var id in sources) {
        source = source[id];
    }


    if(spawn.memory.harvesters.length < 4){
        harvester(spawn);
    }else if(spawn.memory.builders.length < 2){
        builder(spawn);
    }
}