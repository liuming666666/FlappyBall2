cc.Class({
    extends: cc.Component,

    properties: {
        topRim: cc.Prefab,  //上篮筐
        bottomRim: cc.Prefab,    //下篮筐
        rimRelativeSpeed: 0,     //篮圈相对篮球的速度
        ball: cc.RigidBody,      //篮球刚体
        rims: []
    },

    /**
     * 初始化方法
     * @return {[type]} [description]
     */
    init: function() {

    },

    /**
     * 生产篮筐
     * @return {[type]} [description]
     */
    spwnRim: function() {
        let topRim = cc.instantiate(this.topRim);    //生成上篮筐节点
        let bottom = cc.instantiate(this.bottomRim);    //生成下篮筐节点
        this.node.addChild(topRim,1);
        this.node.addChild(bottom,3);
        //this.rims.push();
    },

    /**
     * 移除篮筐
     * @return {[type]} [description]
     */
    removeRim: function() {

    },

    /**
     * 移动篮筐
     * @return {[type]} [description]
     */
    update: function(dt) {      
        this.node.x -= (this.ball.node.getComponent("Ball").ballSpeed+ this.rimRelativeSpeed)*dt;
    }

});
