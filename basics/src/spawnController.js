/**
 * Created by Konstantin on 18.03.2016.
 */
var harvester = require('harvester');
var builder = require('builder');
var warrior = require('warrior');
var needsHarvester = require('sourceAnalyzer');

module.exports = function (spawn) {
    if (spawn.memory.harvesters == undefined) {
        spawn.memory.harvesters = [];
        spawn.memory.builders = [];
        spawn.memory.warriors = [];
    }

    if (Memory.statistics.economy >= 500 && Memory.statistics.economy > 2 * Memory.statistics.military) {
        //create military
        warrior(spawn);

    //} else if (Memory.statistics.military >= 1000 && 3 * Memory.statistics.military > Memory.statistics.infrastructure) {
        //create infrastructure
       // builder(spawn);
    } else {
        //create economy
        var sources = spawn.room.find(FIND_SOURCES);
        for (var id in sources) {
            var source = sources[id];
            if (needsHarvester(source, spawn)) {
                continue;
            }

            harvester(spawn, source);
            return;
        }
    }
}