/**
 * Created by Konstantin on 18.03.2016.
 */
var harvester = require('harvester');

module.exports = function (spawn) {
    if (spawn.memory.harvesters == undefined) {
        spawn.memory.harvesters = [];
    }

    if(spawn.memory.harvesters.length < 5){
        harvester(spawn);
    }
}