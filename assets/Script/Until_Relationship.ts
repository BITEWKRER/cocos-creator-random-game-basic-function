import { _decorator, Component, resources, JsonAsset } from "cc";

const { ccclass } = _decorator;
//性格种类
let mtl = ["正常", "冷漠", "热情"];
let Intimacy = ["陌生", "熟识", "好友"];

export class Person {
  //姓名
  private name: string;
  //性别
  private sex: string;
  //死因描述
  private deadDis: string = "存活";
  //职业
  private occupation: string = "无";
  //小镇家族区域
  private belongs: number;
  //是否死亡
  private deadSts: Boolean = false;
  // 年龄
  private age: number;
  //家族关系
  private relations: any = [];
  //亲密度,阶段
  private Intimacy: string = "陌生";
  //线索
  private clue = "无";
  //性格
  private mettle: string = "正常";

  constructor(name: string, age: number, sex: string, belongs: number) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.belongs = belongs;
    //性格随机分配
    this.mettle = mtl[Math.floor(Math.random() * 3)];
  }
  intToChinese(str: string) {
    str = str + "";
    var len = str.length - 1;
    var idxs = [
      "",
      "十",
      "百",
      "千",
      "万",
      "十",
      "百",
      "千",
      "亿",
      "十",
      "百",
      "千",
      "万",
      "十",
      "百",
      "千",
      "亿",
    ];
    var num = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
      var pos = 0;
      if ($1[0] != "0") {
        pos = len - idx;
        if (idx == 0 && $1[0] == 1 && idxs[len - idx] == "十") {
          return idxs[len - idx];
        }
        return num[$1[0]] + idxs[len - idx];
      } else {
        var left = len - idx;
        var right = len - idx + $1.length;
        if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
          pos = left - (left % 4);
        }
        if (pos) {
          return idxs[pos] + num[$1[0]];
        } else if (idx + $1.length >= len) {
          return "";
        } else {
          return num[$1[0]];
        }
      }
    });
  }
  //设置亲密度和更新线索
  setIntimacy(stage: string) {
    if (stage != Intimacy[0] || stage != Intimacy[1] || stage != Intimacy[2]) {
      return false;
    }
    this.Intimacy = stage;
    resources.load("JSON/clue", JsonAsset, (err, clues: JsonAsset) => {
      let data = JsonAsset.deserialize(clues).json;
      let len = data[this.mettle][this.Intimacy].length;
      let clue =
        data[this.mettle][this.Intimacy][Math.floor(Math.random() * len)];
      return this.setClue(clue);
    });
  }
  setClue(clue: string) {
    return (this.clue = clue);
  }
  getMettle() {
    return this.mettle;
  }
  getIntimacy() {
    return this.Intimacy;
  }
  getClue() {
    return this.clue;
  }
  setDeadDis(dis: string) {
    this.deadDis = dis;
  }
  setDeadSts(sts: Boolean) {
    this.deadSts = sts;
  }
  getDeadSts() {
    return this.deadSts;
  }
  getDeadDis() {
    return this.deadDis;
  }
  setName(name: string) {
    this.name = name;
    this.clue =
      "小生姓" +
      this.name.substr(0, 1) +
      ",名" +
      this.name.substr(1) +
      ",年方" +
      this.intToChinese(this.age.toString()) +
      "岁...";
  }
  setAge(age: number) {
    this.age = age;
  }
  setSex(sex: string) {
    this.sex = sex;
  }
  setOccupation(occupation: string) {
    this.occupation = occupation;
  }
  getOccupation() {
    return this.occupation;
  }
  getSex() {
    return this.sex;
  }
  getAge() {
    return this.age;
  }
  getName() {
    return this.name;
  }
  getRelations() {
    return this.relations;
  }
  getBelong() {
    return this.belongs;
  }

  addRelation(people: Person, whatRalation: string) {
    return this.relations.push({ r_ship: whatRalation, r_name: people.name });
  }
}

