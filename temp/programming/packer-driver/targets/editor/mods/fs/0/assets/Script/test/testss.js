System.register(["cce:/internal/code-quality/cr.mjs", "cc", "../Util_CreateRandMap"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Util_CreateRandMap, _dec, _class, _crd, ccclass, property, Typescript;

  function _reportPossibleCrUseOfUtil_CreateRandMap(extras) {
    _reporterNs.report("Util_CreateRandMap", "../Util_CreateRandMap", _context.meta, extras);
  }

  return {
    setters: [function (_cceInternalCodeQualityCrMjs) {
      _reporterNs = _cceInternalCodeQualityCrMjs;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_Util_CreateRandMap) {
      Util_CreateRandMap = _Util_CreateRandMap.Util_CreateRandMap;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "54162ABJTRPsq0GTMa+iETX", "testss", undefined);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Typescript", Typescript = (_dec = ccclass('Typescript'), _dec(_class = class Typescript extends Component {
        // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;
        start() {
          const RoomList = (_crd && Util_CreateRandMap === void 0 ? (_reportPossibleCrUseOfUtil_CreateRandMap({
            error: Error()
          }), Util_CreateRandMap) : Util_CreateRandMap).initRoomList(8, 20, 20, 10, 10);
          const MainRoomList = RoomList.MainRoom; // const ViceRoomList = RoomList.ViceRoom;

          let terrainInfo = [];
          terrainInfo[0] = {
            id: 1,
            probability: 20
          };
          terrainInfo[1] = {
            id: 2,
            probability: 50
          };
          Util_MapRandContent.createTerrain(MainRoomList);
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }) || _class));
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
//# sourceMappingURL=testss.js.map