import {
  _decorator,
  Component,
  Node,
  Graphics,
  Prefab,
  instantiate,
  UITransform,
  Sprite,
  Color,
} from "cc";
import { Util_CreateRandMap } from "../Util_CreateRandMap";
import { Util_SimpleMath } from "../Util_SimpleMath";
import { UntilRandTerrain } from "../until_randomTerrain";
import { UntilRelationship } from "../Until_Relationship";
import { UtilEvent } from "../Util_Event";
import { UntilJsonInit } from "../Until_JsonInit";
const { ccclass, property } = _decorator;

@ccclass("DrawMapInfo")
export class DrawMapInfo extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property(Prefab)
  room_unit: Prefab | null = null;

  @property(Prefab)
  road_unit: Prefab | null = null;

  @property(Node)
  camera: Node | null = null;

  @property(Prefab)
  terrain: Prefab | null = null;

  UNIT_SIZE = 5;
  mid: any;
  onLoad() {}
  start() {
    let graphics = this.node.getComponent(Graphics);
    const RoomList = Util_CreateRandMap.initRoomList(8, 20, 20, 10, 10);
    //返回了一个room对象
    const MainRoomList = RoomList.MainRoom;
    const ViceRoomList = RoomList.ViceRoom;
    const roadRect = Util_CreateRandMap.createConnectedRoad(
      MainRoomList,
      ViceRoomList
    );
    roadRect.forEach((val) => {
      let unit_road = instantiate(this.road_unit!);
      unit_road.setPosition(val.x * this.UNIT_SIZE, val.y * this.UNIT_SIZE);
      unit_road
        .getComponent(UITransform)
        ?.setContentSize(val.w * this.UNIT_SIZE, val.h * this.UNIT_SIZE);
      this.node.addChild(unit_road);
      graphics?.rect(
        val.x * this.UNIT_SIZE,
        val.y * this.UNIT_SIZE,
        this.UNIT_SIZE * val.w,
        this.UNIT_SIZE * val.h
      );

      graphics?.stroke();
    });

    this.mid = RoomList.mid_p;
    MainRoomList.forEach((val, i) => {
      let unit = instantiate(this.room_unit!);
      unit.setPosition(val.x * this.UNIT_SIZE, val.y * this.UNIT_SIZE);
      unit
        .getComponent(UITransform)
        ?.setContentSize(val.w * this.UNIT_SIZE, val.h * this.UNIT_SIZE);
      this.node.addChild(unit);
      // unit.getComponent(MapUnitInfo)?.updateLabel('房间' + i + "x,y:" + unit.position.x / this.UNIT_SIZE + "," + unit.position.y / this.UNIT_SIZE);
      graphics?.rect(
        val.x * this.UNIT_SIZE,
        val.y * this.UNIT_SIZE,
        this.UNIT_SIZE * val.w,
        this.UNIT_SIZE * val.h
      );

      graphics?.stroke();
    });

    let test_terrain_info: any[] = [];
    test_terrain_info[0] = { id: 1, area: 0.2 };
    test_terrain_info[1] = { id: 2, area: 0.35 };
    let t = UntilRandTerrain.createOne(MainRoomList[0], test_terrain_info);

    //init
    // this.createEvent();

    for (let i = 0; i < MainRoomList[0].w; i++) {
      for (let j = 0; j < MainRoomList[0].h; j++) {
        if (t[i][j] != -1) {
          let t_unit = instantiate(this.terrain!);
          t_unit.setPosition(
            (i + MainRoomList[0].x) * this.UNIT_SIZE,
            (j + MainRoomList[0].y) * this.UNIT_SIZE
          );
          // console.log(i, j);
          t_unit
            .getComponent(UITransform)
            ?.setContentSize(this.UNIT_SIZE, this.UNIT_SIZE);
          t_unit.getComponent(Sprite)!.color = new Color(
            t[i][j] * 45,
            255 - t[i][j] * 45,
            t[i][j] * 45
          );
          this.node.addChild(t_unit);
        }
      }
    }
  }

  createEvent() {
    //小镇家族
    let result = UntilRelationship.getTown(7);
    console.log(result);

    //随机事件
    let EveMag = UtilEvent.getAEveMag();
    EveMag.addEvent(UtilEvent.getARandEvent(result, true));

    console.log(EveMag.getPool()[0]);
  }

  update(deltaTime: number) {
    this.camera?.setPosition(
      this.mid.x * this.UNIT_SIZE,
      this.mid.y * this.UNIT_SIZE
    );
  }
}
