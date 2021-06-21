System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, Util_SimpleMath;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "26c88Q2nSNLSrQ/4M5tgdpX", "Util_simple_Math", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Util_SimpleMath", Util_SimpleMath = (_dec = ccclass('Util_SimpleMath'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Util_SimpleMath, _Component);

        function Util_SimpleMath() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = Util_SimpleMath.prototype;

        _proto.towPointAngle = function towPointAngle(x1, y1, x2, y2) {};

        return Util_SimpleMath;
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
//# sourceMappingURL=Util_simple_Math.js.map