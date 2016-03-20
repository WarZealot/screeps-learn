/**
 * Created by Konstantin on 20.03.2016.
 */
var Constants = require('Constants');
module.exports = function () {
    //extend creeps

    /**Renew this creep if near creator and enough energy in creator.*/
    Creep.prototype.extendLife = function () {
        if (this.ticksToLive < 1000) {
            var spawn = Game.spawns[this.memory.creatorName];
            return spawn.renewCreep(this);
        } else {
            return Constants.NOT_NEEDED;
        }
    }

    //TODO: Refactor into current cost if considered with all missing body parts and time to live
    Creep.prototype.getCost = function () {
        var sum = 0;
        for (var i = 0; i < this.body.length; i++) {
            var part = this.body[i];
            if (part.type == MOVE) {
                sum += BODYPART_COST.move;
            } else if (part.type == WORK) {
                sum += BODYPART_COST.work;
            } else if (part.type == CARRY) {
                sum += BODYPART_COST.carry;
            } else if (part.type == ATTACK) {
                sum += BODYPART_COST.attack;
            } else if (part.type == RANGED_ATTACK) {
                sum += BODYPART_COST.ranged_attack;
            } else if (part.type == HEAL) {
                sum += BODYPART_COST.heal;
            } else if (part.type == CLAIM) {
                sum += BODYPART_COST.claim;
            } else if (part.type == TOUGH) {
                sum += BODYPART_COST.tough;
            }
        }
        return sum;
    }
}