/**
 * Created by Konstantin on 18.03.2016.
 */
var harvester = require('harvester');
var builder = require('builder');
var warrior = require('warrior');
var healer = require('healer');
var needsHarvester = require('sourceAnalyzer');

module.exports = function (spawn) {
    if (spawn.memory.harvesters == undefined) {
        spawn.memory.harvesters = [];
        spawn.memory.builders = [];
        spawn.memory.warriors = [];
        spawn.memory.healers = [];
    }

    if (Memory.statistics.economy >= 500 && Memory.statistics.economy > 2 * Memory.statistics.military) {
        //create military
        if (spawn.memory.warriors.length > 2 && spawn.memory.warriors.length > spawn.memory.healers.length * 6) {
            healer(spawn);
        } else {
            warrior(spawn);
        }

        //} else if (Memory.statistics.military >= 1000 && 3 * Memory.statistics.military > Memory.statistics.infrastructure) {
        //create infrastructure
        // builder(spawn);
    } else {
        //create economy
        var sources = spawn.room.find(FIND_SOURCES);
        for (var id in sources) {
            var source = sources[id];
            if (!needsHarvester(source, spawn)) {
                continue;
            }

            harvester(spawn, source);
            return;
        }
    }
}