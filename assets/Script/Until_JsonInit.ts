import { _decorator, Component, JsonAsset, resources } from "cc";
const { ccclass, property } = _decorator;

@ccclass("UntilJsonInit")
export class UntilJsonInit extends Component {
  onLoad() {
    resources.load(
      "JSON/monster",
      JsonAsset,
      (err: any, arrJsonRes: JsonAsset) => {
        if (err) {
          console.log(err);
          return;
        }
        window.mons = JsonAsset.deserialize(arrJsonRes).json.mons;
      }
    );
    resources.load(
      "JSON/clue",
      JsonAsset,
      (err: any, arrJsonRes: JsonAsset) => {
        if (err) {
          console.log(err);
          return;
        }
        window.clue = JsonAsset.deserialize(arrJsonRes).json;
      }
    );
    resources.load(
      "JSON/material",
      JsonAsset,
      (err: any, arrJsonRes: JsonAsset) => {
        if (err) {
          console.log(err);
          return;
        }
        window.matl = JsonAsset.deserialize(arrJsonRes).json.matl;
      }
    );
    resources.load(
      "JSON/copy",
      JsonAsset,
      (err: any, arrJsonRes: JsonAsset) => {
        if (err) {
          console.log(err);
          return;
        }
        window.copy = JsonAsset.deserialize(arrJsonRes).json;
      }
    );
    resources.load(
      "JSON/town",
      JsonAsset,
      (err: any, arrJsonRes: JsonAsset) => {
        if (err) {
          console.log(err);
          return;
        }
        window.town = JsonAsset.deserialize(arrJsonRes).json;
      }
    );
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
