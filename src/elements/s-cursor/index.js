"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sodiumjs_1 = require("sodiumjs");
var cursor_1 = require("../cursor");
var sCursor = (function (_super) {
    __extends(sCursor, _super);
    function sCursor(eventType, context, sSink) {
        if (eventType === void 0) { eventType = 'click'; }
        if (context === void 0) { context = window; }
        if (sSink === void 0) { sSink = new sodiumjs_1.StreamSink(); }
        var _this;
        var sHandler = function (event) { sSink.send(event); };
        _this = _super.call(this, sHandler, context) || this;
        _this.sEventSink = sSink;
        _this.setEvent(eventType);
        _this.addEvent();
        return _this;
    }
    return sCursor;
}(cursor_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sCursor;
