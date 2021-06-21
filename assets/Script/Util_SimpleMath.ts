
import { Vec2 } from 'cc';

export class Util_SimpleMath {
    static getAngleByTowPoint(x1: number, y1: number, x2: number, y2: number) {
        const v1: Vec2 = new Vec2(x1, y1);
        const v2: Vec2 = new Vec2(x2, y2);
        let angle = new Vec2(1, 0).signAngle(v2.subtract(v1).normalize()) * 180 / Math.PI;

        if (angle < 0) {
            angle += 360;
        }
        return angle;
    }
    static getTriangleCircleCenter(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        const t1: number = x1 * x1 + y1 * y1;
        const t2: number = x2 * x2 + y2 * y2;
        const t3: number = x3 * x3 + y3 * y3;
        const temp: number = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
        const x: number = (t2 * y3 + t1 * y2 + t3 * y1 - t2 * y1 - t3 * y2 - t1 * y3) / temp / 2;
        const y: number = (t3 * x2 + t2 * x1 + t1 * x3 - t1 * x2 - t2 * x3 - t3 * x1) / temp / 2;

        return { x: x, y: y };
    }
    static getTriangleCircleRadius(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        const a: number = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        const b: number = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3));
        const c: number = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3));
        const p: number = (a + b + c) / 2;
        const S: number = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        const radius = a * b * c / (4 * S);
        return radius;
    }
    static getDistanceByTowPoint = function (x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
    static _Krusal(poinset: any[], edges: any[]) {
        //生成并查集的数据结构
        let tree: any[] = [];
        let poinset_parent: number[] = [];
        for (let i = 0; i < poinset.length; i++) {
            poinset_parent[i] = i;
        }
        //并查集查询
        let djs_find = function (i: number): any {
            if (poinset_parent[i] == i)
                return i;
            else
                return djs_find(poinset_parent[i]);
        }
        //并查集合并
        let djs_merge = function (i: number, j: number) {
            poinset_parent[djs_find(i)] = djs_find(j);
        }
        //回贴边到图中 直到tree的长度为n-1
        for (let i = 0; i < edges.length; i++) {
            
            if (djs_find(edges[i].v1) != djs_find(edges[i].v2)) {
                djs_merge(edges[i].v1, edges[i].v2);
                tree.push(edges[i]);
            }
            if (tree.length == poinset_parent.length - 1)
                break;
        }
        //返回最小生成树
        return tree;
    }
}
