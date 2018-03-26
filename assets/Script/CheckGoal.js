cc.Class({
    extends: cc.Component,

    properties: {
        collisionAudio: cc.AudioClip
    },

    /**
     * 检查是否得分,碰到就不是空心球
     * @return {[type]} [description]
     */
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.node.y > selfCollider.node.y + selfCollider.getComponent(cc.PhysicsBoxCollider).offset.y) {
            //播放撞击篮筐的音效
            cc.audioEngine.play(this.collisionAudio,false,1);
            selfCollider.node.removeComponent(cc.RigidBody);
            cc.find("Canvas").getComponent("Game").getScore();  //得分
            cc.find("Canvas").getComponent("Rim").removeRim(selfCollider);     //移除
        }else{
            cc.find("Canvas").getComponent("Game").gameOver();
        }
    },
});
