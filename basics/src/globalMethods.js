/**
 * Created by Konstantin on 20.03.2016.
 */
module.exports = function () {
    //extend creeps
    Creep.prototype.almostDead = function() {
        if(this.ticksToLive == 0){
            var array = [];
            if(this.type == 'harvester'){
                array = Memory.spawns[this.memory.creatorName].harvesters;
            } else if(this.type == 'builder'){
                array = Memory.spawns[this.memory.creatorName].builders;
            }
            var index = array.indexOf(this.name);
            if (index > -1) {
                array.splice(index, 1);
            }
            this.suicide();
            return true;
        }
        return false;
    };
}