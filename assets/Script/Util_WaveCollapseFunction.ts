
import { _decorator, Component, Node, setDefaultLogTimes } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Util_WaveColleapseFunction')
export class Util_WaveColleapseFunction extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private static slot = class{
        x:number=0;
        y:number=0;
        tiles:any[]=[];
        select = -1;
        collapsed:Boolean=false;
        public static slot(x:number,y:number){
            x=x;
            y=y;
        }
    }
    
    static createSlot()
    {
        // let a=new this.slot(10,10);
        // console.log(a.test);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
