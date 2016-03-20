/**
 * Created by Konstantin on 18.03.2016.
 */
var harvester = require('harvester');
var builder = require('builder');

module.exports = function (spawn) {
    if (spawn.memory.harvesters == undefined) {
        spawn.memory.harvesters = [];
        spawn.memory.builders = [];
        spawn.memory.warriors = [];
    }

    if (Memory.statistics.economy >= 500 && Memory.statistics.economy > 2 * Memory.statistics.military) {
        //create military


    } else {
        //create economy
        var sources = spawn.room.find(FIND_SOURCES);
        for (var id in sources) {
            var source = sources[id];
            if (isSatisfied(source)) {
                continue;
            }
            harvester(spawn, source);
            return;
        }
    }

    //VARIOUS HELPER FUNCTIONS

    /**Check, whether the source is satisfied.*/
    function isSatisfied(source) {
        if (Memory.sources.satisfied.indexOf(source.id) > -1) {
            return true;
        }
        //consider distance to spawn, amount of harvesters(Move, Work, Carry), amount of adjacent places
        var adjacent = getAmountFreeAdjacent(source);
        var harvesters = getHarvesters(source);
        var distance = getDistance(source);

        //very simple logic
        if (harvesters.length >= adjacent + distance / 3) {
            Memory.sources.satisfied.push(source.id);
            return true;
        }
        return false;
    }

    function getAmountFreeAdjacent(source) {
        var sX = source.pos.x;
        var sY = source.pos.y;
        var sName = source.room.name;
        var sum = 0;

        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var pos = new RoomPosition(sX + i, sY + j, sName);
                var terrain = pos.lookFor("terrain");

                if (terrain.length && terrain[0] != "wall") {
                    sum++;
                }
            }
        }
        return sum;
    }

    function getHarvesters(source) {
        var harvesters = spawn.memory.harvesters.filter(function (harvesterName) {
            if (Memory.creeps[harvesterName].sourceId = source.id) {
                return true;
            }
            return false;
        });
        return harvesters;
    }

    function getDistance(source) {
        return source.pos.getRangeTo(spawn.pos);
    }
}