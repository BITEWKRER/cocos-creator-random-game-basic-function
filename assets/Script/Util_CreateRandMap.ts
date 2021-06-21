import { math, RecyclePool, Terrain } from "cc";
import { Util_SimpleMath } from "./Util_SimpleMath";

export class Util_CreateRandMap {
  /*
    room_number:输入要生成的房间数量
    max_width:生成房间的最大宽度
    max_height:生成房间的最大高度
    min_width:生成房间的最小宽度
    min_height:生成房间的最小高度
    */
  static initRoomList(
    room_number: number,
    max_width: number,
    max_height: number,
    min_width: number,
    min_height: number
  ) {
    let rooms = [];

    //在一个圆形区域内生成若干个大小不同的房间
    const r: number = 100;
    for (let i = 0; i < room_number * 4; i++) {
      const room_width: number =
        min_width + Math.floor(Math.random() * (max_width - min_width));
      const room_height: number =
        min_height + Math.floor(Math.random() * (max_height - min_height));
      const room_raid: number = Math.random() * Math.PI * 2;
      const room_x: number = Math.floor(
        Math.cos(room_raid) * Math.random() * r
      );
      const room_y: number = Math.floor(
        Math.sin(room_raid) * Math.random() * r
      );
      let room_local = {
        x: room_x,
        y: room_y,
        w: room_width,
        h: room_height,
        to: [],
      };
      rooms.push(room_local);
    }
    //将重叠的房间进行分离
    rooms[0].x = 0;
    rooms[0].y = 0;

    rooms.sort(function (a, b) {
      return a.x - b.x;
    });
    for (let i = 1; i < rooms.length; i++) {
      rooms[i].x = rooms[i - 1].x + rooms[i - 1].w;
    }
    rooms.sort(function (a, b) {
      return a.y - b.y;
    });
    for (let i = 1; i < rooms.length; i++) {
      rooms[i].y = rooms[i - 1].y + rooms[i - 1].h;
    }

    let mid = { x: 0, y: 0 };

    rooms.forEach((val) => {
      mid.x += val.x;
      mid.y += val.y;
    });
    mid.x /= rooms.length;
    mid.y /= rooms.length;
    rooms.sort(function (a, b) {
      return (
        Util_SimpleMath.getDistanceByTowPoint(a.x, a.y, mid.x, mid.y) -
        Util_SimpleMath.getDistanceByTowPoint(b.x, b.y, mid.x, mid.y)
      );
    });
    // 将分离的房间聚拢；

    let MRoom: any[] = [];
    let VRoom: any[] = [];

    for (let i = 0; i < rooms.length; i++) {
      let searching = true;
      let raid =
        (Util_SimpleMath.getAngleByTowPoint(
          rooms[i].x,
          rooms[i].y,
          mid.x,
          mid.y
        ) /
          180) *
        Math.PI;
      let speed = 5;

      while (searching) {
        let next = {
          x: rooms[i].x + Math.cos(raid) * speed,
          y: rooms[i].y + Math.sin(raid) * speed,
        };
        if (
          Util_SimpleMath.getDistanceByTowPoint(next.x, next.y, mid.x, mid.y) <=
            speed ||
          Util_SimpleMath.getDistanceByTowPoint(
            rooms[i].x,
            rooms[i].y,
            mid.x,
            mid.y
          ) <= speed
        ) {
          searching = false;
        }
        for (let j = 0; j < rooms.length; j++) {
          if (j != i) {
            const i_info = {
              left: next.x,
              right: next.x + rooms[i].w,
              top: next.y + rooms[i].h,
              bootom: next.y,
            };
            const j_info = {
              left: rooms[j].x,
              right: rooms[j].x + rooms[j].w,
              top: rooms[j].y + rooms[j].h,
              bootom: rooms[j].y,
            };
            if (
              !(
                i_info.left > j_info.right ||
                i_info.right < j_info.left ||
                i_info.top < j_info.bootom ||
                i_info.bootom > j_info.top
              )
            ) {
              searching = false;
            }
          }
        }
        if (searching) {
          rooms[i].x = next.x;
          rooms[i].y = next.y;
        }
      }
      if (i % 4 == 0) MRoom.push(rooms[i]);
      else VRoom.push(rooms[i]);
    }

    return { MainRoom: MRoom, ViceRoom: VRoom, mid_p: mid };
  }
  /*
    基于平面点集的三角剖分，使用逐点插入算法
    poinset:点集
    index:当前点在点集的下标
    triangle:三角形数组
    */
  static Bowyer(poinset: any[], index: number, triangle: number[][]): any {
    //初次执行先添加超级三角形
    if (index == 0) {
      poinset.push({ x: -30000, y: -30000 });
      poinset.push({ x: 30000, y: -30000 });
      poinset.push({ x: 0, y: 30000 });
      triangle.splice(0, 0, [
        poinset.length - 1,
        poinset.length - 2,
        poinset.length - 3,
      ]);
    }
    if (index == poinset.length) {
      //移除超级三角形
      for (let i = triangle.length - 1; i >= 0; i--) {
        if (
          poinset[triangle[i][0]].y == 30000 ||
          poinset[triangle[i][0]].y == -30000 ||
          poinset[triangle[i][1]].y == 30000 ||
          poinset[triangle[i][1]].y == -30000 ||
          poinset[triangle[i][2]].y == 30000 ||
          poinset[triangle[i][2]].y == -30000
        ) {
          triangle.splice(i, 1);
        }
      }
      poinset.splice(poinset.length - 3, 3);
      //返回三角形数组
      return triangle;
    }

    let edge: any[] = [];

    for (let i = triangle.length - 1; i >= 0; i--) {
      //计算三角形外接圆的圆心和周长
      const c_center = Util_SimpleMath.getTriangleCircleCenter(
        poinset[triangle[i][0]].x,
        poinset[triangle[i][0]].y,
        poinset[triangle[i][1]].x,
        poinset[triangle[i][1]].y,
        poinset[triangle[i][2]].x,
        poinset[triangle[i][2]].y
      );
      const c_r = Util_SimpleMath.getTriangleCircleRadius(
        poinset[triangle[i][0]].x,
        poinset[triangle[i][0]].y,
        poinset[triangle[i][1]].x,
        poinset[triangle[i][1]].y,
        poinset[triangle[i][2]].x,
        poinset[triangle[i][2]].y
      );
      //判断点是否在外接圆内
      if (
        Util_SimpleMath.getDistanceByTowPoint(
          poinset[index].x,
          poinset[index].y,
          c_center.x,
          c_center.y
        ) < c_r
      ) {
        //添加三角形的三条边到边数组
        edge.push({ st: triangle[i][0], ed: triangle[i][1] });
        edge.push({ st: triangle[i][0], ed: triangle[i][2] });
        edge.push({ st: triangle[i][1], ed: triangle[i][2] });
        //移除这个三角形
        triangle.splice(i, 1);
      }
    }
    //去掉重复的边
    for (let i = 0; i < edge.length - 1; i++) {
      let is_re = false;
      for (let j = i + 1; j < edge.length; j++) {
        if (
          (edge[i].st == edge[j].st && edge[i].ed == edge[j].ed) ||
          (edge[i].ed == edge[j].st && edge[i].st == edge[j].ed)
        ) {
          edge[j] = -1;
          is_re = true;
        }
      }
      if (is_re) {
        edge[i] = -1;
      }
    }

    for (let i = edge.length - 1; i >= 0; i--) {
      if (edge[i] == -1) edge.splice(i, 1);
    }
    //将边添加到三角形数组中
    edge.forEach((val) => {
      triangle.push([index, val.st, val.ed]);
    });

    return this.Bowyer(poinset, index + 1, triangle);
  }
  /*
    生成房间通路
    rooms:房间的列表
    */
  static createConnectedRoad(rooms: any[], vrooms: any[]) {
    let roadRects: any[] = [];
    let triangle: number[][] = [];
    triangle = this.Bowyer(rooms, 0, triangle);
    //提取三角形的边
    let edges: any[] = [];

    triangle.forEach((val) => {
      edges.push({
        v1: val[0],
        v2: val[1],
        weight: Util_SimpleMath.getDistanceByTowPoint(
          rooms[val[0]].x,
          rooms[val[0]].y,
          rooms[val[1]].x,
          rooms[val[1]].x
        ),
      });
      edges.push({
        v1: val[0],
        v2: val[2],
        weight: Util_SimpleMath.getDistanceByTowPoint(
          rooms[val[0]].x,
          rooms[val[0]].y,
          rooms[val[2]].x,
          rooms[val[2]].x
        ),
      });
      edges.push({
        v1: val[1],
        v2: val[2],
        weight: Util_SimpleMath.getDistanceByTowPoint(
          rooms[val[1]].x,
          rooms[val[1]].y,
          rooms[val[2]].x,
          rooms[val[2]].x
        ),
      });
    });
    //删除公共边
    edges.forEach((val, i) => {
      for (let j = i + 1; j < edges.length; j++) {
        if (val != -1 && edges[j] != -1) {
          if (
            (val.v1 == edges[j].v1 && val.v2 == edges[j].v2) ||
            (val.v2 == edges[j].v1 && val.v1 == edges[j].v2)
          ) {
            edges[j] = -1;
          }
        }
      }
    });
    for (let i = edges.length - 1; i >= 0; i--) {
      if (edges[i] == -1) edges.splice(i, 1);
    }
    //用最小生成树来获得房间之间的连通关系
    let tree: any[] = Util_SimpleMath._Krusal(rooms, edges);

    tree.forEach((val) => {
      rooms[val.v1].to.push(val.v2);
    });
    //生成道路矩形
    rooms.forEach((room_i, index) => {
      if (room_i.to.length > 0) {
        for (let i = 0; i < room_i.to.length; i++) {
          //从两个房间的边上各自选取一点作为通路的起点和终点
          let direction_horizon = 0;
          let direction_vertical = 0;
          let m_p = room_i;
          let n_p = rooms[room_i.to[i]];

          let m_p_info = {
            left: m_p.x,
            right: m_p.x + m_p.w,
            top: m_p.y + m_p.h,
            bottom: m_p.y,
          };
          let n_p_info = {
            left: n_p.x,
            right: n_p.x + n_p.w,
            top: n_p.y + n_p.h,
            bottom: n_p.y,
          };

          if (m_p_info.right < n_p_info.left) direction_horizon = 1;
          else if (m_p_info.left > n_p_info.right) direction_horizon = -1;

          if (m_p_info.top < n_p_info.bottom) direction_vertical = 1;
          else if (m_p_info.bottom > n_p_info.top) direction_vertical = -1;

          let roadRect = [];
          //由于房间不重叠 所以不会出现 horizon 和 vertical 都为0的情况

          let rect = { left: 0, right: 0, top: 0, bottom: 0 };
          rect.left =
            m_p_info.left > n_p_info.left ? m_p_info.left : n_p_info.left;
          rect.right =
            m_p_info.right < n_p_info.right ? m_p_info.right : n_p_info.right;
          rect.bottom =
            m_p_info.bottom > n_p_info.bottom
              ? m_p_info.bottom
              : n_p_info.bottom;
          rect.top = m_p_info.top < n_p_info.top ? m_p_info.top : n_p_info.top;
          if (direction_horizon == 0) {
            if (direction_vertical == 1)
              roadRect.push({
                x: (rect.left + rect.right) / 2,
                y: m_p_info.top,
                w: 1,
                h: n_p_info.bottom - m_p_info.top,
              });
            else
              roadRect.push({
                x: (rect.left + rect.right) / 2,
                y: n_p_info.top,
                w: 1,
                h: m_p_info.bottom - n_p_info.top,
              });
          }
          if (direction_vertical == 0) {
            if (direction_horizon == 1)
              roadRect.push({
                x: rect.right,
                y: (rect.top + rect.bottom) / 2,
                w: n_p_info.left - m_p_info.right,
                h: 1,
              });
            else
              roadRect.push({
                x: rect.right,
                y: (rect.top + rect.bottom) / 2,
                w: m_p_info.left - n_p_info.right,
                h: 1,
              });
          }
          if (direction_horizon != 0 && direction_vertical != 0) {
            let mid = {
              x_m: (m_p_info.left + m_p_info.right) / 2,
              x_n: (n_p_info.left + n_p_info.right) / 2,
              y_m: (m_p_info.top + m_p_info.bottom) / 2,
              y_n: (n_p_info.top + n_p_info.bottom) / 2,
            };
            if (direction_horizon == 1) {
              if (direction_vertical == 1) {
                roadRect.push({
                  x: mid.x_m,
                  y: m_p_info.top,
                  w: 1,
                  h: mid.y_n - m_p_info.top,
                });
                roadRect.push({
                  x: mid.x_m,
                  y: mid.y_n,
                  w: n_p_info.left - mid.x_m,
                  h: 1,
                });
              } else {
                roadRect.push({
                  x: m_p_info.right,
                  y: mid.y_m,
                  w: mid.x_n - m_p_info.right + 1,
                  h: 1,
                });
                roadRect.push({
                  x: mid.x_n,
                  y: n_p_info.top,
                  w: 1,
                  h: mid.y_m - n_p_info.top,
                });
              }
            } else {
              if (direction_vertical == 1) {
                roadRect.push({
                  x: mid.x_n,
                  y: mid.y_m,
                  w: 1,
                  h: n_p_info.bottom - mid.y_m,
                });
                roadRect.push({
                  x: mid.x_n,
                  y: mid.y_m,
                  w: m_p_info.left - mid.x_n,
                  h: 1,
                });
              } else {
                roadRect.push({
                  x: n_p_info.right,
                  y: mid.y_n,
                  w: mid.x_m - n_p_info.right,
                  h: 1,
                });
                roadRect.push({
                  x: mid.x_m,
                  y: mid.y_n,
                  w: 1,
                  h: m_p_info.bottom - mid.y_n,
                });
              }
            }
          }
          let nrooms: any[] = [];
          roadRect.forEach((r_i) => {
            const info_r = {
              left: r_i.x,
              right: r_i.x + r_i.w,
              bottom: r_i.y,
              top: r_i.y + r_i.h,
            };
            vrooms.forEach((vr_i) => {
              const info_vr = {
                left: vr_i.x,
                right: vr_i.x + vr_i.w,
                bottom: vr_i.y,
                top: vr_i.y + vr_i.h,
              };
              if (
                !(
                  info_r.left > info_vr.right ||
                  info_vr.left > info_r.right ||
                  info_r.bottom > info_vr.top ||
                  info_vr.bottom > info_r.top
                )
              )
                nrooms.push(vr_i);
            });
          });

          nrooms.forEach((val) => {
            roadRect.push(val);
          });
          roadRect.forEach((val) => {
            roadRects.push(val);
          });
        }
      }
    });
    return roadRects;
  }

