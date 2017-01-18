/**
 * 数据观察者。
 * 使用场景：多个模块里需要加载同一个数据，但只需要加载一次。
 * 所以在每个模块里绑定数据加载完毕的事件，
 * 然后只在一个地方加载数据，加载完后触发数据事件就ok了。
 *
 * @param {HTMLElement} a
 * @param {HTMLElement} b
 * @return {Bool}
 */

var DataObserver = {
    // 事件池
    _EVENTS_: {},
    _DATA_: {},
    // 绑定数据事件
    on: function (type, handler) {
        (this._EVENTS_[type]
            || (this._EVENTS_[type] = [])
        ).push(handler);

        if (this._DATA_.hasOwnProperty(type)) {
            handler.apply(null, this._DATA_[type]);
        }
        return this;
    },
    // 解绑事件
    off: function (type) {
        this._EVENTS_[type] = null;
        this._DATA_[type] = null;
        return this;
    },
    // 触发事件
    emit: function (type) {
        var event = this._EVENTS_[type] || [];
        var i = 0;
        var len = event.length;
        var args = [].slice.call(arguments, 1);

        this._DATA_[type] = args;

        for (; i < len; i++) {
            event[i].apply(null, args);
        }
        return this;
    }
}

// example:
DataObserver.on('feed-load', function (data1, data2) {
    console.log(data1 + data2)
});
//触发数据事件
DataObserver.emit('feed-load', '1', '2');