cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    /**
     * 检查是否得分
     * @return {[type]} [description]
     */
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.node.y > selfCollider.node.y + selfCollider.getComponent(cc.PhysicsBoxCollider).offset.y) {
            selfCollider.node.removeComponent(cc.RigidBody);
            cc.find("Canvas").getComponent("Game").getScore();  //得分
            //cc.find("Canvas").getComponent("Rim").removeRim(selfCollider);     //移除
        }else{
            cc.find("Canvas").getComponent("Game").gameOver();
        }
    },
});
