"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const ThemeARouter_1 = __importDefault(require("./themeA/ThemeARouter"));
const ThemeBRouter_1 = __importDefault(require("./themeB/ThemeBRouter"));
class MasterRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._subrouterA = ThemeARouter_1.default;
        this._subrouterB = ThemeBRouter_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    /**
     * Connect routes to their matching routers.
     */
    _configure() {
        this._router.use('/themeA', this._subrouterA);
        this._router.use('/themeB', this._subrouterB);
    }
}
module.exports = new MasterRouter().router;
