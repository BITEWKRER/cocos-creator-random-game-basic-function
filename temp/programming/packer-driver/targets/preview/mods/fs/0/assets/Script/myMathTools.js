System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, TY;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fc9cd3cyhJPVYKxEP4dJJ0X", "myMathTools", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("TY", TY = (_dec = ccclass('TY'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TY, _Component);

        function TY() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TY.prototype;

        // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;
        _proto.start = function start() {
          var s = "hello world!";
          console.log(s);
        } // update (deltaTime: number) {
        //     // [4]
        // }
        ;

        return TY;
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
//# sourceMappingURL=myMathTools.js.map