System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, EveMagPool, _dec, _class, _crd, ccclass, property, UntilEveMag;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4bc74AUW9VEPK4xWn41nGEH", "Until_EveMag", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      EveMagPool = class EveMagPool {
        constructor(event) {
          _defineProperty(this, "Event", void 0);

          this.Event = event;
        }

        addEvent(ev) {
          this.Event.push(ev);
        }

      };

      _export("UntilEveMag", UntilEveMag = (_dec = ccclass("UntilEveMag"), _dec(_class = class UntilEveMag extends Component {}) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Until_EveMag.js.map