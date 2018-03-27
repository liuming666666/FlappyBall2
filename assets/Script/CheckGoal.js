cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function() {
        this.Game = cc.find("Canvas").getComponent("Game");
        this.Rim = cc.find("Canvas").getComponent("Rim");
    },

    /**
     * 检查是否得分,碰到就不是空心球
     * @return {[type]} [description]
     */
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.node.y > selfCollider.node.y + selfCollider.getComponent(cc.PhysicsBoxCollider).offset.y) {
            selfCollider.node.removeComponent(cc.RigidBody);
            this.Game.getScore();  //得分
            this.Rim.removeRim(selfCollider);     //移除
        }else{
            this.Game.gameOver();
        }
    },
});
