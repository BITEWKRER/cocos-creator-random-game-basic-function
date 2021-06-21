System.register(["cce:/internal/code-quality/cr.mjs", "cc", "../Util_CreateRandMap", "../until_randomTerrain", "../Until_Relationship", "../Util_Event"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Graphics, Prefab, instantiate, UITransform, Sprite, Color, Util_CreateRandMap, UntilRandTerrain, UntilRelationship, UtilEvent, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _crd, ccclass, property, DrawMapInfo;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfUtil_CreateRandMap(extras) {
    _reporterNs.report("Util_CreateRandMap", "../Util_CreateRandMap", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUntilRandTerrain(extras) {
    _reporterNs.report("UntilRandTerrain", "../until_randomTerrain", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUntilRelationship(extras) {
    _reporterNs.report("UntilRelationship", "../Until_Relationship", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUtilEvent(extras) {
    _reporterNs.report("UtilEvent", "../Util_Event", _context.meta, extras);
  }

  return {
    setters: [function (_cceInternalCodeQualityCrMjs) {
      _reporterNs = _cceInternalCodeQualityCrMjs;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Graphics = _cc.Graphics;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      UITransform = _cc.UITransform;
      Sprite = _cc.Sprite;
      Color = _cc.Color;
    }, function (_Util_CreateRandMap) {
      Util_CreateRandMap = _Util_CreateRandMap.Util_CreateRandMap;
    }, function (_until_randomTerrain) {
      UntilRandTerrain = _until_randomTerrain.UntilRandTerrain;
    }, function (_Until_Relationship) {
      UntilRelationship = _Until_Relationship.UntilRelationship;
    }, function (_Util_Event) {
      UtilEvent = _Util_Event.UtilEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d544ary3j5KcKAqNHt7/xAa", "drawMapInfo", undefined);

      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("DrawMapInfo", DrawMapInfo = (_dec = ccclass("DrawMapInfo"), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Node), _dec5 = property(Prefab), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DrawMapInfo, _Component);

        function DrawMapInfo() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "room_unit", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "road_unit", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "camera", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "terrain", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "UNIT_SIZE", 5);

          _defineProperty(_assertThisInitialized(_this), "mid", void 0);

          return _this;
        }

        var _proto = DrawMapInfo.prototype;

        _proto.onLoad = function onLoad() {};

        _proto.start = function start() {
          var _this2 = this;

          var graphics = this.node.getComponent(Graphics);
          var RoomList = (_crd && Util_CreateRandMap === void 0 ? (_reportPossibleCrUseOfUtil_CreateRandMap({
            error: Error()
          }), Util_CreateRandMap) : Util_CreateRandMap).initRoomList(8, 20, 20, 10, 10); //返回了一个room对象

          var MainRoomList = RoomList.MainRoom;
          var ViceRoomList = RoomList.ViceRoom;
          var roadRect = (_crd && Util_CreateRandMap === void 0 ? (_reportPossibleCrUseOfUtil_CreateRandMap({
            error: Error()
          }), Util_CreateRandMap) : Util_CreateRandMap).createConnectedRoad(MainRoomList, ViceRoomList);
          roadRect.forEach(function (val) {
            var _unit_road$getCompone;

            var unit_road = instantiate(_this2.road_unit);
            unit_road.setPosition(val.x * _this2.UNIT_SIZE, val.y * _this2.UNIT_SIZE);
            (_unit_road$getCompone = unit_road.getComponent(UITransform)) === null || _unit_road$getCompone === void 0 ? void 0 : _unit_road$getCompone.setContentSize(val.w * _this2.UNIT_SIZE, val.h * _this2.UNIT_SIZE);

            _this2.node.addChild(unit_road);

            graphics === null || graphics === void 0 ? void 0 : graphics.rect(val.x * _this2.UNIT_SIZE, val.y * _this2.UNIT_SIZE, _this2.UNIT_SIZE * val.w, _this2.UNIT_SIZE * val.h);
            graphics === null || graphics === void 0 ? void 0 : graphics.stroke();
          });
          this.mid = RoomList.mid_p;
          MainRoomList.forEach(function (val, i) {
            var _unit$getComponent;

            var unit = instantiate(_this2.room_unit);
            unit.setPosition(val.x * _this2.UNIT_SIZE, val.y * _this2.UNIT_SIZE);
            (_unit$getComponent = unit.getComponent(UITransform)) === null || _unit$getComponent === void 0 ? void 0 : _unit$getComponent.setContentSize(val.w * _this2.UNIT_SIZE, val.h * _this2.UNIT_SIZE);

            _this2.node.addChild(unit); // unit.getComponent(MapUnitInfo)?.updateLabel('房间' + i + "x,y:" + unit.position.x / this.UNIT_SIZE + "," + unit.position.y / this.UNIT_SIZE);


            graphics === null || graphics === void 0 ? void 0 : graphics.rect(val.x * _this2.UNIT_SIZE, val.y * _this2.UNIT_SIZE, _this2.UNIT_SIZE * val.w, _this2.UNIT_SIZE * val.h);
            graphics === null || graphics === void 0 ? void 0 : graphics.stroke();
          });
          var test_terrain_info = [];
          test_terrain_info[0] = {
            id: 1,
            area: 0.2
          };
          test_terrain_info[1] = {
            id: 2,
            area: 0.35
          };
          var t = (_crd && UntilRandTerrain === void 0 ? (_reportPossibleCrUseOfUntilRandTerrain({
            error: Error()
          }), UntilRandTerrain) : UntilRandTerrain).createOne(MainRoomList[0], test_terrain_info); //init
          // this.createEvent();

          for (var i = 0; i < MainRoomList[0].w; i++) {
            for (var j = 0; j < MainRoomList[0].h; j++) {
              if (t[i][j] != -1) {
                var _t_unit$getComponent;

                var t_unit = instantiate(this.terrain);
                t_unit.setPosition((i + MainRoomList[0].x) * this.UNIT_SIZE, (j + MainRoomList[0].y) * this.UNIT_SIZE); // console.log(i, j);

                (_t_unit$getComponent = t_unit.getComponent(UITransform)) === null || _t_unit$getComponent === void 0 ? void 0 : _t_unit$getComponent.setContentSize(this.UNIT_SIZE, this.UNIT_SIZE);
                t_unit.getComponent(Sprite).color = new Color(t[i][j] * 45, 255 - t[i][j] * 45, t[i][j] * 45);
                this.node.addChild(t_unit);
              }
            }
          }
        };

        _proto.createEvent = function createEvent() {
          //小镇家族
          var result = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
            error: Error()
          }), UntilRelationship) : UntilRelationship).getTown(7);
          console.log(result); //随机事件

          var EveMag = (_crd && UtilEvent === void 0 ? (_reportPossibleCrUseOfUtilEvent({
            error: Error()
          }), UtilEvent) : UtilEvent).getAEveMag();
          EveMag.addEvent((_crd && UtilEvent === void 0 ? (_reportPossibleCrUseOfUtilEvent({
            error: Error()
          }), UtilEvent) : UtilEvent).getARandEvent(result, true));
          console.log(EveMag.getPool()[0]);
        };

        _proto.update = function update(deltaTime) {
          var _this$camera;

          (_this$camera = this.camera) === null || _this$camera === void 0 ? void 0 : _this$camera.setPosition(this.mid.x * this.UNIT_SIZE, this.mid.y * this.UNIT_SIZE);
        };

        return DrawMapInfo;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "room_unit", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "road_unit", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "terrain", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=drawMapInfo.js.map