var initSpeed = 0;
var ball = null;    //ball组件
cc.Class({
    extends: cc.Component,

    properties: {
        //篮球移动的速度
        ballSpeed: 0,
        //重置的位置
        resetX: 0,
        //背景节点
        bg: cc.Node,
        //相机
        camera: cc.Node,
        //篮圈相对篮球的速度
        rimRelativeSpeed: 0,
        //game
        game: cc.Node,
        rims: [],
        //touch音效
        touchAudio: cc.AudioClip,
        ballFire: cc.Node,     //球火
        leftWing: cc.Node,  //左边翅膀
        rightWing: cc.Node  //右边翅膀
    },

    onLoad: function() {
        this.node.setLocalZOrder(2);    //设置z轴的位置
        initSpeed = this.ballSpeed;
        this.initLeft = this.leftWing.getPosition();
        this.initRight = this.rightWing.getPosition();
        ball = this;
        ball.rigidBody = this.node.getComponent(cc.RigidBody);  //篮球刚体
        this.Game = this.game.getComponent("Game");     //game组件
        this.Rim = this.game.getComponent("Rim");
    },

    /**
     * 初始化篮球
     * @return {[type]} [description]
     */
    init: function() {
        this.leftWing.setPosition(this.initLeft);
        this.leftWing.setRotation(0);
        this.rightWing.setPosition(this.initRight);
        this.rightWing.setRotation(0);
        this.leftWing.removeComponent(cc.RigidBody);
        this.rightWing.removeComponent(cc.RigidBody);
    },

    /**
     * 控制篮球事件
     * @return {[type]} [description]
     */
    controlBall: function() {
        //播放touch音效
        cc.audioEngine.play(ball.touchAudio,false,1);
        if(ball.rigidBody.type != 2) {
            ball.rigidBody.type = 2;
        }
        //这里的this是篮球刚体
        ball.rigidBody.linearVelocity = {x:initSpeed,y:0};
        ball.ballSpeed = initSpeed;
        ball.leftWing.setRotation(0);
        ball.rightWing.setRotation(0);
        //移动篮球
        ball.rigidBody.applyLinearImpulse(cc.v2(10,5800),ball.rigidBody.getWorldCenter(),true);
        ball.leftWing.runAction(cc.rotateTo(0.2, 70));
        ball.rightWing.runAction(cc.rotateTo(0.2, 70));
    },

    /**
     * 碰撞开始,改变篮球速度（this.ballSpeed）
     * @return {[type]} [description]
     */
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.sensor != true) {
            //碰撞关闭球火
        this.ballFire.getComponent(cc.ParticleSystem).stopSystem();
        }
        
        //碰撞后获取篮球速度
        //this.ballSpeed = selfCollider.getComponent(cc.RigidBody).linearVelocity.x;
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        
    },


    /**
     * 让背景以篮球的速度移动
     * @return {[type]} [description]
     */
    update: function(dt) {
        this.ballFire.setRotation(-this.node.getRotation()); 
        let status = this.Game.status;     //游戏状态

        if(status == 1) {
            //让背景循环
            if(this.bg.x < this.resetX || this.bg.x > -this.resetX) {
                this.bg.x = 0;
            }

            //超出相机范围，就移动背景和篮筐跟随
            if(this.node.x > this.camera.x + 0.5*this.camera.width || this.node.x < this.camera.x - 0.5*this.camera.width) {
                this.node.x = -240;
                this.bg.x -= this.rigidBody.linearVelocity.x*dt;
                //console.log(this.getComponent(cc.RigidBody).linearVelocity.x);
                //速度衰减
                if(this.rigidBody.linearVelocity.x > initSpeed+5) {
                    this.rigidBody.linearDamping = 200;
                }else if(this.rigidBody.linearVelocity.x < -120) {
                    this.rigidBody.linearDamping = 4;
                }else{
                    this.rigidBody.linearDamping = 0;
                }
                if(this.Rim.rims[0].topRim.name == "") {
                    this.Rim.rims.splice(0,1);
                }
                //检查第一个篮圈是否达到边界，是结束游戏
                if(this.Rim.rims.length > 0 && this.Rim.rims[0].topRim.x + 500 < 0) {
                    this.Game.gameOver();
                }
                this.Rim.rims.forEach((rim,index) => {
                    //上下篮筐都移动，根据球的速度
                    for(let key in rim) {
                        rim[key].x -= (this.rigidBody.linearVelocity.x + this.rimRelativeSpeed)*dt;
                        
                    }

                });
            } 
        }       

    }

});
