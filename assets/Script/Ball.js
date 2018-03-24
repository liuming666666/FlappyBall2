cc.Class({
    extends: cc.Component,

    properties: {
        //篮球移动的速度
        ballSpeed: 0,
        //重置的位置
        resetX: 0,
        //背景节点
        bg: cc.Node
    },

    onLoad: function() {
        this.node.setLocalZOrder(2);    //设置z轴的位置
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
        this.node.getComponent(cc.RigidBody).linearVelocity = {x:this.getComponent(cc.RigidBody).linearVelocity.x,y:0};
        //移动篮球
        this.node.getComponent(cc.RigidBody).applyLinearImpulse(cc.v2(10,2500),this.getComponent(cc.RigidBody).getWorldCenter(),true);
    },

    /**
     * 让背景以篮球的速度移动
     * @return {[type]} [description]
     */
    update: function(dt) {
        if(this.bg.x < this.resetX) {
            this.bg.x = 0;
        }
        this.bg.x -= this.ballSpeed*dt;

    }

});
