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
module.exports = function (room) {
    var options = {ignoreCreeps: true, ignoreRoads: true};
    var sources = room.find(FIND_SOURCES);
    var spawn = room.find(FIND_MY_SPAWNS)[0];
    for (var i in sources) {
        var source = sources[i];
        var path = room.findPath(spawn.pos, source.pos, options);

        for (j = 0; j < path.length; j++) {
            room.createConstructionSite(path[j], STRUCTURE_ROAD);
        }
    }
}

