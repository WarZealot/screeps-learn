/**
 * Created by Konstantin on 20.03.2016.
 */
module.exports = function (creationBody) {
    var sum = 0;
    for (var i = 0; i < creationBody.length; i++) {
        var part = creationBody[i];
        if (part == MOVE) {
            sum += BODYPART_COST.move;
        } else if (part == WORK) {
            sum += BODYPART_COST.work;
        } else if (part == CARRY) {
            sum += BODYPART_COST.carry;
        } else if (part == ATTACK) {
            sum += BODYPART_COST.attack;
        } else if (part == RANGED_ATTACK) {
            sum += BODYPART_COST.ranged_attack;
        } else if (part == HEAL) {
            sum += BODYPART_COST.heal;
        } else if (part == CLAIM) {
            sum += BODYPART_COST.claim;
        } else if (part == TOUGH) {
            sum += BODYPART_COST.tough;
        }
    }
    return sum;
}