@ccclass("UntilRelationship")
export class UntilRelationship extends Component {
  static getTown(members: number) {
    if (members > 7) {
      return false;
    }
    //姓
    let first = this.getAllFirstName();
    //名
    let second = this.getAllSecondName();
    let familyMembers = 1;
    let nameFlag = 0;
    let name;
    let spouse = 0; //未结婚
    let town_family = [];
    let cnt = 1;
    let bro = 0;
    let M: string = "man";
    let WM: string = "woman";
    let lim = 4;
    //家族
    for (let i = 0; i < members; i++) {
      //关系数组
      let queue: Array<Person> = [];
      let result: Array<Person> = [];
      for (let j = 0; j < 8; j++) {
        queue[j] = new Person("", -1, "man", i);
      }
      name = this.getARandomFirstName(first);
      // 确定几代人,基础商铺均大于等于2，其余随意
      if (i < 3) {
        familyMembers = 2;
      } else {
        nameFlag = this.randNum(4) % 2;
        if (nameFlag == 1) {
          do {
            familyMembers = this.randNum(3);
          } while (familyMembers == 0);
        }
      }
      // console.log("name:" + name, "几代人:" + familyMembers);
      for (let j = 0; j < familyMembers; j++) {
        spouse = this.randNum(6) % 2;
        bro = this.randNum(6) % 2;
        if (cnt == 1) {
          //第一代
          this.setPerporty(
            queue[0],
            this.getAName(name, second, M),
            this.randNum(20) + 50,
            M
          );
          if (familyMembers > cnt) {
            this.setPerporty(
              queue[1],
              this.getAName(this.getARandomFirstName(first), second, WM),
              this.randNum(20) + 35,
              WM
            );
          } else if (spouse == 1) {
            this.setPerporty(
              queue[1],
              this.getAName(this.getARandomFirstName(first), second, WM),
              this.randNum(20) + 35,
              WM
            );
          }
          cnt++;
        } else if (cnt == 2 && queue[1].getAge() != -1) {
          //第二代
          this.setPerporty(
            queue[2],
            this.getAName(name, second, M),
            this.randNum(20) + 30,
            M
          );
          if (familyMembers > cnt) {
            this.setPerporty(
              queue[3],
              this.getAName(this.getARandomFirstName(first), second, WM),
              this.randNum(20) + 20,
              WM
            );
          } else if (spouse == 1) {
            this.setPerporty(
              queue[3],
              this.getAName(this.getARandomFirstName(first), second, WM),
              this.randNum(20) + 20,
              WM
            );
          }
          if (bro == 1) {
            this.setPerporty(
              queue[4],
              this.getAName(name, second, M),
              this.randNum(20) + 30,
              M
            );
            spouse = this.randNum(6) % 2;
            if (spouse == 1) {
              this.setPerporty(
                queue[5],
                this.getAName(this.getARandomFirstName(first), second, WM),
                this.randNum(20) + 20,
                WM
              );
            }
          }
          cnt++;
        } else if (cnt == 3) {
          //第三代
          nameFlag = this.randNum(4) % 2;
          if (nameFlag == 0) {
            this.setPerporty(
              queue[6],
              this.getAName(name, second, M),
              this.randNum(10) + 10,
              M
            );
          } else {
            this.setPerporty(
              queue[6],
              this.getAName(name, second, M),
              this.randNum(10) + 10,
              WM
            );
          }
          if (bro == 1) {
            nameFlag = this.randNum(4) % 2;
            if (nameFlag == 0) {
              this.setPerporty(
                queue[7],
                this.getAName(name, second, M),
                this.randNum(10) + 10,
                M
              );
            } else {
              this.setPerporty(
                queue[7],
                this.getAName(name, second, M),
                this.randNum(10) + 10,
                WM
              );
            }
          }
          cnt++;
        }
      }

      //指定关系
      if (queue[1].getAge() != -1) {
        queue[0].addRelation(queue[1], "老婆");
        queue[1].addRelation(queue[0], "老公");
      }
      if (queue[2].getAge() != -1) {
        queue[0].addRelation(queue[2], "儿子");
        queue[1].addRelation(queue[2], "儿子");
        queue[2].addRelation(queue[0], "父亲");
        queue[2].addRelation(queue[1], "母亲");
      }
      if (queue[3].getAge() != -1) {
        queue[0].addRelation(queue[3], "翁媳");
        queue[1].addRelation(queue[3], "儿媳");
        queue[2].addRelation(queue[3], "老婆");
        queue[3].addRelation(queue[0], "父亲");
        queue[3].addRelation(queue[1], "母亲");
        queue[3].addRelation(queue[2], "老公");
      }
      if (queue[4].getAge() != -1) {
        queue[0].addRelation(queue[4], "儿子");
        queue[1].addRelation(queue[4], "儿子");
        queue[2].addRelation(queue[4], "弟弟");
        queue[4].addRelation(queue[0], "父亲");
        queue[4].addRelation(queue[1], "母亲");
        queue[4].addRelation(queue[2], "哥哥");
        if (queue[3].getAge() != -1) {
          queue[3].addRelation(queue[4], "弟弟");
          queue[4].addRelation(queue[3], "嫂子");
        }
      }
      if (queue[5].getAge() != -1) {
        queue[0].addRelation(queue[5], "翁媳");
        queue[1].addRelation(queue[5], "儿媳");
        queue[2].addRelation(queue[5], "弟妹");
        queue[5].addRelation(queue[0], "父亲");
        queue[5].addRelation(queue[1], "母亲");
        queue[5].addRelation(queue[2], "哥哥");
        if (queue[3].getAge() != -1) {
          queue[3].addRelation(queue[5], "弟妹");
          queue[5].addRelation(queue[3], "嫂子");
        }
        queue[4].addRelation(queue[5], "老婆");
        queue[5].addRelation(queue[4], "老公");
      }
      if (queue[6].getAge() != -1) {
        if (queue[6].getSex() == "man") {
          queue[0].addRelation(queue[6], "孙子");
          queue[1].addRelation(queue[6], "孙子");
          queue[2].addRelation(queue[6], "儿子");
          queue[3].addRelation(queue[6], "儿子");
        } else {
          queue[0].addRelation(queue[6], "孙女");
          queue[1].addRelation(queue[6], "孙女");
          queue[2].addRelation(queue[6], "女儿");
          queue[3].addRelation(queue[6], "女儿");
        }
        queue[6].addRelation(queue[0], "爷爷");
        queue[6].addRelation(queue[1], "奶奶");
        queue[6].addRelation(queue[2], "父亲");
        queue[6].addRelation(queue[3], "母亲");
        if (queue[4].getAge() != -1) {
          if (queue[6].getSex() == "man") {
            queue[4].addRelation(queue[6], "侄子");
          } else {
            queue[4].addRelation(queue[6], "侄女");
          }
          queue[6].addRelation(queue[4], "舅舅");
        }
        if (queue[5].getAge() != -1) {
          if (queue[6].getSex() == "man") {
            queue[5].addRelation(queue[6], "侄子");
          } else {
            queue[5].addRelation(queue[6], "侄女");
          }
          queue[6].addRelation(queue[5], "舅妈");
        }
      }
      if (queue[7].getAge() != -1) {
        if (queue[7].getSex() == "man") {
          queue[0].addRelation(queue[7], "孙子");
          queue[1].addRelation(queue[7], "孙子");
          queue[2].addRelation(queue[7], "儿子");
          queue[3].addRelation(queue[7], "儿子");
        } else {
          queue[0].addRelation(queue[7], "孙女");
          queue[1].addRelation(queue[7], "孙女");
          queue[2].addRelation(queue[7], "女儿");
          queue[3].addRelation(queue[7], "女儿");
        }
        queue[7].addRelation(queue[0], "爷爷");
        queue[7].addRelation(queue[1], "奶奶");
        queue[7].addRelation(queue[2], "父亲");
        queue[7].addRelation(queue[3], "母亲");

        if (queue[4].getAge() != -1) {
          if (queue[7].getSex() == "man") {
            queue[4].addRelation(queue[7], "侄子");
          } else {
            queue[4].addRelation(queue[7], "侄女");
          }

          queue[7].addRelation(queue[4], "舅舅");
        }
        if (queue[5].getAge() != -1) {
          if (queue[6].getSex() == "man") {
            queue[5].addRelation(queue[6], "侄子");
          } else {
            queue[5].addRelation(queue[6], "侄女");
          }
          queue[7].addRelation(queue[5], "舅妈");
        }
        if (queue[6].getSex() == "man" && queue[7].getSex() == "man") {
          queue[7].addRelation(queue[6], "哥哥");
          queue[6].addRelation(queue[7], "弟弟");
        } else if (queue[6].getSex() == "woman" && queue[7].getSex() == "man") {
          queue[7].addRelation(queue[6], "姐姐");
          queue[6].addRelation(queue[7], "弟弟");
        } else if (
          queue[6].getSex() == "woman" &&
          queue[7].getSex() == "woman"
        ) {
          queue[7].addRelation(queue[6], "姐姐");
          queue[6].addRelation(queue[7], "妹妹");
        } else {
          queue[7].addRelation(queue[6], "哥哥");
          queue[6].addRelation(queue[7], "妹妹");
        }
      }
      if (queue[1].getAge() == -1 && cnt == 1) {
        queue[0].clear();
      }

      for (let i = 0, j = 0; i < queue.length; i++) {
        if (queue[i].getAge() != -1) {
          result[j] = queue[i];
          j++;
        }
      }
      // dead rand
      let tmp = 0;
      let ct = 0;
      // dead num
      nameFlag = this.randNum(4) % 2;
      if (nameFlag == 1) {
        tmp = 1;
      } else {
        tmp = 2;
      }
      if (result.length > lim) {
        for (let i = 0; i < result.length; i++) {
          nameFlag = this.randNum(4) % 2;
          if (nameFlag == 1) {
            result[i].setDeadSts(true);
            if (result[i].getAge() <= 18) {
              result[i].setDeadDis("夭折");
            } else if (result[i].getAge() <= 60) {
              result[i].setDeadDis("早逝");
            } else if (result[i].getAge() <= 75) {
              nameFlag = this.randNum(4) % 2;
              if (nameFlag == 1) {
                result[i].setDeadDis("客死");
              } else {
                result[i].setDeadDis("遇难");
              }
            } else {
              result[i].setDeadDis("正寝");
            }
            ct++;
          }
          if (ct >= tmp) {
            break;
          }
        }
      }
      cnt = 1;
      town_family.push({
        fam: result,
        famCause: "",
      });
    }
    return this.setOccupation(town_family, members);
  }
  static setOccupation(town_family: any, members: number) {
    let low = [
      ["酒肆", "掌柜", "店小二", "杂役"],
      ["客栈", "店老大", "跑堂", "庖丁"],
      ["医坊", "医师", "学徒", "杂役"],
      ["铁匠铺", "店老大", "铁匠", "学徒"],
      ["茶馆", "掌柜", "店小二", "杂役"],
      ["裁缝店", "掌柜", "店小二", "裁缝"],
      ["商铺", "掌柜", "账房", "店小二"],
    ];
    let rad;

    // 基础店家分配
    // let cnt = 1;
    // for (let i = 0; i < members; i++) {
    //   rad = this.randNum(low.length);
    //   town_family[i].famCause = low[rad][0];
    //   for (let j = 0; j < town_family[i].fam.length; j++) {
    //     //          town_family[i].fam[j].getDeadSts() == false &&
    //     if (town_family[i].fam[j].getSex() == "man") {
    //       town_family[i].fam[j].setOccupation(low[rad][cnt]);
    //       cnt++;
    //     }
    //   }
    //   low.splice(rad, 1);
    //   cnt = 1;
    // }

    let cnt = 1;
    for (let i = 0; i < members; i++) {
      town_family[i].famCause = low[i][0];
      for (let j = 0; j < town_family[i].fam.length; j++) {
        if (town_family[i].fam[j].getSex() == "man") {
          town_family[i].fam[j].setOccupation(low[i][cnt]);
          cnt++;
        }
      }
      cnt = 1;
    }
    //其余均为农民
    // console.log(town_family);
    return town_family;
  }
  static getAName(name: string, second: any, sex: string) {
    return name + this.getARandomSecondName(second, sex);
  }
  static setPerporty(tmp: Person, name: string, age: number, sex: string) {
    tmp.setAge(age);
    tmp.setName(name);
    tmp.setSex(sex);
  }
  static randNum(num: number) {
    return Math.floor(Math.random() * num);
  }
  static getARandomSecondName(second: any, type: string) {
    let nameFlag, mingIndex;
    let name = "二";
    nameFlag = this.randNum(4) % 2;

    switch (type) {
      case "man": // 男
        if (nameFlag == 1) {
          mingIndex = this.randNum(second.manSingle.length);
          name = second.manSingle[mingIndex];
        } else {
          mingIndex = this.randNum(second.manDouble.length);
          name = second.manDouble[mingIndex];
        }
        break;
      case "woman": // 女
        if (nameFlag == 1) {
          mingIndex = this.randNum(second.womanSingle.length);
          name = second.womanSingle[mingIndex];
        } else {
          mingIndex = this.randNum(second.womanDouble.length);
          name = second.womanDouble[mingIndex];
        }
        break;
    }
    return name;
  }
  static getARandomFirstName(first: any) {
    let nameFlag, nameIndex;
    let name = "钟";
    //确定姓氏 单双
    nameFlag = this.randNum(4) % 2;
    if (nameFlag == 0) {
      //家族姓氏
      nameIndex = this.randNum(first.single.length);
      name = first.single[nameIndex];
    } else {
      nameIndex = this.randNum(first.double.length);
      name = first.double[nameIndex];
    }
    return name;
  }
  //获取所有姓
  static getAllFirstName() {
    var singles =
      "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱";
    var doubles =
      "万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容鲜于闾丘司徒司空";
    let jsonName = { single: [""], double: [""] };
    for (let i = 0; i < singles.length; i++) {
      jsonName.single.push(singles.charAt(i));
    }
    for (let i = 0; i < doubles.length; i += 2) {
      jsonName.double.push(doubles.charAt(i) + doubles.charAt(i + 1));
    }
    jsonName.single = jsonName.single.splice(1, jsonName.single.length);
    jsonName.double = jsonName.double.splice(1, jsonName.double.length);
    return jsonName;
  }
  //获取所有名
  static getAllSecondName() {
    let myMing = {
      manSingle: [""],
      manDouble: [""],
      womanSingle: [""],
      womanDouble: [""],
    };
    let NvDouble =
      "自红字冉紫悦紫玉紫瑛紫怡紫瑶紫妍紫嫣紫婷紫琼紫玲梓悦梓秀梓倩子悦子玉子莹子怡子瑶子秀子玲子琳子花姿颖姿婷姿冉仔英琢玉卓玉卓莹卓怡卓瑶卓妍卓文卓婷卓冉卓倩卓娜卓玲卓琳卓丽卓洁卓红卓芳杼莹杼妍杼梅竹悦竹颖周英周洁舟芳钟瑛钟妍钟娜钟玲钟娟忠英忠萍忠玲中文智颖智文智萍智玲致文致冉致洁峙萍治颖治文志瑛志文志琴志倩志萍志梅志玲志丽志芳至冉祉瑶祉冉芷悦芷玉芷莹芷瑶芷秀芷婷芷茹芷倩芷洁枝红芝媛芝颖芝蓉芝琴芝琳芝洁之玉之花政文正冉正琼正梅正玲正红筝冉铮萍争艳振玉振琴祯颖祯冉珍英珍燕珍芬贞玉贞艳贞妍贞文贞丽贞洁浙文哲媛哲文兆霞兆婷兆梅兆芬召娟昭媛昭颖昭雪昭文昭冉昭芬璋娥樟玉张颖张梅赠文泽玉泽文泽琴早红簪雪在文在美再萍蕴玲韵颖韵怡韵瑶韵燕韵妍韵嫣韵雪韵霞韵文韵婷韵茹韵蓉韵琴韵萍韵梅韵玲韵琳韵洁韵芳韫文运红芸瑛芸瑶芸洁匀梅云英云怡云文云婷云倩云妹云美云梅云娟云花云芬越瑶越婵跃悦跃文跃莉跃红悦臻悦甄悦桢悦珍悦泽悦莹悦艺悦洋悦艳悦颜悦萱悦歆悦仙悦雯悦彤悦榕悦蓉悦冉悦沁悦侨悦麒悦宁悦萌悦媚悦嵋悦琳悦林悦杰悦嘉悦恒悦儿悦玎悦辰悦琛悦博岳英岳婷岳芬月霞月蓉月琼月琴月萍月娜月梅月玲月娟月红月娥月婵媛元媛妍媛陶媛姝媛蕙媛慧媛昊媛芬苑婷苑玲苑婧苑红远芳源琳圆花园丽元燕元萍元红豫文毓丽毓芬誉芳煜文钰颖钰莹钰瑛钰婷钰茹钰蓉钰琴钰玲钰琳昱颖昱文昱婷昱冉郁婷郁芳育文聿文玉媛玉颖玉莹玉英玉瑶玉燕玉艳玉霞玉婷玉蓉玉琴玉萍玉梅玉玲玉娟玉洁玉红玉芬玉芳玉娥玉婵语妍语嫣语雪语洁禹冉雨悦雨瑶雨燕雨艳雨嫣雨雪雨霞雨婷雨娜雨梅雨琳雨婧雨洁羽妍羽婷羽芳宇莹宇瑶宇文宇琼宇萍宇玲瑜婷愉悦愉莹俞悦俞冉臾文妤妍妤嫣妤婷余娜于媛于文渝怡宥燕幼颖幼芳有玉有花友玉友玲友芳莜美悠冉优美泳怡咏怡咏霞咏梅咏玲咏琳咏莉咏芳永怡永燕永文永妹永丽永红映雪映霞映娜映红颖玉颖颖颖怡颖妍颖霞颖文颖茹颖琼颖琳颖丽颖洁颖红颍倩颍玲滢颖滢霞莹芸莹颖莹莹莹盈莹烨莹轩莹麒莹璐莹静莹洁莹菲莹丹莹畅盈悦盈玉盈颖盈莹盈瑛盈倩盈玲盈琳盈丽盈婧盈洁迎莹迎瑛迎英樱丽樱红瑛钰瑛玉瑛瑛瑛桐瑛倩瑛琦瑛慧瑛菲英英英娜英玲银英银艳银雪银红寅玉寅文殷颖音冉荫英懿婷懿娜熠婷熠倩熠婧熠洁毅娜裔莹意文意冉意芳逸妍逸文逸婷翌婷翊文翊婷益琴益梅益玲轶玲羿文弈文弈婷奕悦奕颖奕妍奕文奕婷奕蓉奕娜奕琳奕娟诣文易悦易玉易文易冉易美怿婷译婵亦怡亦雪亦文亦婷艺颖艺莹艺婷艺倩艺琳艺芳忆雪忆倩义洁旖文旖婷怡圳怡真怡泽怡媛怡缘怡圆怡园怡禹怡羽怡颖怡萤怡莹怡茵怡伊怡瑶怡燕怡雪怡学怡璇怡煊怡萱怡秀怡馨怡心怡希怡文怡尉怡薇怡彤怡葶怡婷怡廷怡思怡珊怡杉怡睿怡如怡蓉怡苒怡冉怡然怡群怡箐怡晴";
    let NanDouble =
      "佐胜左书昨同祖扬祖豪祖峰祖迪宗高自久自欢梓志梓哲梓雅梓勋梓轩梓伟梓晴梓培梓俊梓杰梓健梓嘉梓昊梓栋梓聪秭灼秭灵秭灿知仁知灵之亮政志政跃政阳政旭政通政融政磊正直正越正跃正月正优正阳正伟正彤正泰正恒正浩正好正哿正革正道正春峥科峥柯怔阁征越征跃征月震威振中振宇振逸振兴振伟振维振挑振嵘振荣振林振海臻逸真级珍珠针铁哲健哲海照杰兆锟兆峻兆东兆斌昭宇昭全彰励张源张勇张永张业张尧张同张耸张松张盛张青张睦张名张立张力张栋张弛张博湛天展鸿泽元泽瑜泽轩泽铁泽睿泽荣泽鸾泽磊泽俊泽洪泽谷泽宸泽辰则忠则羽则伍则儒则海则憧则丞早明蕴仪韵珍韵颐韵仪韵伊韵颜韵玄韵欣韵西韵雯韵诗韵伶韵桦韵笛韵迪运兰允剑昀哲昀泽昀烨昀岩昀宓芸芸芸颜芸轩芸坷芸凰云智云伊云轩云侠云松云裳云峰越洲越洋跃新跃齐跃明跃华跃飞跃多跃德岳风远述远飞源轩缘卓缘圆缘元援军圆君原君原军垣宇垣睿沅君沅军元竺元兴元君元军毓琦誉鹰誉鑫誉标煜睿煜锐御玺昱彰昱欣昱晓昱海昱村芋茗玉珍玉贞玉樟玉隆玉龙玉郎玉辉玉刚玉冰语瞳语桐语诺语妮语雷语灿禹洵禹旬禹衡禹晨禹辰俣扬俣佟雨尧雨煊雨萱雨轩雨忻雨薇雨桐雨彤雨诗雨杉雨晴雨芊雨诺雨麟雨娈雨蕾雨雷雨佳雨吉雨豪雨涵雨春雨晨雨宸雨辰雨灿羽彤羽峻宇轩宇涛宇晟宇森宇明宇敏宇翎宇峻宇豪宇迪宇崇与华与灿瑜欣瑜瑕瑜瑾瑜佳榆轩嵛睿俞歆俞淅俞清俞良俞恺俞达俞伯鱼彤妤海妤擘予艺予夷予雅予巧予旎予蕾予函于森囿伊囿百有睿有庆攸睿攸然涌枫勇雨勇暄勇睿勇健勇剑勇建勇坚勇尖勇鸿咏仪咏诗咏蕊咏桦永雄永睿永久永剑永建永弘永和永昊永光永刚拥军映铁映而影逸影翌影淳颖伊颖诗颖铨颖海瀛尹潆潆盈盈盈男盈谷迎紫迎新迎春英良英蝗英煌英宏应聪胤娴胤贤胤琪胤琦胤奇胤其胤康胤俊印菊银池懿范熠清熠霖毅森毅龙毅霖毅锟溢萱逸雨逸阳逸言逸天逸鸣逸珉逸玟逸岚逸帆逸淳翌言翌玮翌睿翌祺翌凝翌鸣翌涵翌淳益星益青弈成奕舟奕臻奕迅奕璇奕彤奕勤奕铭奕敏奕龙奕霖奕康奕吉奕怀奕合奕好奕壕奕豪奕帆";
    let NanSingle =
      "京津捷杰江健剑建翦稼嘉吉霍徽辉晖焕唤桓欢桦华鸿恒赫皓浩昊航杭寒函根戈杠港钢纲岗刚干锋峰风飞凡帆发恩栋董冬东缔丹达聪传冲尺澄埕晨宸辰潮超畅禅灿采博波兵冰斌彬宾彪杓安左梓筑竺宙众仲衷舯智铮镇振湛泽耘云越跃钺钥月远元毓煜钰语禹羽宇瑜游莜优永影荧盈铟懿翼毅溢逸奕绎易宜仪铱伊一烨野遥尧洋阳扬雁焱砚彦琰衍炎烟雅迅恂璇暄轩旭雄鑫啸笑霄潇逍骁枭想翔娴羲熙溪犀晰惜浠萎玮炜苇伟维惟围圩韦巍艇挺铫天腾特涛肃舜顺爽霜释逝轼史石失升善森瑟飒洒睿瑞荣然群擎晴清勤强镪潜乾奇祁璞蒲平鹏朋培诺念末鸣明玟淼棉蒙檬麦珞栾旅鹭璐路露龙凌灵麟霖林亮良利立黎漓梨镭乐郎澜蓝兰琨昆克柯康恺凯开骏俊钧君军珏隽炯靖京缙劲锦金杰侥茳江楗健剑俭坚嘉佳魂辉珲环桦华琥虎鸿洪泓宏弘衡黑赫荷河和何合禾皓航杭瀚颔韩寒涵函国冠鼓鹄谷港罡钢岗冈秆奉蜂锋葑烽峰封枫沣风丰非飞梵凡铎东鼎棣帝地笛迪狄德单丹达绰淳川楚崇辰畅璨斌彬浜邦柏白艾";
    let NvSingle =
      "芬雪霞颖玉萍怡媛莹瑛英瑶燕艳妍嫣娅秀婷茹蓉琼琴裴美娜琳莉玲丽娟婧洁花红芳娥婵冉";
    for (let i = 0; i < NvDouble.length; i += 2) {
      myMing.womanDouble.push(NvDouble[i] + NvDouble[i + 1]);
    }

    for (let i = 0; i < NanDouble.length; i += 2) {
      myMing.manDouble.push(NanDouble[i] + NanDouble[i + 1]);
    }
    for (let i = 0; i < NanSingle.length; i++) {
      myMing.manSingle.push(NanSingle[i]);
    }
    for (let i = 0; i < NvSingle.length; i++) {
      myMing.womanSingle.push(NvSingle[i]);
    }
    myMing.womanSingle = myMing.womanSingle.splice(
      1,
      myMing.womanSingle.length
    );
    myMing.womanDouble = myMing.womanDouble.splice(
      1,
      myMing.womanDouble.length
    );
    myMing.manSingle = myMing.manSingle.splice(1, myMing.manSingle.length);
    myMing.manDouble = myMing.manDouble.splice(1, myMing.manDouble.length);
    return myMing;
  }
  //随机获取一个姓名
  static getName(
    first: any,
    second: any,
    firstType: string,
    secondType: string,
    sex: string
  ) {
    let firstName = "";
    let secondName = "";

    let num = 0;
    if (firstType == "single") {
      num = first.single.length * Math.random();
      num = Math.floor(num);
      firstName = first.single[num];
    } else if (firstType == "double") {
      num = first.double.length * Math.random();
      num = Math.floor(num);
      firstName = first.double[num];
    }
    switch (sex) {
      case "man":
        if (secondType == "single") {
          num = second.manSingle.length * Math.random();
          num = Math.floor(num);
          secondName = second.manSingle[num];
        } else if (secondType == "double") {
          num = second.manDouble.length * Math.random();
          num = Math.floor(num);
          secondName = second.manDouble[num];
        }
        break;
      case "woman":
        if (secondType == "single") {
          num = second.womanSingle.length * Math.random();
          num = Math.floor(num);
          secondName = second.womanSingle[num];
        } else if (secondType == "double") {
          num = second.womanDouble.length * Math.random();
          num = Math.floor(num);
          secondName = second.womanDouble[num];
        }
        break;
      default:
        return "憨憨的钟声";
    }
    return firstName + secondName;
  }
}
