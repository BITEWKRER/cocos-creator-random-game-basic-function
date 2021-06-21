System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, Sprite, SpriteAtlas, UITransform, resources, _dec, _class, _temp, _crd, ccclass, property, Avatar;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Avatar", Avatar = (_dec = ccclass('Avatar'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Avatar, _Component);

        function Avatar() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "parts", []);

          _defineProperty(_assertThisInitialized(_this), "nowAni", 'idle');

          return _this;
        }

        var _proto = Avatar.prototype;

        _proto.updateAvatar = function updateAvatar(name, id, index) {
          console.log(name);
          var self = this;

          if (this.node.getChildByName(name) == null) {
            this.parts[name] = {
              index: index,
              id: -1
            };
            var avatarNode = new Node(name);
            this.node.addChild(avatarNode);
            avatarNode.addComponent(UITransform);
            var transform = avatarNode.getComponent(UITransform);
            var sprite = avatarNode.addComponent(Sprite);
            avatarNode.setPosition(0, 0);
            transform === null || transform === void 0 ? void 0 : transform.setAnchorPoint(0.5, 0);
            sprite.trim = false;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            transform.setContentSize(56, 45);
            console.log(transform === null || transform === void 0 ? void 0 : transform.contentSize);
            resources.load('textures/avatar_test', SpriteAtlas, function (err, altas) {
              // console.log(err);
              sprite.spriteAtlas = altas;
              self.updateFrame(name, id, 'idle', 0);
            });
            transform.priority = index;
          } else this.updateFrame(name, id, 'idle', 0);

          return this.node.getChildByName(name);
        };

        _proto.updateFrame = function updateFrame(part, id, action, framecount) {
          var _this$node$getChildBy, _this$node$getChildBy2;

          (_this$node$getChildBy = this.node.getChildByName(part)) === null || _this$node$getChildBy === void 0 ? void 0 : (_this$node$getChildBy2 = _this$node$getChildBy.getComponent(Sprite)) === null || _this$node$getChildBy2 === void 0 ? void 0 : _this$node$getChildBy2.changeSpriteFrameFromAtlas(part + '_' + id + '_' + action + '_' + framecount);
        };

        _proto.start = function start() {
          this.updateAvatar('body', 0, 0);
          this.updateAvatar('cost', 0, 1);
          this.updateAvatar('hair', 0, 2);
        };

        return Avatar;
      }(Component), _temp)) || _class));
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