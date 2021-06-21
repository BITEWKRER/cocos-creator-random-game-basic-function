System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, Person, _crd;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7f739n7V3FBtrIKdd8e0syb", "person", undefined);

      Person = class Person {
        constructor(name, age, sex) {
          _defineProperty(this, "name", void 0);

          _defineProperty(this, "age", void 0);

          _defineProperty(this, "sex", void 0);

          _defineProperty(this, "relations", void 0);

          _defineProperty(this, "index", void 0);

          this.name = name;
          this.age = age;
          this.sex = sex;
          this.relations = [{}];
          this.index = 0;
        }

        addRelation(people, whatRalation) {
          this.relations.push({
            r_ship: whatRalation,
            r_name: people.name
          });
        }

      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=person.js.map