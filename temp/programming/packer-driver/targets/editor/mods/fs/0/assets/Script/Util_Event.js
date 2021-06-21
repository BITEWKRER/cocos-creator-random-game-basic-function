System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./Until_Relationship"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, UntilRelationship, reason, goal, procedure, event, EveMag, _dec, _class, _crd, ccclass, cnt, eventType, eventArea, UtilEvent;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _reportPossibleCrUseOfUntilRelationship(extras) {
    _reporterNs.report("UntilRelationship", "./Until_Relationship", _context.meta, extras);
  }

  _export({
    goal: void 0,
    procedure: void 0,
    event: void 0,
    EveMag: void 0
  });

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

      ({
        ccclass
      } = _decorator); //任务编号

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

      reason = class reason {
        // 发起位置
        //发起原因
        //地点制作
        //地点相关收集
        //该地点所占人家
        constructor(pos, posReason, posThing, posClt, fam) {
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

        setFam(fam) {
          return this.fam = fam;
        }

        getFam() {
          return this.fam;
        }

        setPos(pos) {
          return this.pos = pos;
        }

        setPosReason(rea) {
          return this.posReason = rea;
        }

        setPosMake(make) {
          return this.posMake = make;
        }

        setPosClt(clt) {
          return this.posClt = clt;
        }

        getPos() {
          return this.pos;
        }

        getPosClt() {
          return this.posClt;
        }

        getPosMake() {
          return this.posMake;
        }

        getPosReason() {
          return this.posReason;
        }

      }; //目标类

      _export("goal", goal = class goal {
        //完成目标
        //完成量
        constructor(name, G, N) {
          _defineProperty(this, "name", void 0);

          _defineProperty(this, "FinNumG", void 0);

          _defineProperty(this, "FinNumN", void 0);

          this.name = name;
          this.FinNumG = G;
          this.FinNumN = N;
        }

        setName(name) {
          return this.name = name;
        }

        setFinNumG(G) {
          return this.FinNumG = G;
        }

        setFinNumN(N) {
          return this.FinNumN = N;
        }

        getFinNumG() {
          return this.FinNumG;
        }

        getFinNumN() {
          return this.FinNumN;
        }

        getName() {
          return this.name;
        }

      });

      _export("procedure", procedure = class procedure {
        //城区还是副本
        //任务描述
        //任务对象接收人
        //任务地点
        //完成目标
        //任务类型
        //分支任务状态
        constructor(evT, evAF, evW, evP, evGoal) {
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

        update(evP, evW, evT, evGoal) {
          let dis;
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
        }

        toString(goals) {
          let tmp = "[";

          for (let i = 0; i < goals.length; i++) {
            tmp += goals[i].getName() + ":" + goals[i].getFinNumN() + "/" + goals[i].getFinNumG() + ",";
          }

          tmp = tmp.substring(0, tmp.length - 1);
          tmp += "]";
          return tmp;
        }

        getTotal() {
          let len = 0;

          for (let i = 0; i < this.evGoal.length; i++) {
            len += this.evGoal[i].getFinNumG();
          }

          return len;
        }

        setEvAF(evaf) {
          return this.evAF = evaf;
        }

        getEvAF() {
          return this.evAF;
        }

        setEvType(t) {
          this.update(this.evPos, this.evwho, t, this.evGoal);
          return this.evType = t;
        }

        setEvWho(w) {
          this.update(this.evPos, w, this.evType, this.evGoal);
          return this.evwho = w;
        }

        setEvGoal(g) {
          return this.evGoal = g;
        }

        getEvGoal() {
          return this.evGoal;
        }

        setEvTS(s) {
          return this.evTaskSts = s;
        }

        getEvTS() {
          return this.evTaskSts;
        }

        getEvType() {
          return this.evType;
        }

        getEvWho() {
          return this.evwho;
        }

        setPos(pos) {
          this.evPos = pos;
          this.update(pos, this.evwho, this.evType, this.evThing);
        }

        getDis() {
          return this.evDis;
        }

      });

      _export("event", event = class event {
        //任务编号
        //发起人
        //任务阶段
        //发起原因
        //奖励
        //执行过程
        // 任务状态
        constructor(person, res, process) {
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

          for (let i = 0; i < process.length; i++) {
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

        add(num) {
          for (let i = 1; i <= 3; i++) {
            this.prize.push(num + i + 1);
          }
        }

        setEvSts(S) {
          return this.evSts = S;
        }

        getProPerson() {
          return this.proPerson;
        }

        getProReason() {
          return this.proReason;
        }

        getPrize() {
          return this.prize;
        }

        getStage() {
          return this.stage;
        }

        getProcess() {
          return this.process;
        }

        getEvNum() {
          return this.evNum;
        }

        setProcess(p) {
          return this.process = p;
        }

        setPrize(p) {
          return this.prize = p;
        }

        setStage(i) {
          return this.stage = i;
        }

        setProPerson(p) {
          return this.proPerson = p;
        }

        setProposeReson(s) {
          return this.proReason = s;
        }

      });

      _export("EveMag", EveMag = class EveMag {
        constructor() {
          _defineProperty(this, "pool", void 0);

          this.pool = [];
        }

        getPool() {
          return this.pool;
        }

        addEvent(ev) {
          this.pool.push(ev);
        }

        FinishEvennt(n) {
          for (let i = 0; i < this.pool.length; i++) {
            if (this.pool[i].getEvNum() == n) {
              this.pool[i].setEvSts(true);
              return this.pool.splice(i, 1);
            }
          }

          return false;
        }

      });

      _export("UtilEvent", UtilEvent = (_dec = ccclass("UtilEvent"), _dec(_class = class UtilEvent extends Component {
        //返回一个任务池
        static getAEveMag() {
          return new EveMag();
        } //unuse


        static init(result) {
          // 原因与职业中地点一一对应
          let reas = [];
          let tmp;

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
        }

        static getARandEvent(result, board) {
          let pos, p, rad; //outside or inside

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


        static getACE(posNum, reasons, type) {
          let rad = (_crd && UntilRelationship === void 0 ? (_reportPossibleCrUseOfUntilRelationship({
            error: Error()
          }), UntilRelationship) : UntilRelationship).randNum(cPos.length);
          let myProcedure, thing, total; //收集或小怪数量

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
        }

        static getPosByName(family, name) {
          let sty = false;

          for (let i = 0; i < family.length; i++) {
            for (let j = 0; j < family[i].fam.length; j++) {
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


        static getATAM(who, pos, type, mtlN) {
          //任务会话对象
          let myProcedure; // WHO 根据board或者委托进行选择人

          if (type == eventType.talk) {
            myProcedure = new procedure(eventType.talk, eventArea.town, who, pos, [new goal("会话", 1, 0)]);
          } else {
            //制作东西应该是json读取
            myProcedure = new procedure(eventType.make, eventArea.town, who, pos, [new goal("物品", Math.floor(mtlN / 3), 0)]);
          }

          return myProcedure;
        } //发起人


        static getAInitP(areaName, result) {
          let rad, who, tmp; //选择非改区域的人

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
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Util_Event.js.map