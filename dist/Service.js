"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
exports.Service = (type) => {
    return (target) => {
        Container_1.Container.set(target, type);
    };
};
