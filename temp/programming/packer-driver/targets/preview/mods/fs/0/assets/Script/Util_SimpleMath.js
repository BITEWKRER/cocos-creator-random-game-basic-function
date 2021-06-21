System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Vec2, _crd, Util_SimpleMath;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      Vec2 = _cc.Vec2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "fc9cd3cyhJPVYKxEP4dJJ0X", "Util_SimpleMath", undefined);

      _export("Util_SimpleMath", Util_SimpleMath = /*#__PURE__*/function () {
        function Util_SimpleMath() {}

        Util_SimpleMath.getAngleByTowPoint = function getAngleByTowPoint(x1, y1, x2, y2) {
          var v1 = new Vec2(x1, y1);
          var v2 = new Vec2(x2, y2);
          var angle = new Vec2(1, 0).signAngle(v2.subtract(v1).normalize()) * 180 / Math.PI;

          if (angle < 0) {
            angle += 360;
          }

          return angle;
        };

        Util_SimpleMath.getTriangleCircleCenter = function getTriangleCircleCenter(x1, y1, x2, y2, x3, y3) {
          var t1 = x1 * x1 + y1 * y1;
          var t2 = x2 * x2 + y2 * y2;
          var t3 = x3 * x3 + y3 * y3;
          var temp = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
          var x = (t2 * y3 + t1 * y2 + t3 * y1 - t2 * y1 - t3 * y2 - t1 * y3) / temp / 2;
          var y = (t3 * x2 + t2 * x1 + t1 * x3 - t1 * x2 - t2 * x3 - t3 * x1) / temp / 2;
          return {
            x: x,
            y: y
          };
        };

        Util_SimpleMath.getTriangleCircleRadius = function getTriangleCircleRadius(x1, y1, x2, y2, x3, y3) {
          var a = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
          var b = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3));
          var c = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3));
          var p = (a + b + c) / 2;
          var S = Math.sqrt(p * (p - a) * (p - b) * (p - c));
          var radius = a * b * c / (4 * S);
          return radius;
        };

        Util_SimpleMath._Krusal = function _Krusal(poinset, edges) {
          //生成并查集的数据结构
          var tree = [];
          var poinset_parent = [];

          for (var i = 0; i < poinset.length; i++) {
            poinset_parent[i] = i;
          } //并查集查询


          var djs_find = function djs_find(i) {
            if (poinset_parent[i] == i) return i;else return djs_find(poinset_parent[i]);
          }; //并查集合并


          var djs_merge = function djs_merge(i, j) {
            poinset_parent[djs_find(i)] = djs_find(j);
          }; //回贴边到图中 直到tree的长度为n-1


          for (var _i = 0; _i < edges.length; _i++) {
            if (djs_find(edges[_i].v1) != djs_find(edges[_i].v2)) {
              djs_merge(edges[_i].v1, edges[_i].v2);
              tree.push(edges[_i]);
            }

            if (tree.length == poinset_parent.length - 1) break;
          } //返回最小生成树


          return tree;
        };

        return Util_SimpleMath;
      }());

      _defineProperty(Util_SimpleMath, "getDistanceByTowPoint", function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=Util_SimpleMath.js.map