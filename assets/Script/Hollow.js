cc.Class({
    extends: cc.Component,

    properties: {
        game: null,
        collisionAudio: cc.AudioClip
    },

    /**
     * 开始接触时触发
     * @return {[type]} [description]
     */
    onBeginContact: function(contact, selfCollider, otherCollider) {
        //播放撞击篮筐的音效
        cc.audioEngine.play(this.collisionAudio,false,1);
        //标记不是空心球
        this.game.getComponent("Rim").hollow = false;
    }
});
