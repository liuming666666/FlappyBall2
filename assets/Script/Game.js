cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,    //分数显示label
        playBtn: cc.Node,       //开始按钮节点
        mask: cc.Node,           //遮罩层
        ball: cc.RigidBody,      //篮球刚体
        startGameAudio: cc.AudioClip,    //开始游戏音效
        box: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        
    },

    /**
     * 初始化参数
     * @return {[type]} [description]
     */
    init: function() {
        this.score = 0;
    },

    /**
     * 开始游戏
     * @return {[type]} [description]
     */
    startGame: function() {
        this.init();    //初始化参数
        this.playBtn.active = false;    //隐藏开始按钮
        this.mask.active = false;   //隐藏遮罩层
        cc.audioEngine.play(this.startGameAudio,false,0.2);  //播放游戏开始音效,音乐文件，是否循环，声音大小
        //生成篮筐
        this.box.getComponent("Rim").spwnRim();
        //注册事件篮球touch事件
        this.node.on(cc.Node.EventType.TOUCH_START,
            this.ball.getComponent("Ball").controlBall,this.ball);
    },

    /**
     * 开始按钮点击事件
     * @return {[type]} [description]
     */
    playBtnClick: function() {
        this.startGame();
    },

    /**
     * 进球得分
     * @return {[type]} [description]
     */
    getScore: function() {
        this.score++;   //普通得分
        this.scoreLabel.string = this.score;
    },

    /**
     * 游戏结束
     * @return {[type]} [description]
     */
    gameOver: function() {

    },

    // called every frame
    update: function (dt) {

    },
});
