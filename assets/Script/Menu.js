cc.Class({
    extends: cc.Component,

    properties: {
        maxScore: cc.Label,
        lastTimeScore: cc.Label
    },

    onLoad: function() {
       // cc.director.preloadScene("game");
        this.maxScore.string = cc.sys.localStorage.getItem('maxScore');
        this.lastTimeScore.string = cc.sys.localStorage.getItem('lastTimeScore');
    },

    /**
     * 开始按钮点击事件，切换场景
     * @return {[type]} [description]
     */
    playBtnClick: function() {
        cc.director.loadScene("game");
    }

});
