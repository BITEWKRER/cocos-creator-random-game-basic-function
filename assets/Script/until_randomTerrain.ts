import { _decorator, Component, Node, Mask, math } from "cc";
import { Util_CreateRandMap } from "./Util_CreateRandMap";

const { ccclass, property } = _decorator;

@ccclass("UntilRandTerrain")
export class UntilRandTerrain extends Component {
  createTerrain(arg0: any, test_terrain_info: any[]) {
    throw new Error("Method not implemented.");
  }
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  start() {}
  static createTerrains(rooms: any[], terrain_info: any[]) {
    return this.createOne(rooms[0], terrain_info);
    console.log(rooms[0]);
  }

  static createOne(room: any, info: any[]) {
    // poss
    // let poss = 0.35;
    let PI = 3.1415926;
    let raid = 0;
    let r = 0.5;

    // area
    let area = room.w * room.h;
    console.log("area", area);

    //init
    let map: any[] = [];
    for (let i = 0; i < room.w; i++) {
      map[i] = [];
      for (let j = 0; j < room.h; j++) {
        map[i][j] = -1;
      }
    }

    // random point
    let rpx = Math.random() * room.w;
    let rpy = Math.random() * room.h;
    console.log(rpx, rpy);
    // domian
    let domain, domain_o, x, y;

    for (let i = 0; i < info.length; i++) {
      domain = 0;
      domain_o = Math.floor(info[i].area * area);

      while (domain < domain_o) {
        // x = Math.abs(Math.ceil(rpx + Math.cos(raid) * r));
        // y = Math.abs(Math.ceil(rpy + Math.sin(raid) * r));
        x = Math.abs(Math.ceil(rpx * Math.cos(raid) - rpy * Math.sin(raid)));
        y = Math.abs(Math.ceil(rpx * Math.sin(raid) + rpy * Math.cos(raid)));

        if (x < room.w && y < room.y && map[x][y] == -1) {
          domain++;
          map[x][y] = info[i].id;
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
    }

    // output
    console.log(map);
    return map;
  }
}
