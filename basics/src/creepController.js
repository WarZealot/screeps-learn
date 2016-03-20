/**
 * Created by Konstantin on 20.03.2016.
 */
var builderController = require('builderController');
var warriorController = require('warriorController');
var harvesterController = require('harvesterController');

module.exports = function (creep) {
    creep.extendLife();

    if (creep.memory.role == Constants.ROLE_HARVESTER) {
        harvesterController(creep);
    }

    if (creep.memory.role == Constants.ROLE_BUILDER) {
        builderController(creep);
    }

    if (creep.memory.role == Constants.ROLE_WARRIOR) {
        warriorController(creep);
    }
}