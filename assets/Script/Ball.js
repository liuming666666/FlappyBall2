var initSpeed = 0;
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
        game: cc.Node     
    },

    onLoad: function() {
        this.node.setLocalZOrder(2);    //设置z轴的位置
        initSpeed = this.ballSpeed;
    },

    /**
     * 初始化篮球
     * @return {[type]} [description]
     */
    init: function() {

    },

    /**
     * 控制篮球事件
     * @return {[type]} [description]
     */
    controlBall: function() {
        //this.node.getComponent(cc.RigidBody).linearDamping = 0;
        //这里的this是篮球刚体
        this.node.getComponent(cc.RigidBody).linearVelocity = {x:initSpeed,y:0};
        this.node.getComponent("Ball").ballSpeed = initSpeed;
        //移动篮球
        this.node.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(10,6000),this.getComponent(cc.RigidBody).getWorldCenter(),true);
    },

    /**
     * 碰撞开始,改变篮球速度（this.ballSpeed）
     * @return {[type]} [description]
     */
    onBeginContact: function (contact, selfCollider, otherCollider) {
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

        let status = this.game.getComponent("Game").status;     //游戏状态

        if(status == 1) {
            //让背景循环
            if(this.bg.x < this.resetX || this.bg.x > -this.resetX) {
                this.bg.x = 0;
            }

            //超出相机范围，就移动背景和篮筐跟随
            if(this.node.x > this.camera.x + 0.5*this.camera.width || this.node.x < this.camera.x - 0.5*this.camera.width) {
                this.node.x = -240;
                this.bg.x -= this.getComponent(cc.RigidBody).linearVelocity.x*dt;
                //console.log(this.getComponent(cc.RigidBody).linearVelocity.x);
                //速度衰减
                if(this.getComponent(cc.RigidBody).linearVelocity.x > initSpeed+5) {
                    this.node.getComponent(cc.RigidBody).linearDamping = 200;
                }else if(this.getComponent(cc.RigidBody).linearVelocity.x < -120) {
                    this.node.getComponent(cc.RigidBody).linearDamping = 4;
                }else{
                    this.node.getComponent(cc.RigidBody).linearDamping = 0;
                }
                //console.log(this.game.getComponent("Rim").rims[this.game.getComponent("Rim").rims.length-1].topRim.x);
                //检查第一个篮圈是否达到边界，是结束游戏
                /*if(this.game.getComponent("Rim").rims[this.game.getComponent("Rim").rims.length-1].topRim.x + 360 < 0) {
                    this.game.getComponent("Game").gameOver();
                }*/
                this.game.getComponent("Rim").rims.forEach((rim,index) => {
                //上下篮筐都移动，根据球的速度
                for(let key in rim) {
                    rim[key].x -= (this.getComponent(cc.RigidBody).linearVelocity.x + this.rimRelativeSpeed)*dt;
                }

                });
            } 
        }       

    }

});
