var Status = cc.Enum({
    Menu: -1,   //菜单
    Run: -1,    //运行
    Over: -1     //游戏结束
});

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,    //分数显示label
        playBtn: cc.Node,       //开始按钮节点
        mask: cc.Node,           //遮罩层
        ball: cc.RigidBody,      //篮球刚体
        hollowLabel: cc.Node,   //空心动画节点
        startGameAudio: cc.AudioClip,    //开始游戏音效
        failAudio: cc.AudioClip,     //失败音效
        goalAudio: cc.AudioClip,     //得分音效
        hollowAudio: cc.AudioClip,   //空心音效
        ballFire: cc.Node       //球火的节点
    },

    statics: {
        Status
    },

    // use this for initialization
    onLoad: function () {
        //设置游戏状态为Menu
        this.status = Status.Menu;
        //设置遮罩层和play按钮的zorder
        this.mask.setLocalZOrder(4);
        this.playBtn.setLocalZOrder(5);
        //记录球的初始位置
        this.ballInit = this.ball.node.getPosition();
    },

    /**
     * 初始化参数
     * @return {[type]} [description]
     */
    init: function() {
        this.score = 0;     //初始化游戏分数
        this.scoreLabel.string = 0;     //重置显示分数
        this.status = Status.Run;   //设置游戏状态为Run
        this.sequentHollowNumber = 0;  //连续空心球数量
        this.getComponent("Rim").rims = [];
        this.ball.node.setPosition(this.ballInit);
        this.ball.linearVelocity = {x: 0,y: 0}; //设置篮球的线速度为零
        this.ball.angularVelocity = 0; //设置篮球角速度为零
        this.ball.getComponent(cc.RigidBody).type = 1;
        //console.log(this.ball.linearVelocity);
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
        this.getComponent("Rim").spwnRim();
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
        var hollow = this.getComponent("Rim").hollow;
        if(hollow) {
            this.ballFire.getComponent(cc.ParticleSystem).resetSystem();
            this.sequentHollowNumber++;   //空心球数量
            this.score += this.sequentHollowNumber;     //连续进球积分
            //播放空心球音效
            cc.audioEngine.play(this.hollowAudio,false,1);
            //空心
            this.hollowLabel.active = true;
            //检测空心球连续数量，分配粒子效果和label颜色
            this.checkSequentHollowNumber();
            //播放空心球动画
            this.hollowLabel.getComponent(cc.Animation).play();
        }else{
            //连续空心球数量置零
            this.sequentHollowNumber = 0;
            //播放普通球音效
            cc.audioEngine.play(this.goalAudio,false,1);
            //重置空心球
            this.getComponent("Rim").hollow = true;
        }
        this.score++;   //普通得分
        this.scoreLabel.string = this.score;
    },

    /**
     * 游戏结束
     * @return {[type]} [description]
     */
    gameOver: function() {
        //设置游戏状态为over
        this.status = Status.Over;
        //注销touch事件
        this.node.off(cc.Node.EventType.TOUCH_START,
            this.ball.getComponent("Ball").controlBall,this.ball);
        this.playBtn.active = true;    //显示开始按钮
        this.mask.active = true;   //显示遮罩层
        //摧毁所有的篮筐
        this.getComponent("Rim").rims.forEach((rim,index) => {
            for(let key in rim) {
                rim[key].destroy();
            }
        });
        //播放结束音效
        cc.audioEngine.play(this.failAudio,false,1);
    },

    /**
     * 检测空心球数量分配相应的特效
     * @return {[type]} [description]
     */
    checkSequentHollowNumber: function() {
        switch (this.sequentHollowNumber) {
                    case 1 :
                         this.color = {
                            a: 255,
                            b: 235,
                            g: 191,
                            r: 156
                        };
                        this.rimFireTotalParticles = 10;    //篮筐的总粒子数
                        this.ballFireTotalParticles = 10;   //篮球火的总粒子数
                        break;
                    case 2 :
                        this.color = {
                            a: 255,
                            b: 77,
                            g: 232,
                            r: 255
                        };
                        this.rimFireTotalParticles = 50;    //篮筐的总粒子数
                        this.ballFireTotalParticles = 50;   //篮球火的总粒子数
                        break;
                    default :
                        this.color = {
                            a: 255,
                            b: 68,
                            g: 63,
                            r: 252
                        };
                        this.rimFireTotalParticles = 150;    //篮筐的总粒子数
                        this.ballFireTotalParticles = 150;   //篮球火的总粒子数
                }
        this.getComponent("Rim").rims[0].bottomRim.children[0].getComponent(cc.ParticleSystem).totalParticles = this.rimFireTotalParticles;
        this.ballFire.getComponent(cc.ParticleSystem).totalParticles = this.ballFireTotalParticles;
        this.getComponent("Rim").rims[0].bottomRim.children[0].getComponent(cc.ParticleSystem).resetSystem();
        //修改颜色
        this.hollowLabel.color = this.color;        
        this.hollowLabel.children[0].color = this.color;
        let display = this.sequentHollowNumber +1;
        //修改显示分数
        this.hollowLabel.children[0].getComponent(cc.Label).string = "x" + display;
    },

    // called every frame
    update: function (dt) {

    },
});
