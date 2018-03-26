//const socket = require("socket");
cc.Class({
    extends: cc.Component,

    properties: {
        game: cc.Node,
        //撞击地板音效
        colloisionGroundAudio: cc.AudioClip
    },

    onLoad: function() {
        this.lastTime = 0;
    },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {

        if(new Date().getTime() - this.lastTime  > 200) {
            //播放球撞击地板的声音
            cc.audioEngine.play(this.colloisionGroundAudio,false,1);
        }
        //上次时间
        this.lastTime = new Date().getTime();
        if(this.game.getComponent("Game").status == 1) {
            this.game.getComponent("Game").gameOver();
        }
    },



});
