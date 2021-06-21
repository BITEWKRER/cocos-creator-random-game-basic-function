System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, EveMagPool, UntilEveMag;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      EveMagPool = /*#__PURE__*/function () {
        function EveMagPool(event) {
          _defineProperty(this, "Event", void 0);

          this.Event = event;
        }

        var _proto = EveMagPool.prototype;

        _proto.addEvent = function addEvent(ev) {
          this.Event.push(ev);
        };

        return EveMagPool;
      }();

      _export("UntilEveMag", UntilEveMag = (_dec = ccclass("UntilEveMag"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UntilEveMag, _Component);

        function UntilEveMag() {
          return _Component.apply(this, arguments) || this;
        }

        return UntilEveMag;
      }(Component)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Until_EveMag.js.map