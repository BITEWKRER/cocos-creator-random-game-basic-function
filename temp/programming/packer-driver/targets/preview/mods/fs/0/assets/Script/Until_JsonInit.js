System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, JsonAsset, resources, _dec, _class, _crd, ccclass, property, UntilJsonInit;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      JsonAsset = _cc.JsonAsset;
      resources = _cc.resources;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7f189zj8EZID6zrVhH/5a3d", "Until_JsonInit", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("UntilJsonInit", UntilJsonInit = (_dec = ccclass("UntilJsonInit"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UntilJsonInit, _Component);

        function UntilJsonInit() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = UntilJsonInit.prototype;

        _proto.onLoad = function onLoad() {
          resources.load("JSON/monster", JsonAsset, function (err, arrJsonRes) {
            if (err) {
              console.log(err);
              return;
            }

            window.mons = JsonAsset.deserialize(arrJsonRes).json.mons;
          });
          resources.load("JSON/clue", JsonAsset, function (err, arrJsonRes) {
            if (err) {
              console.log(err);
              return;
            }

            window.clue = JsonAsset.deserialize(arrJsonRes).json;
          });
          resources.load("JSON/material", JsonAsset, function (err, arrJsonRes) {
            if (err) {
              console.log(err);
              return;
            }

            window.matl = JsonAsset.deserialize(arrJsonRes).json.matl;
          });
          resources.load("JSON/copy", JsonAsset, function (err, arrJsonRes) {
            if (err) {
              console.log(err);
              return;
            }

            window.copy = JsonAsset.deserialize(arrJsonRes).json;
          });
          resources.load("JSON/town", JsonAsset, function (err, arrJsonRes) {
            if (err) {
              console.log(err);
              return;
            }

            window.town = JsonAsset.deserialize(arrJsonRes).json;
          });
        };

        return UntilJsonInit;
      }(Component)) || _class));
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
//# sourceMappingURL=Until_JsonInit.js.map