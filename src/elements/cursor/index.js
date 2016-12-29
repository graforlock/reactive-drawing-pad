"use strict";
var Cursor = (function () {
    function Cursor(handler, context) {
        if (handler === void 0) { handler = function (event) { }; }
        if (context === void 0) { context = window; }
        var _this = this;
        this.addEvent = function () { return _this.context.addEventListener(_this.eventType, _this.handler); };
        this.context = context;
        this.handler = handler;
    }
    Cursor.prototype.setEvent = function (eventType) {
        this.eventType = eventType;
    };
    return Cursor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cursor;
