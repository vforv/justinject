"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./Container");
exports.Service = function (type) {
    return function (target) {
        Container_1.Container.set(target, type);
    };
};
