System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./Until_Relationship"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, UntilRelationship, _dec, _class, _crd, ccclass, cnt, eventType, eventArea, reason, goal, procedure, event, EveMag, UtilEvent;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfUntilRelationship(extras) {
    _reporterNs.report("UntilRelationship", "./Until_Relationship", _context.meta, extras);
  }

  return {
    setters: [function (_cceInternalCodeQualityCrMjs) {
      _reporterNs = _cceInternalCodeQualityCrMjs;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_Until_Relationship) {
      UntilRelationship = _Until_Relationship.UntilRelationship;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a2dbcsTo0lLm5HWZDdEL4c1", "Util_Event", undefined);

      ccclass = _decorator.ccclass; //任务编号

      cnt = 0; //任务类型

      (function (eventType) {
        eventType[eventType["talk"] = 0] = "talk";
        eventType[eventType["collect"] = 1] = "collect";
        eventType[eventType["brush"] = 2] = "brush";
        eventType[eventType["make"] = 3] = "make";
      })(eventType || (eventType = {}));

      (function (eventArea) {
        eventArea[eventArea["town"] = 0] = "town";
        eventArea[eventArea["outside"] = 1] = "outside";
      })(eventArea || (eventArea = {}));

      reason = /*#__PURE__*/function () {
        // 发起位置
        //发起原因
        //地点制作
        //地点相关收集
        //该地点所占人家
        function reason(pos, posReason, posThing, posClt, fam) {
          _defineProperty(this, "pos", void 0);

          _defineProperty(this, "posReason", void 0);

          _defineProperty(this, "posMake", void 0);

          _defineProperty(this, "posClt", void 0);

          _defineProperty(this, "fam", void 0);

          this.pos = pos;
          this.posClt = posClt;
          this.posReason = posReason;
          this.posMake = posThing;
          this.fam = fam;
        }

        var _proto = reason.prototype;

        _proto.setFam = function setFam(fam) {
          return this.fam = fam;
        };

        _proto.getFam = function getFam() {
          return this.fam;
        };

        _proto.setPos = function setPos(pos) {
          return this.pos = pos;
        };

        _proto.setPosReason = function setPosReason(rea) {
          return this.posReason = rea;
        };

        _proto.setPosMake = function setPosMake(make) {
          return this.posMake = make;
        };

        _proto.setPosClt = function setPosClt(clt) {
          return this.posClt = clt;
        };

        _proto.getPos = function getPos() {
          return this.pos;
        };

        _proto.getPosClt = function getPosClt() {
          return this.posClt;
        };

        _proto.getPosMake = function getPosMake() {
          return this.posMake;
        };

        _proto.getPosReason = function getPosReason() {
          return this.posReason;
        };

        return reason;
      }(); //目标类


      _export("goal", goal = /*#__PURE__*/function () {
        //完成目标
        //完成量
        function goal(name, G, N) {
          _defineProperty(this, "name", void 0);

          _defineProperty(this, "FinNumG", void 0);

          _defineProperty(this, "FinNumN", void 0);

          this.name = name;
          this.FinNumG = G;
          this.FinNumN = N;
        }

        var _proto2 = goal.prototype;

        _proto2.setName = function setName(name) {
          return this.name = name;
        };

        _proto2.setFinNumG = function setFinNumG(G) {
          return this.FinNumG = G;
        };

        _proto2.setFinNumN = function setFinNumN(N) {
          return this.FinNumN = N;
        };

        _proto2.getFinNumG = function getFinNumG() {
          return this.FinNumG;
        };

        _proto2.getFinNumN = function getFinNumN() {
          return this.FinNumN;
        };

        _proto2.getName = function getName() {
          return this.name;
        };

        return goal;
      }());

      _export("procedure", procedure = /*#__PURE__*/function () {
        //城区还是副本
        //任务描述
        //任务对象接收人
        //任务地点
        //完成目标
        //任务类型
        //分支任务状态
        function procedure(evT, evAF, evW, evP, evGoal) {
          _defineProperty(this, "evAF", void 0);

          _defineProperty(this, "evDis", "");

          _defineProperty(this, "evwho", void 0);

          _defineProperty(this, "evPos", void 0);

          _defineProperty(this, "evGoal", void 0);

          _defineProperty(this, "evType", void 0);

          _defineProperty(this, "evTaskSts", false);

          this.evType = evT;
          this.evwho = evW;
          this.evPos = evP;
          this.evGoal = evGoal;
          this.evAF = evAF;
          this.update(evP, evW, evT, evGoal);
        }

        var _proto3 = procedure.prototype;

        _proto3.update = function update(evP, evW, evT, evGoal) {
          var dis;
          this.evDis = "地点：" + evP + ",对象：" + evW + ",任务：";

          switch (evT) {
            case eventType.talk:
              this.evDis += "与" + evW + "会话(" + evGoal[0].getFinNumN() + "/" + evGoal[0].getFinNumG() + ")";
              break;

            case eventType.collect:
              dis = this.toString(evGoal);
              this.evDis += "收集" + dis;
              break;

            case eventType.brush:
              dis = this.toString(evGoal);
              this.evDis += "清除" + dis;
              break;

            case eventType.make:
              dis = this.toString(evGoal);
              this.evDis += "制" + dis;
              break;
          }
        };

        _proto3.toString = function toString(goals) {
          var tmp = "[";

          for (var i = 0; i < goals.length; i++) {
            tmp += goals[i].getName() + ":" + goals[i].getFinNumN() + "/" + goals[i].getFinNumG() + ",";
          }

          tmp = tmp.substring(0, tmp.length - 1);
          tmp += "]";
          return tmp;
        };

        _proto3.getTotal = function getTotal() {
          var len = 0;

          for (var i = 0; i < this.evGoal.length; i++) {
            len += this.evGoal[i].getFinNumG();
          }

          return len;
        };

        _proto3.setEvAF = function setEvAF(evaf) {
          return this.evAF = evaf;
        };

        _proto3.getEvAF = function getEvAF() {
          return this.evAF;
        };

        _proto3.setEvType = function setEvType(t) {
          this.update(this.evPos, this.evwho, t, this.evGoal);
          return this.evType = t;
        };

        _proto3.setEvWho = function setEvWho(w) {
          this.update(this.evPos, w, this.evType, this.evGoal);
          return this.evwho = w;
        };

        _proto3.setEvGoal = function setEvGoal(g) {
          return this.evGoal = g;
        };

        _proto3.getEvGoal = function getEvGoal() {
          return this.evGoal;
        };

        _proto3.setEvTS = function setEvTS(s) {
          return this.evTaskSts = s;
        };

        _proto3.getEvTS = function getEvTS() {
          return this.evTaskSts;
        };

        _proto3.getEvType = function getEvType() {
          return this.evType;
        };

        _proto3.getEvWho = function getEvWho() {
          return this.evwho;
        };

        _proto3.setPos = function setPos(pos) {
          this.evPos = pos;
          this.update(pos, this.evwho, this.evType, this.evThing);
        };

        _proto3.getDis = function getDis() {
          return this.evDis;
        };

        return procedure;
      }());

      _export("event", event = /*#__PURE__*/function () {
        //任务编号
        //发起人
        //任务阶段
        //发起原因
        //奖励
        //执行过程
        // 任务状态
        function event(person, res, process) {
          _defineProperty(this, "evNum", cnt);

          _defineProperty(this, "proPerson", void 0);

          _defineProperty(this, "stage", 0);

          _defineProperty(this, "proReason", void 0);

          _defineProperty(this, "prize", void 0);

          _defineProperty(this, "process", void 0);

          _defineProperty(this, "evSts", false);

          this.proPerson = person;
          this.proReason = res; //this.proPerson + "想" + res

          this.process = process;
          this.prize = []; //计算金币奖励

          for (var i = 0; i < process.length; i++) {
            //城外
            if (process[i].getEvAF() == eventArea.outside) {
              if (process[i].getTotal() <= 3) {
                this.add(4);
              } else if (process[i].getTotal() <= 6) {
                this.add(10);
              } else if (process[i].getTotal() <= 9) {
                this.add(14);
              } else {
                this.add(16);
              }
            } else {
              //城内
              if (process[i].getTotal() <= 2) {
                this.add(1);
              } else {
                this.add(3);
              }
            }
          }

          cnt++;
        }

        var _proto4 = event.prototype;

        _proto4.add = function add(num) {
          for (var i = 1; i <= 3; i++) {
            this.prize.push(num + i + 1);
          }
        };

        _proto4.setEvSts = function setEvSts(S) {
          return this.evSts = S;
        };

        _proto4.getProPerson = function getProPerson() {
          return this.proPerson;
        };

        _proto4.getProReason = function getProReason() {
          return this.proReason;
        };

        _proto4.getPrize = function getPrize() {
          return this.prize;
        };

        _proto4.getStage = function getStage() {
          return this.stage;
        };

        _proto4.getProcess = function getProcess() {
          return this.process;
        };

        _proto4.getEvNum = function getEvNum() {
          return this.evNum;
        };

        _proto4.setProcess = function setProcess(p) {
          return this.process = p;
        };

        _proto4.setPrize = function setPrize(p) {
          return this.prize = p;
        };

        _proto4.setStage = function setStage(i) {
          return this.stage = i;
        };

        _proto4.setProPerson = function setProPerson(p) {
          return this.proPerson = p;
        };

        _proto4.setProposeReson = function setProposeReson(s) {
          return this.proReason = s;
        };

        return event;
      }());

      _export("EveMag", EveMag = /*#__PURE__*/function () {
        function EveMag() {
          _defineProperty(this, "pool", void 0);

          this.pool = [];
        }

        var _proto5 = EveMag.prototype;

        _proto5.getPool = function getPool() {
          return this.pool;
        };

        _proto5.addEvent = function addEvent(ev) {
          this.pool.push(ev);
        };

        _proto5.FinishEvennt = function FinishEvennt(n) {
          for (var i = 0; i < this.pool.length; i++) {
            if (this.pool[i].getEvNum() == n) {
              this.pool[i].setEvSts(true);
              return this.pool.splice(i, 1);
            }
          }

          return false;
        };

        return EveMag;
      }());

      _export("UtilEvent", UtilEvent = (_dec = ccclass("UtilEvent"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UtilEvent, _Component);

        function UtilEvent() {
          return _Component.apply(this, arguments) || this;
        }

        //返回一个任务池
        UtilEvent.getAEveMag = function getAEveMag() {
          return new EveMag();
        } //unuse
        ;

        UtilEvent.init = function init(result) {
          // 原因与职业中地点一一对应
          var reas = [];
          var tmp;

          if (result.length > 0) {
            tmp = new reason("酒肆", "喝青梅酒", "酒", ["青梅", "白糖"], result[0].fam);
            reas.push(tmp);
          }

          if (result.length > 1) {
            tmp = new reason("客栈", "找地方吃饭", "菜", ["折耳根", "蘑菇"], result[1].fam);
            reas.push(tmp);
          }

          if (result.length > 2) {
            tmp = new reason("医坊", "买药膏治肾亏", "药", ["木香", "川连"], result[2].fam);
            reas.push(tmp);
          }

          if (result.length > 3) {
            tmp = new reason("铁匠铺", "买刀防身", "刀", ["铁屑", "木材"], result[3].fam);
            reas.push(tmp);
          }

          if (result.length > 4) {
            tmp = new reason("茶馆", "买茶送好友茶", "茶", ["茶尖", "茶苗"], result[4].fam);
            reas.push(tmp);
          }

          if (result.length > 5) {
            tmp = new reason("裁缝店", "买丝绸", "衣", ["锦缎", "麻布"], result[5].fam);
            reas.push(tmp);
          }

          if (result.length > 6) {
            tmp = new reason("商铺", "买胭脂", "胭脂", ["蜀葵花", "山花"], result[6].fam);
            reas.push(tmp);
          }

          return reas;
        };

        UtilEvent.getARandEvent = function getARandEvent(result, board) {
          var pos, p, rad; //outside or inside

          rad = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
            error: Error()
          }), UntilRelationship) : UntilRelationship).randNum(4) % 2; //inside

          if (rad == 0) {} //任务版任务，主要是刷怪，会话


          do {
            rad = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
              error: Error()
            }), UntilRelationship) : UntilRelationship).randNum(result.length);
            p = this.getAInitP(result[rad].famCause, result).getName();
            pos = this.getPosByName(result, p);
          } while (pos == "帝王🕊");

          if (board) {
            //随机选择一个人，说出线索eg：黑娃出村回来之后受到了惊吓，前去帮助。。，黑娃说出线索，刷怪
            return new event(p, window.mons[0].res, [this.getATAM(p, pos, eventType.talk, -1), this.getATAM(p, pos, eventType.brush, 3)]);
          } else {
            //委托人任务，会话，收集，制作
            //制作地 产生
            return new event(p, window.mons[0].res, [this.getATAM(p, pos, eventType.talk, -1), this.getATAM(p, pos, eventType.brush, 3)]);
          }
        } //收集任务、刷怪
        ;

        UtilEvent.getACE = function getACE(posNum, reasons, type) {
          var rad = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
            error: Error()
          }), UntilRelationship) : UntilRelationship).randNum(cPos.length);
          var myProcedure, thing, total; //收集或小怪数量

          if (eventType.collect == type) {
            //选取物品
            do {
              thing = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
                error: Error()
              }), UntilRelationship) : UntilRelationship).randNum(reasons[posNum].getPosClt().length);
            } while (thing == 0); // 收集数量


            do {
              total = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
                error: Error()
              }), UntilRelationship) : UntilRelationship).randNum(21);
            } while (total == 0);

            myProcedure = new procedure(rad, eventType.collect, eventArea.outside, reasons[posNum].getPosClt()[thing], reasons[posNum].getPosClt()[thing], total, cPos[rad]);
          } else {
            do {
              thing = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
                error: Error()
              }), UntilRelationship) : UntilRelationship).randNum(ugly.length);
            } while (thing == 0);

            do {
              total = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
                error: Error()
              }), UntilRelationship) : UntilRelationship).randNum(21);
            } while (total == 0);

            myProcedure = new procedure(rad, eventType.brush, eventArea.outside, ugly[thing], ugly[thing], total, cPos[rad]);
          }

          return myProcedure;
        };

        UtilEvent.getPosByName = function getPosByName(family, name) {
          var sty = false;

          for (var i = 0; i < family.length; i++) {
            for (var j = 0; j < family[i].fam.length; j++) {
              if (family[i].fam[j].getName() == name) {
                sty = true;
                break;
              }
            }

            if (sty) {
              return family[i].famCause;
            }
          }

          return "帝王🕊";
        } //会话任务与制作任务
        ;

        UtilEvent.getATAM = function getATAM(who, pos, type, mtlN) {
          //任务会话对象
          var myProcedure; // WHO 根据board或者委托进行选择人

          if (type == eventType.talk) {
            myProcedure = new procedure(eventType.talk, eventArea.town, who, pos, [new goal("会话", 1, 0)]);
          } else {
            //制作东西应该是json读取
            myProcedure = new procedure(eventType.make, eventArea.town, who, pos, [new goal("物品", Math.floor(mtlN / 3), 0)]);
          }

          return myProcedure;
        } //发起人
        ;

        UtilEvent.getAInitP = function getAInitP(areaName, result) {
          var rad, who, tmp; //选择非改区域的人

          do {
            rad = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
              error: Error()
            }), UntilRelationship) : UntilRelationship).randNum(result.length);
          } while (result[rad].famCause == areaName);

          tmp = rad;

          do {
            rad = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
              error: Error()
            }), UntilRelationship) : UntilRelationship).randNum(result[tmp].fam.length);
            who = result[tmp].fam[rad];
          } while (who.getDeadSts() == true);

          return who;
        };

        return UtilEvent;
      }(Component)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Util_Event.js.map