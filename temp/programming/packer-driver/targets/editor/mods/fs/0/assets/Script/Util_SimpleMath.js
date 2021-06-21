System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Vec2, Util_SimpleMath, _crd;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  _export("Util_SimpleMath", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      Vec2 = _cc.Vec2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fc9cd3cyhJPVYKxEP4dJJ0X", "Util_SimpleMath", undefined);

      _export("Util_SimpleMath", Util_SimpleMath = class Util_SimpleMath {
        static getAngleByTowPoint(x1, y1, x2, y2) {
          const v1 = new Vec2(x1, y1);
          const v2 = new Vec2(x2, y2);
          let angle = new Vec2(1, 0).signAngle(v2.subtract(v1).normalize()) * 180 / Math.PI;

          if (angle < 0) {
            angle += 360;
          }

          return angle;
        }

        static getTriangleCircleCenter(x1, y1, x2, y2, x3, y3) {
          const t1 = x1 * x1 + y1 * y1;
          const t2 = x2 * x2 + y2 * y2;
          const t3 = x3 * x3 + y3 * y3;
          const temp = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
          const x = (t2 * y3 + t1 * y2 + t3 * y1 - t2 * y1 - t3 * y2 - t1 * y3) / temp / 2;
          const y = (t3 * x2 + t2 * x1 + t1 * x3 - t1 * x2 - t2 * x3 - t3 * x1) / temp / 2;
          return {
            x: x,
            y: y
          };
        }

        static getTriangleCircleRadius(x1, y1, x2, y2, x3, y3) {
          const a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
          const b = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3));
          const c = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3));
          const p = (a + b + c) / 2;
          const S = Math.sqrt(p * (p - a) * (p - b) * (p - c));
          const radius = a * b * c / (4 * S);
          return radius;
        }

        static _Krusal(poinset, edges) {
          //生成并查集的数据结构
          let tree = [];
          let poinset_parent = [];

          for (let i = 0; i < poinset.length; i++) {
            poinset_parent[i] = i;
          } //并查集查询


          let djs_find = function (i) {
            if (poinset_parent[i] == i) return i;else return djs_find(poinset_parent[i]);
          }; //并查集合并


          let djs_merge = function (i, j) {
            poinset_parent[djs_find(i)] = djs_find(j);
          }; //回贴边到图中 直到tree的长度为n-1


          for (let i = 0; i < edges.length; i++) {
            if (djs_find(edges[i].v1) != djs_find(edges[i].v2)) {
              djs_merge(edges[i].v1, edges[i].v2);
              tree.push(edges[i]);
            }

            if (tree.length == poinset_parent.length - 1) break;
          } //返回最小生成树


          return tree;
        }

      });

      _defineProperty(Util_SimpleMath, "getDistanceByTowPoint", function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Util_SimpleMath.js.map