  static createTerrains(rooms: any[]) {}
  static createTerrain(room: any, terrainInfo: any[]) {
    let terrains: { [name: string]: any } = [];
    for (let x = 0; x < room.w; x++) {
      for (let y = 0; y < room.h; y++) {
        terrains[x + "," + y] = 0;
      }
    }
    console.log("房间长宽:" + room.w + "," + room.h);
    for (let i = 0; i < terrainInfo.length; i++) {
      let S: number = terrainInfo[i].area * room.w * room.h;
      let p: number = 1;
      let areanumber: number = 1 + Math.ceil(Math.random() * 5);
      console.log("地形" + i + "一共有" + areanumber + "个区域");
      for (let j = 0; j < areanumber; j++) {
        let p_j: number;
        if (j != areanumber - 1) {
          p_j = p * Math.random();
          p -= p_j;
        } else p_j = p;

        let s_j: number = S * p_j;
        let r: number = Math.ceil(Math.sqrt(s_j / Math.PI));
        let rp = {
          x: Math.ceil(Math.random() * room.w),
          y: Math.ceil(Math.random() * room.h),
        };
        terrains[rp.x + "," + rp.y] = terrainInfo[i].id;
        console.log(
          "地形" +
            i +
            "区域" +
            j +
            "占比" +
            p_j +
            ",实际面积" +
            s_j +
            ",圆心:" +
            rp.x +
            "," +
            rp.y +
            "半径r:" +
            r
        );
        for (let k = r; k > 0; k--) {
          for (let raid = 0; raid < Math.PI * 2; raid += Math.PI / 6) {
            let x_j = Math.ceil(rp.x + Math.cos(raid) * k);
            let y_j = Math.ceil(rp.y + Math.sin(raid) * k);
            if (terrains[x_j + "," + y_j] == 0)
              terrains[x_j + "," + y_j] = terrainInfo[i].id;
          }
        }
      }
    }

    // for (let y = 0; y < room.h; y++) {
    //     let s = '';
    //     for (let x = 0; x < room.w; x++) {
    //         s += terrains[x + ',' + y];
    //     }
    //     console.log(s);
    // }
    return terrains;
  }
}

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
