/**
 * @file 如何监听一个数据变化
 * @author tiva
 */
// 观察者的构造函数
function Observer(data) {
    this.data = data;
    this.walk(data);
}

var p = Observer.prototype;

// walk 用于深层次的遍历对象的各个属性
p.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object') {
                new Observer(val);
            }
            this.convert(key, val);
        }
    }
}

p.convert = function (key, val) {
    Observer.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('你访问了' + key);
            return val;
        },
        set: function (newVal) {
            console.log('你设置了' + key);
            console.log('新的' + key + ' = ' + newVal);
            if (newVal === val) {
                return;
            }
            val = newVal;
        }
    })
}
var data = {
    user: {
        name: "liasd",
        age: 12
    },
    address: {
        city: "beijing"
    }
};

var app = new Observer(data);
