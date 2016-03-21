/**
 * Created by Konstantin on 21.03.2016.
 *
 * Returns true if a source needs more harvesters.
 */
module.exports = function (source, spawn) {
    if (isSatisfied(source)) {
        return false;
    }
    if (isEndangered(source)) {
        return false;
    }
    return true;





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
        if (harvesters.length >= (adjacent + (distance - 1) / 7)) {
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

                if (terrain == "plain") {
                    sum++;
                }
            }
        }
        return sum;
    }

    function getHarvesters(source) {
        var harvesters = spawn.memory.harvesters.filter(function (harvesterName) {
            if (Memory.creeps[harvesterName].sourceId == source.id) {
                return true;
            }
            return false;
        });
        return harvesters;
    }

    function getDistance(source) {
        return source.pos.getRangeTo(spawn.pos);
    }

    function isEndangered(source) {
        var enemies = source.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        if (enemies.length > 0) {
            return true;
        }
        return false;
    }
}