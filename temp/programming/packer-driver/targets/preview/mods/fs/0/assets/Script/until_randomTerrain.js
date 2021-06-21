System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, _dec, _class, _crd, ccclass, property, UntilRandTerrain;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5ae5b9yXTtOS7HBKNqkntoY", "until_randomTerrain", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("UntilRandTerrain", UntilRandTerrain = (_dec = ccclass("UntilRandTerrain"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UntilRandTerrain, _Component);

        function UntilRandTerrain() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = UntilRandTerrain.prototype;

        _proto.createTerrain = function createTerrain(arg0, test_terrain_info) {
          throw new Error("Method not implemented.");
        } // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;
        ;

        _proto.start = function start() {};

        UntilRandTerrain.createTerrains = function createTerrains(rooms, terrain_info) {
          return this.createOne(rooms[0], terrain_info);
          console.log(rooms[0]);
        };

        UntilRandTerrain.createOne = function createOne(room, info) {
          // poss
          // let poss = 0.35;
          var PI = 3.1415926;
          var raid = 0;
          var r = 0.5; // area

          var area = room.w * room.h;
          console.log("area", area); //init

          var map = [];

          for (var i = 0; i < room.w; i++) {
            map[i] = [];

            for (var j = 0; j < room.h; j++) {
              map[i][j] = -1;
            }
          } // random point


          var rpx = Math.random() * room.w;
          var rpy = Math.random() * room.h;
          console.log(rpx, rpy); // domian

          var domain, domain_o, x, y;

          for (var _i = 0; _i < info.length; _i++) {
            domain = 0;
            domain_o = Math.floor(info[_i].area * area);

            while (domain < domain_o) {
              // x = Math.abs(Math.ceil(rpx + Math.cos(raid) * r));
              // y = Math.abs(Math.ceil(rpy + Math.sin(raid) * r));
              x = Math.abs(Math.ceil(rpx * Math.cos(raid) - rpy * Math.sin(raid)));
              y = Math.abs(Math.ceil(rpx * Math.sin(raid) + rpy * Math.cos(raid)));

              if (x < room.w && y < room.y && map[x][y] == -1) {
                domain++;
                map[x][y] = info[_i].id;
                raid += PI / 6;
              } else {
                rpx = Math.random() * room.w;
                rpy = Math.random() * room.h;
              }

              if (raid >= 2 * PI) {
                raid = 0;
                r++;
              }
            }
          } // output


          console.log(map);
          return map;
        };

        return UntilRandTerrain;
      }(Component)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=until_randomTerrain.js.map