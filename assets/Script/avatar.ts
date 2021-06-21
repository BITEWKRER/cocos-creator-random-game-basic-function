
import { _decorator, Component, Node, Sprite, SpriteAtlas, UITransform, resources, SpriteFrame, Animation, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Avatar')
export class Avatar extends Component {

    parts: { [name: string]: any } = [];
    nowAni: string = 'idle';
    updateAvatar(name: string, id: number, index: number) {
        console.log(name);
        let self = this;
        if (this.node.getChildByName(name) == null) {

            this.parts[name] = { index: index, id: -1 };

            let avatarNode = new Node(name);
            this.node.addChild(avatarNode);

            avatarNode.addComponent(UITransform);
            let transform = avatarNode.getComponent(UITransform);
            let sprite = avatarNode.addComponent(Sprite);

            avatarNode.setPosition(0, 0);
            transform?.setAnchorPoint(0.5, 0);
            sprite.trim = false;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            transform!.setContentSize(56, 45);
            console.log(transform?.contentSize);
            resources.load('textures/avatar_test', SpriteAtlas, (err, altas: SpriteAtlas) => {
                // console.log(err);
                sprite.spriteAtlas = altas;
                self.updateFrame(name, id, 'idle', 0);

            });
            transform!.priority = index;
        }
        else
            this.updateFrame(name, id, 'idle', 0);
        return this.node.getChildByName(name);

    }
    updateFrame(part: string, id: number, action: string, framecount: number) {
        this.node.getChildByName(part)?.getComponent(Sprite)?.changeSpriteFrameFromAtlas(part + '_' + id + '_' + action + '_' + framecount);
    }

    start() {
        this.updateAvatar('body', 0, 0);
        this.updateAvatar('cost', 0, 1);
        this.updateAvatar('hair', 0, 2);
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
