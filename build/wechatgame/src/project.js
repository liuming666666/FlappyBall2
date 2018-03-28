require=function t(i,e,o){function n(s,l){if(!e[s]){if(!i[s]){var a="function"==typeof require&&require;if(!l&&a)return a(s,!0);if(c)return c(s,!0);var r=new Error("Cannot find module '"+s+"'");throw r.code="MODULE_NOT_FOUND",r}var h=e[s]={exports:{}};i[s][0].call(h.exports,function(t){var e=i[s][1][t];return n(e||t)},h,h.exports,t,i,e,o)}return e[s].exports}for(var c="function"==typeof require&&require,s=0;s<o.length;s++)n(o[s]);return n}({Ball:[function(t,i,e){"use strict";cc._RF.push(i,"9a56684YM5NZ6fSzL1rCGAn","Ball");var o=0,n=null;cc.Class({extends:cc.Component,properties:{ballSpeed:0,resetX:0,bg:cc.Node,camera:cc.Node,rimRelativeSpeed:0,game:cc.Node,rims:[],touchAudio:cc.AudioClip,ballFire:cc.Node,leftWing:cc.Node,rightWing:cc.Node},onLoad:function(){this.node.setLocalZOrder(2),o=this.ballSpeed,this.initLeft=this.leftWing.getPosition(),this.initRight=this.rightWing.getPosition(),(n=this).rigidBody=this.node.getComponent(cc.RigidBody),this.Game=this.game.getComponent("Game"),this.Rim=this.game.getComponent("Rim")},init:function(){this.leftWing.setPosition(this.initLeft),this.leftWing.setRotation(0),this.rightWing.setPosition(this.initRight),this.rightWing.setRotation(0),this.leftWing.removeComponent(cc.RigidBody),this.rightWing.removeComponent(cc.RigidBody)},controlBall:function(){cc.audioEngine.play(n.touchAudio,!1,1),2!=n.rigidBody.type&&(n.rigidBody.type=2),n.rigidBody.linearVelocity={x:o,y:0},n.ballSpeed=o,n.leftWing.setRotation(0),n.rightWing.setRotation(0),n.rigidBody.applyLinearImpulse(cc.v2(10,6e3),n.rigidBody.getWorldCenter(),!0),n.leftWing.runAction(cc.rotateTo(.2,70)),n.rightWing.runAction(cc.rotateTo(.2,70))},onBeginContact:function(t,i,e){1!=e.sensor&&this.ballFire.getComponent(cc.ParticleSystem).stopSystem()},onEndContact:function(t,i,e){},update:function(t){var i=this;1==this.Game.status&&((this.bg.x<this.resetX||this.bg.x>-this.resetX)&&(this.bg.x=0),(this.node.x>this.camera.x+.5*this.camera.width||this.node.x<this.camera.x-.5*this.camera.width)&&(this.node.x=-240,this.bg.x-=this.rigidBody.linearVelocity.x*t,this.rigidBody.linearVelocity.x>o+5?this.rigidBody.linearDamping=200:this.rigidBody.linearVelocity.x<-120?this.rigidBody.linearDamping=4:this.rigidBody.linearDamping=0,""==this.Rim.rims[0].topRim.name&&this.Rim.rims.splice(0,1),this.Rim.rims.length>0&&this.Rim.rims[0].topRim.x+500<0&&this.Game.gameOver(),this.Rim.rims.forEach(function(e,o){for(var n in e)e[n].x-=(i.rigidBody.linearVelocity.x+i.rimRelativeSpeed)*t})))}}),cc._RF.pop()},{}],CheckGoal:[function(t,i,e){"use strict";cc._RF.push(i,"ca3ac8l12pBEq4jNxeSC5oe","CheckGoal"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.Game=cc.find("Canvas").getComponent("Game"),this.Rim=cc.find("Canvas").getComponent("Rim")},onBeginContact:function(t,i,e){e.node.y>i.node.y+i.getComponent(cc.PhysicsBoxCollider).offset.y?(i.node.removeComponent(cc.RigidBody),this.Game.getScore(),this.Rim.removeRim(i)):this.Game.gameOver()}}),cc._RF.pop()},{}],Collision:[function(t,i,e){"use strict";cc._RF.push(i,"a2ea7PMRy9CPLMd7+a6TJLO","Collision"),cc.Class({extends:cc.Component,properties:{game:cc.Node,colloisionGroundAudio:cc.AudioClip,leftWing:cc.Node,rightWing:cc.Node},onLoad:function(){this.lastTime=0,this.Game=this.game.getComponent("Game")},onBeginContact:function(t,i,e){(new Date).getTime()-this.lastTime>200&&cc.audioEngine.play(this.colloisionGroundAudio,!1,1),this.lastTime=(new Date).getTime(),1==this.Game.status&&(this.leftWing.addComponent(cc.RigidBody),this.rightWing.addComponent(cc.RigidBody),this.Game.gameOver())}}),cc._RF.pop()},{}],Game:[function(t,i,e){"use strict";cc._RF.push(i,"280c3rsZJJKnZ9RqbALVwtK","Game");var o=cc.Enum({Menu:-1,Run:-1,Over:-1});cc.Class({extends:cc.Component,properties:{scoreLabel:cc.Label,gameOverNode:cc.Node,ball:cc.RigidBody,hollowLabel:cc.Node,startGameAudio:cc.AudioClip,failAudio:cc.AudioClip,goalAudio:cc.AudioClip,hollowAudio:cc.AudioClip,ballFire:cc.Node},statics:{Status:o},onLoad:function(){var t=this;setTimeout(function(){t.startGame()},1),this.ballInit=this.ball.node.getPosition()},init:function(){this.score=0,this.scoreLabel.string=0,this.status=o.Run,this.sequentHollowNumber=0,this.getComponent("Rim").rims=[],this.ball.node.setPosition(this.ballInit),this.ball.node.setRotation(0),this.ball.getComponent("Ball").init(),this.ball.linearVelocity={x:0,y:0},this.ball.angularVelocity=0,this.ball.getComponent(cc.RigidBody).type=1},startGame:function(){this.init(),this.gameOverNode.active=!1,cc.audioEngine.play(this.startGameAudio,!1,.2),this.getComponent("Rim").spwnRim(),this.getComponent("Rim").spwnRim(),this.node.on(cc.Node.EventType.TOUCH_START,this.ball.getComponent("Ball").controlBall,this.ball)},playBtnClick:function(){this.startGame()},getScore:function(){if(this.getComponent("Rim").hollow?(this.ballFire.getComponent(cc.ParticleSystem).resetSystem(),this.sequentHollowNumber++,this.score+=this.sequentHollowNumber,cc.audioEngine.play(this.goalAudio,!1,1),cc.audioEngine.play(this.hollowAudio,!1,1),this.hollowLabel.active=!0,this.checkSequentHollowNumber(),this.hollowLabel.getComponent(cc.Animation).play()):(this.sequentHollowNumber=0,cc.audioEngine.play(this.goalAudio,!1,1),this.getComponent("Rim").hollow=!0),this.score++,this.scoreLabel.string=this.score,cc.sys.localStorage.getItem("maxScore")<this.score){for(var t=this.score+"";t.length<6;)t=" "+t;cc.sys.localStorage.setItem("maxScore",t)}},gameOver:function(){for(var t=this,i=this.score+"";i.length<6;)i=" "+i;cc.sys.localStorage.setItem("lastTimeScore",i),this.node.off(cc.Node.EventType.TOUCH_START,this.ball.getComponent("Ball").controlBall,this.ball),this.status=o.Over,this.getComponent("Rim").rims.forEach(function(t,i){for(var e in t)t[e].destroy()}),setTimeout(function(){t.gameOverNode.active=!0},2e3),cc.audioEngine.play(this.failAudio,!1,1)},checkSequentHollowNumber:function(){switch(this.sequentHollowNumber){case 1:this.color={a:255,b:235,g:191,r:156},this.rimFireTotalParticles=10,this.ballFireTotalParticles=20;break;case 2:this.color={a:255,b:77,g:232,r:255},this.rimFireTotalParticles=50,this.ballFireTotalParticles=70;break;default:this.color={a:255,b:68,g:63,r:252},this.rimFireTotalParticles=150,this.ballFireTotalParticles=170}this.getComponent("Rim").rims[0].bottomRim.children[0].getComponent(cc.ParticleSystem).totalParticles=this.rimFireTotalParticles,this.ballFire.getComponent(cc.ParticleSystem).totalParticles=this.ballFireTotalParticles,this.getComponent("Rim").rims[0].bottomRim.children[0].getComponent(cc.ParticleSystem).resetSystem(),this.hollowLabel.color=this.color,this.hollowLabel.children[0].color=this.color;var t=this.sequentHollowNumber+1;this.hollowLabel.children[0].getComponent(cc.Label).string="x"+t},homeBtnClick:function(){cc.director.loadScene("home")},update:function(t){}}),cc._RF.pop()},{}],Global:[function(t,i,e){"use strict";cc._RF.push(i,"1dfb611e2pFC489/kBMoppf","Global"),cc.director.getPhysicsManager().enabled=!0,cc.director.getPhysicsManager().gravity=cc.v2(0,-2700),cc._RF.pop()},{}],Hollow:[function(t,i,e){"use strict";cc._RF.push(i,"cd93f433C1NAZkAqyqhupKf","Hollow"),cc.Class({extends:cc.Component,properties:{game:null,collisionAudio:cc.AudioClip},onLoad:function(){this.lastTime=0},onBeginContact:function(t,i,e){(new Date).getTime()-this.lastTime>200&&cc.audioEngine.play(this.collisionAudio,!1,1),this.lastTime=(new Date).getTime(),this.game.getComponent("Rim").hollow=!1}}),cc._RF.pop()},{}],Menu:[function(t,i,e){"use strict";cc._RF.push(i,"bb365QOU7VDxIXFtbDhDKyh","Menu"),cc.Class({extends:cc.Component,properties:{maxScore:cc.Label,lastTimeScore:cc.Label},onLoad:function(){this.maxScore.string=cc.sys.localStorage.getItem("maxScore"),this.lastTimeScore.string=cc.sys.localStorage.getItem("lastTimeScore")},playBtnClick:function(){cc.director.loadScene("game")}}),cc._RF.pop()},{}],Rim:[function(t,i,e){"use strict";cc._RF.push(i,"93f91djTm5OGon3F7muXnUV","Rim");t("Ball");cc.Class({extends:cc.Component,properties:{topRim:cc.Prefab,bottomRim:cc.Prefab,rims:[],hollow:!0,nextRim:550},onLoad:function(){},init:function(){},spwnRim:function(){var t=this.rims.length,i=-350;t>=1&&(i=this.rims[t-1].topRim.x);var e=cc.instantiate(this.topRim),o=cc.instantiate(this.bottomRim);e.setPosition({x:i+this.nextRim,y:0}),o.setPosition({x:i+this.nextRim,y:0}),this.node.addChild(e,1),this.node.addChild(o,3),e.getComponent("Hollow").game=this,this.rims.push({topRim:e,bottomRim:o})},removeRim:function(t){var i=this;this.rims.forEach(function(e,o){if(t.node==e.bottomRim){for(var n in e)!function(t){e[t].removeComponent(cc.RigidBody),e[t].runAction(cc.sequence(cc.spawn(cc.scaleBy(.8,2),cc.fadeOut(.5)),cc.callFunc(function(){e[t].destroy()})))}(n);return i.spwnRim(),!0}return!1})}}),cc._RF.pop()},{Ball:"Ball"}]},{},["Ball","CheckGoal","Collision","Game","Global","Hollow","Menu","Rim"]);