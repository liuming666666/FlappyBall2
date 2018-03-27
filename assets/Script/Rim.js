const Ball = require("Ball");
cc.Class({
    extends: cc.Component,

    properties: {
        topRim: cc.Prefab,  //上篮筐
        bottomRim: cc.Prefab,    //下篮筐
        rims: [],        //篮筐
        hollow: true,           //空心，默认为true
        nextRim: 550    //下一个篮筐的距离
    },

    onLoad: function() {
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
                let i = this.rims.length;
                //获取最后一个篮筐的positionX
                let positionX = -350;
                if(i >= 1){
                    positionX = this.rims[i-1].topRim.x;
                }
                let topRim = cc.instantiate(this.topRim);    //生成上篮筐节点
                let bottomRim = cc.instantiate(this.bottomRim);    //生成下篮筐节点
                topRim.setPosition({x: positionX + this.nextRim, y: 0});    //设置生成上篮筐的位置
                bottomRim.setPosition({x: positionX + this.nextRim, y: 0}); //设置生成下篮筐的位置
                this.node.addChild(topRim,1);
                this.node.addChild(bottomRim,3);
            
            //把Rim组件传入给空心球判定组件
            topRim.getComponent("Hollow").game = this;
            //篮筐集合
            this.rims.push({topRim: topRim ,bottomRim: bottomRim});
    },

    /**
     * 移除篮筐
     * @return {[type]} [description]
     */
    removeRim: function(r) {
        this.rims.forEach((rim,index) => {
            if(r.node == rim.bottomRim) {
                var a = {};
                for(let key in rim) {
                    rim[key].removeComponent(cc.RigidBody);     //移除碰撞刚体
                    rim[key].runAction(cc.sequence(cc.spawn(cc.scaleBy(0.8, 2),cc.fadeOut(0.5)),cc.callFunc(()=>{
                        rim[key].destroy();
                    })));
                }
                this.spwnRim();
                return true;
            }else{
                return false;
            }
        });
    }

});
