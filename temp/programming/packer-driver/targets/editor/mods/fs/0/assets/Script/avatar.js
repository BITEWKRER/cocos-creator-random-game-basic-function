System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, Sprite, SpriteAtlas, UITransform, resources, _dec, _class, _temp, _crd, ccclass, property, Avatar;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      SpriteAtlas = _cc.SpriteAtlas;
      UITransform = _cc.UITransform;
      resources = _cc.resources;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8f3f6a+F/NIj5iB1jvibdx5", "avatar", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Avatar", Avatar = (_dec = ccclass('Avatar'), _dec(_class = (_temp = class Avatar extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "parts", []);

          _defineProperty(this, "nowAni", 'idle');
        }

        updateAvatar(name, id, index) {
          console.log(name);
          let self = this;

          if (this.node.getChildByName(name) == null) {
            this.parts[name] = {
              index: index,
              id: -1
            };
            let avatarNode = new Node(name);
            this.node.addChild(avatarNode);
            avatarNode.addComponent(UITransform);
            let transform = avatarNode.getComponent(UITransform);
            let sprite = avatarNode.addComponent(Sprite);
            avatarNode.setPosition(0, 0);
            transform === null || transform === void 0 ? void 0 : transform.setAnchorPoint(0.5, 0);
            sprite.trim = false;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            transform.setContentSize(56, 45);
            console.log(transform === null || transform === void 0 ? void 0 : transform.contentSize);
            resources.load('textures/avatar_test', SpriteAtlas, (err, altas) => {
              // console.log(err);
              sprite.spriteAtlas = altas;
              self.updateFrame(name, id, 'idle', 0);
            });
            transform.priority = index;
          } else this.updateFrame(name, id, 'idle', 0);

          return this.node.getChildByName(name);
        }

        updateFrame(part, id, action, framecount) {
          var _this$node$getChildBy, _this$node$getChildBy2;

          (_this$node$getChildBy = this.node.getChildByName(part)) === null || _this$node$getChildBy === void 0 ? void 0 : (_this$node$getChildBy2 = _this$node$getChildBy.getComponent(Sprite)) === null || _this$node$getChildBy2 === void 0 ? void 0 : _this$node$getChildBy2.changeSpriteFrameFromAtlas(part + '_' + id + '_' + action + '_' + framecount);
        }

        start() {
          this.updateAvatar('body', 0, 0);
          this.updateAvatar('cost', 0, 1);
          this.updateAvatar('hair', 0, 2);
        }

      }, _temp)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=avatar.js.map