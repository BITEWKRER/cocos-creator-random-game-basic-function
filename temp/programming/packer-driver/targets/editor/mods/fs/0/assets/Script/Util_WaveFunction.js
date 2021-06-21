System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _class2, _temp, _temp2, _crd, ccclass, property, UtilWaveFunction;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e36d9DGS5JB9KNjqaMzgQuS", "Util_WaveFunction", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UtilWaveFunction", UtilWaveFunction = (_dec = ccclass('UtilWaveFunction'), _dec(_class = (_temp = _class2 = class UtilWaveFunction extends Component {
        // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;
        static createSlot() {// let a=new this.slot(10,10);
          // console.log(a.test);
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _defineProperty(_class2, "slot", (_temp2 = class {
        constructor() {
          _defineProperty(this, "x", 0);

          _defineProperty(this, "y", 0);

          _defineProperty(this, "tiles", []);

          _defineProperty(this, "select", -1);

          _defineProperty(this, "collapsed", false);
        }

        static slot(x, y) {
          x = x;
          y = y;
        }

      }, _temp2)), _temp)) || _class));
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
//# sourceMappingURL=Util_WaveFunction.js.map