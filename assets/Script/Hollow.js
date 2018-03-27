cc.Class({
    extends: cc.Component,

    properties: {
        game: null,
        collisionAudio: cc.AudioClip
    },


    onLoad: function() {
        this.lastTime = 0;
    },

    /**
     * 开始接触时触发
     * @return {[type]} [description]
     */
    onBeginContact: function(contact, selfCollider, otherCollider) {

        if(new Date().getTime() - this.lastTime  > 200) {
            //播放撞击篮筐的音效
            cc.audioEngine.play(this.collisionAudio,false,1);
        }
        //上次时间
        this.lastTime = new Date().getTime();
        //标记不是空心球
        this.game.getComponent("Rim").hollow = false;
    }
});
