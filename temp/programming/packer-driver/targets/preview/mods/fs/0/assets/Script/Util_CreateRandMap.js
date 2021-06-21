System.register(["cce:/internal/code-quality/cr.mjs", "cc", "./Util_SimpleMath"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Util_SimpleMath, _crd, Util_CreateRandMap;

  function _reportPossibleCrUseOfUtil_SimpleMath(extras) {
    _reporterNs.report("Util_SimpleMath", "./Util_SimpleMath", _context.meta, extras);
  }

  return {
    setters: [function (_cceInternalCodeQualityCrMjs) {
      _reporterNs = _cceInternalCodeQualityCrMjs;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_Util_SimpleMath) {
      Util_SimpleMath = _Util_SimpleMath.Util_SimpleMath;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4b045kxXftB6JwnKICTHgrb", "Util_CreateRandMap", undefined);

      _export("Util_CreateRandMap", Util_CreateRandMap = /*#__PURE__*/function () {
        function Util_CreateRandMap() {}

        /*
          room_number:输入要生成的房间数量
          max_width:生成房间的最大宽度
          max_height:生成房间的最大高度
          min_width:生成房间的最小宽度
          min_height:生成房间的最小高度
          */
        Util_CreateRandMap.initRoomList = function initRoomList(room_number, max_width, max_height, min_width, min_height) {
          var rooms = []; //在一个圆形区域内生成若干个大小不同的房间

          var r = 100;

          for (var i = 0; i < room_number * 4; i++) {
            var room_width = min_width + Math.floor(Math.random() * (max_width - min_width));
            var room_height = min_height + Math.floor(Math.random() * (max_height - min_height));
            var room_raid = Math.random() * Math.PI * 2;
            var room_x = Math.floor(Math.cos(room_raid) * Math.random() * r);
            var room_y = Math.floor(Math.sin(room_raid) * Math.random() * r);
            var room_local = {
              x: room_x,
              y: room_y,
              w: room_width,
              h: room_height,
              to: []
            };
            rooms.push(room_local);
          } //将重叠的房间进行分离


          rooms[0].x = 0;
          rooms[0].y = 0;
          rooms.sort(function (a, b) {
            return a.x - b.x;
          });

          for (var _i = 1; _i < rooms.length; _i++) {
            rooms[_i].x = rooms[_i - 1].x + rooms[_i - 1].w;
          }

          rooms.sort(function (a, b) {
            return a.y - b.y;
          });

          for (var _i2 = 1; _i2 < rooms.length; _i2++) {
            rooms[_i2].y = rooms[_i2 - 1].y + rooms[_i2 - 1].h;
          }

          var mid = {
            x: 0,
            y: 0
          };
          rooms.forEach(function (val) {
            mid.x += val.x;
            mid.y += val.y;
          });
          mid.x /= rooms.length;
          mid.y /= rooms.length;
          rooms.sort(function (a, b) {
            return (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
              error: Error()
            }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(a.x, a.y, mid.x, mid.y) - (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
              error: Error()
            }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(b.x, b.y, mid.x, mid.y);
          }); // 将分离的房间聚拢；

          var MRoom = [];
          var VRoom = [];

          for (var _i3 = 0; _i3 < rooms.length; _i3++) {
            var searching = true;
            var raid = (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
              error: Error()
            }), Util_SimpleMath) : Util_SimpleMath).getAngleByTowPoint(rooms[_i3].x, rooms[_i3].y, mid.x, mid.y) / 180 * Math.PI;
            var speed = 5;

            while (searching) {
              var next = {
                x: rooms[_i3].x + Math.cos(raid) * speed,
                y: rooms[_i3].y + Math.sin(raid) * speed
              };

              if ((_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
                error: Error()
              }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(next.x, next.y, mid.x, mid.y) <= speed || (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
                error: Error()
              }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(rooms[_i3].x, rooms[_i3].y, mid.x, mid.y) <= speed) {
                searching = false;
              }

              for (var j = 0; j < rooms.length; j++) {
                if (j != _i3) {
                  var i_info = {
                    left: next.x,
                    right: next.x + rooms[_i3].w,
                    top: next.y + rooms[_i3].h,
                    bootom: next.y
                  };
                  var j_info = {
                    left: rooms[j].x,
                    right: rooms[j].x + rooms[j].w,
                    top: rooms[j].y + rooms[j].h,
                    bootom: rooms[j].y
                  };

                  if (!(i_info.left > j_info.right || i_info.right < j_info.left || i_info.top < j_info.bootom || i_info.bootom > j_info.top)) {
                    searching = false;
                  }
                }
              }

              if (searching) {
                rooms[_i3].x = next.x;
                rooms[_i3].y = next.y;
              }
            }

            if (_i3 % 4 == 0) MRoom.push(rooms[_i3]);else VRoom.push(rooms[_i3]);
          }

          return {
            MainRoom: MRoom,
            ViceRoom: VRoom,
            mid_p: mid
          };
        }
        /*
          基于平面点集的三角剖分，使用逐点插入算法
          poinset:点集
          index:当前点在点集的下标
          triangle:三角形数组
          */
        ;

        Util_CreateRandMap.Bowyer = function Bowyer(poinset, index, triangle) {
          //初次执行先添加超级三角形
          if (index == 0) {
            poinset.push({
              x: -30000,
              y: -30000
            });
            poinset.push({
              x: 30000,
              y: -30000
            });
            poinset.push({
              x: 0,
              y: 30000
            });
            triangle.splice(0, 0, [poinset.length - 1, poinset.length - 2, poinset.length - 3]);
          }

          if (index == poinset.length) {
            //移除超级三角形
            for (var i = triangle.length - 1; i >= 0; i--) {
              if (poinset[triangle[i][0]].y == 30000 || poinset[triangle[i][0]].y == -30000 || poinset[triangle[i][1]].y == 30000 || poinset[triangle[i][1]].y == -30000 || poinset[triangle[i][2]].y == 30000 || poinset[triangle[i][2]].y == -30000) {
                triangle.splice(i, 1);
              }
            }

            poinset.splice(poinset.length - 3, 3); //返回三角形数组

            return triangle;
          }

          var edge = [];

          for (var _i4 = triangle.length - 1; _i4 >= 0; _i4--) {
            //计算三角形外接圆的圆心和周长
            var c_center = (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
              error: Error()
            }), Util_SimpleMath) : Util_SimpleMath).getTriangleCircleCenter(poinset[triangle[_i4][0]].x, poinset[triangle[_i4][0]].y, poinset[triangle[_i4][1]].x, poinset[triangle[_i4][1]].y, poinset[triangle[_i4][2]].x, poinset[triangle[_i4][2]].y);
            var c_r = (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
              error: Error()
            }), Util_SimpleMath) : Util_SimpleMath).getTriangleCircleRadius(poinset[triangle[_i4][0]].x, poinset[triangle[_i4][0]].y, poinset[triangle[_i4][1]].x, poinset[triangle[_i4][1]].y, poinset[triangle[_i4][2]].x, poinset[triangle[_i4][2]].y); //判断点是否在外接圆内

            if ((_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
              error: Error()
            }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(poinset[index].x, poinset[index].y, c_center.x, c_center.y) < c_r) {
              //添加三角形的三条边到边数组
              edge.push({
                st: triangle[_i4][0],
                ed: triangle[_i4][1]
              });
              edge.push({
                st: triangle[_i4][0],
                ed: triangle[_i4][2]
              });
              edge.push({
                st: triangle[_i4][1],
                ed: triangle[_i4][2]
              }); //移除这个三角形

              triangle.splice(_i4, 1);
            }
          } //去掉重复的边


          for (var _i5 = 0; _i5 < edge.length - 1; _i5++) {
            var is_re = false;

            for (var j = _i5 + 1; j < edge.length; j++) {
              if (edge[_i5].st == edge[j].st && edge[_i5].ed == edge[j].ed || edge[_i5].ed == edge[j].st && edge[_i5].st == edge[j].ed) {
                edge[j] = -1;
                is_re = true;
              }
            }

            if (is_re) {
              edge[_i5] = -1;
            }
          }

          for (var _i6 = edge.length - 1; _i6 >= 0; _i6--) {
            if (edge[_i6] == -1) edge.splice(_i6, 1);
          } //将边添加到三角形数组中


          edge.forEach(function (val) {
            triangle.push([index, val.st, val.ed]);
          });
          return this.Bowyer(poinset, index + 1, triangle);
        }
        /*
          生成房间通路
          rooms:房间的列表
          */
        ;

        Util_CreateRandMap.createConnectedRoad = function createConnectedRoad(rooms, vrooms) {
          var roadRects = [];
          var triangle = [];
          triangle = this.Bowyer(rooms, 0, triangle); //提取三角形的边

          var edges = [];
          triangle.forEach(function (val) {
            edges.push({
              v1: val[0],
              v2: val[1],
              weight: (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
                error: Error()
              }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(rooms[val[0]].x, rooms[val[0]].y, rooms[val[1]].x, rooms[val[1]].x)
            });
            edges.push({
              v1: val[0],
              v2: val[2],
              weight: (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
                error: Error()
              }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(rooms[val[0]].x, rooms[val[0]].y, rooms[val[2]].x, rooms[val[2]].x)
            });
            edges.push({
              v1: val[1],
              v2: val[2],
              weight: (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
                error: Error()
              }), Util_SimpleMath) : Util_SimpleMath).getDistanceByTowPoint(rooms[val[1]].x, rooms[val[1]].y, rooms[val[2]].x, rooms[val[2]].x)
            });
          }); //删除公共边

          edges.forEach(function (val, i) {
            for (var j = i + 1; j < edges.length; j++) {
              if (val != -1 && edges[j] != -1) {
                if (val.v1 == edges[j].v1 && val.v2 == edges[j].v2 || val.v2 == edges[j].v1 && val.v1 == edges[j].v2) {
                  edges[j] = -1;
                }
              }
            }
          });

          for (var i = edges.length - 1; i >= 0; i--) {
            if (edges[i] == -1) edges.splice(i, 1);
          } //用最小生成树来获得房间之间的连通关系


          var tree = (_crd && Util_SimpleMath === void 0 ? (_reportPossibleCrUseOfUtil_SimpleMath({
            error: Error()
          }), Util_SimpleMath) : Util_SimpleMath)._Krusal(rooms, edges);

          tree.forEach(function (val) {
            rooms[val.v1].to.push(val.v2);
          }); //生成道路矩形

          rooms.forEach(function (room_i, index) {
            if (room_i.to.length > 0) {
              var _loop = function _loop(_i7) {
                //从两个房间的边上各自选取一点作为通路的起点和终点
                var direction_horizon = 0;
                var direction_vertical = 0;
                var m_p = room_i;
                var n_p = rooms[room_i.to[_i7]];
                var m_p_info = {
                  left: m_p.x,
                  right: m_p.x + m_p.w,
                  top: m_p.y + m_p.h,
                  bottom: m_p.y
                };
                var n_p_info = {
                  left: n_p.x,
                  right: n_p.x + n_p.w,
                  top: n_p.y + n_p.h,
                  bottom: n_p.y
                };
                if (m_p_info.right < n_p_info.left) direction_horizon = 1;else if (m_p_info.left > n_p_info.right) direction_horizon = -1;
                if (m_p_info.top < n_p_info.bottom) direction_vertical = 1;else if (m_p_info.bottom > n_p_info.top) direction_vertical = -1;
                var roadRect = []; //由于房间不重叠 所以不会出现 horizon 和 vertical 都为0的情况

                var rect = {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                };
                rect.left = m_p_info.left > n_p_info.left ? m_p_info.left : n_p_info.left;
                rect.right = m_p_info.right < n_p_info.right ? m_p_info.right : n_p_info.right;
                rect.bottom = m_p_info.bottom > n_p_info.bottom ? m_p_info.bottom : n_p_info.bottom;
                rect.top = m_p_info.top < n_p_info.top ? m_p_info.top : n_p_info.top;

                if (direction_horizon == 0) {
                  if (direction_vertical == 1) roadRect.push({
                    x: (rect.left + rect.right) / 2,
                    y: m_p_info.top,
                    w: 1,
                    h: n_p_info.bottom - m_p_info.top
                  });else roadRect.push({
                    x: (rect.left + rect.right) / 2,
                    y: n_p_info.top,
                    w: 1,
                    h: m_p_info.bottom - n_p_info.top
                  });
                }

                if (direction_vertical == 0) {
                  if (direction_horizon == 1) roadRect.push({
                    x: rect.right,
                    y: (rect.top + rect.bottom) / 2,
                    w: n_p_info.left - m_p_info.right,
                    h: 1
                  });else roadRect.push({
                    x: rect.right,
                    y: (rect.top + rect.bottom) / 2,
                    w: m_p_info.left - n_p_info.right,
                    h: 1
                  });
                }

                if (direction_horizon != 0 && direction_vertical != 0) {
                  var mid = {
                    x_m: (m_p_info.left + m_p_info.right) / 2,
                    x_n: (n_p_info.left + n_p_info.right) / 2,
                    y_m: (m_p_info.top + m_p_info.bottom) / 2,
                    y_n: (n_p_info.top + n_p_info.bottom) / 2
                  };

                  if (direction_horizon == 1) {
                    if (direction_vertical == 1) {
                      roadRect.push({
                        x: mid.x_m,
                        y: m_p_info.top,
                        w: 1,
                        h: mid.y_n - m_p_info.top
                      });
                      roadRect.push({
                        x: mid.x_m,
                        y: mid.y_n,
                        w: n_p_info.left - mid.x_m,
                        h: 1
                      });
                    } else {
                      roadRect.push({
                        x: m_p_info.right,
                        y: mid.y_m,
                        w: mid.x_n - m_p_info.right + 1,
                        h: 1
                      });
                      roadRect.push({
                        x: mid.x_n,
                        y: n_p_info.top,
                        w: 1,
                        h: mid.y_m - n_p_info.top
                      });
                    }
                  } else {
                    if (direction_vertical == 1) {
                      roadRect.push({
                        x: mid.x_n,
                        y: mid.y_m,
                        w: 1,
                        h: n_p_info.bottom - mid.y_m
                      });
                      roadRect.push({
                        x: mid.x_n,
                        y: mid.y_m,
                        w: m_p_info.left - mid.x_n,
                        h: 1
                      });
                    } else {
                      roadRect.push({
                        x: n_p_info.right,
                        y: mid.y_n,
                        w: mid.x_m - n_p_info.right,
                        h: 1
                      });
                      roadRect.push({
                        x: mid.x_m,
                        y: mid.y_n,
                        w: 1,
                        h: m_p_info.bottom - mid.y_n
                      });
                    }
                  }
                }

                var nrooms = [];
                roadRect.forEach(function (r_i) {
                  var info_r = {
                    left: r_i.x,
                    right: r_i.x + r_i.w,
                    bottom: r_i.y,
                    top: r_i.y + r_i.h
                  };
                  vrooms.forEach(function (vr_i) {
                    var info_vr = {
                      left: vr_i.x,
                      right: vr_i.x + vr_i.w,
                      bottom: vr_i.y,
                      top: vr_i.y + vr_i.h
                    };
                    if (!(info_r.left > info_vr.right || info_vr.left > info_r.right || info_r.bottom > info_vr.top || info_vr.bottom > info_r.top)) nrooms.push(vr_i);
                  });
                });
                nrooms.forEach(function (val) {
                  roadRect.push(val);
                });
                roadRect.forEach(function (val) {
                  roadRects.push(val);
                });
              };

              for (var _i7 = 0; _i7 < room_i.to.length; _i7++) {
                _loop(_i7);
              }
            }
          });
          return roadRects;
        };

        Util_CreateRandMap.createTerrains = function createTerrains(rooms) {};

        Util_CreateRandMap.createTerrain = function createTerrain(room, terrainInfo) {
          var terrains = [];

          for (var x = 0; x < room.w; x++) {
            for (var y = 0; y < room.h; y++) {
              terrains[x + "," + y] = 0;
            }
          }

          console.log("房间长宽:" + room.w + "," + room.h);

          for (var i = 0; i < terrainInfo.length; i++) {
            var S = terrainInfo[i].area * room.w * room.h;
            var p = 1;
            var areanumber = 1 + Math.ceil(Math.random() * 5);
            console.log("地形" + i + "一共有" + areanumber + "个区域");

            for (var j = 0; j < areanumber; j++) {
              var p_j = void 0;

              if (j != areanumber - 1) {
                p_j = p * Math.random();
                p -= p_j;
              } else p_j = p;

              var s_j = S * p_j;
              var r = Math.ceil(Math.sqrt(s_j / Math.PI));
              var rp = {
                x: Math.ceil(Math.random() * room.w),
                y: Math.ceil(Math.random() * room.h)
              };
              terrains[rp.x + "," + rp.y] = terrainInfo[i].id;
              console.log("地形" + i + "区域" + j + "占比" + p_j + ",实际面积" + s_j + ",圆心:" + rp.x + "," + rp.y + "半径r:" + r);

              for (var k = r; k > 0; k--) {
                for (var raid = 0; raid < Math.PI * 2; raid += Math.PI / 6) {
                  var x_j = Math.ceil(rp.x + Math.cos(raid) * k);
                  var y_j = Math.ceil(rp.y + Math.sin(raid) * k);
                  if (terrains[x_j + "," + y_j] == 0) terrains[x_j + "," + y_j] = terrainInfo[i].id;
                }
              }
            }
          } // for (let y = 0; y < room.h; y++) {
          //     let s = '';
          //     for (let x = 0; x < room.w; x++) {
          //         s += terrains[x + ',' + y];
          //     }
          //     console.log(s);
          // }


          return terrains;
        };

        return Util_CreateRandMap;
      }());
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
//# sourceMappingURL=Util_CreateRandMap.js.map