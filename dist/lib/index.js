"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableSpying = exports.spyJestAliases = exports.spyWebpackAliases = void 0;
var webpack_spier_1 = require("./spy-webpack/webpack-spier");
Object.defineProperty(exports, "spyWebpackAliases", { enumerable: true, get: function () { return webpack_spier_1.spyWebpackAliases; } });
var spy_jest_1 = require("./spy-jest/spy-jest");
Object.defineProperty(exports, "spyJestAliases", { enumerable: true, get: function () { return spy_jest_1.spyJestAliases; } });
var perf_spier_1 = require("./spy-performance/perf-spier");
Object.defineProperty(exports, "enableSpying", { enumerable: true, get: function () { return perf_spier_1.enableSpying; } });
