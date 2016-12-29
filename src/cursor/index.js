"use strict";
var Cursor = (function () {
    function Cursor(handler, context) {
        if (handler === void 0) { handler = function () { }; }
        if (context === void 0) { context = window; }
        var _this = this;
        this.on = function (eventType) { return _this.context.addEventListener(eventType, _this.handler); };
    }
    return Cursor;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cursor;
