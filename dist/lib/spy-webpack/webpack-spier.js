"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spyWebpackAliases = void 0;
function spyWebpackAliases(aliases = {}) {
    const finalAliases = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"]);
    for (const [aliasKey, aliasNodeModulePath] of Object.entries(aliases)) {
        if (supported.has(aliasKey)) {
            finalAliases[aliasKey + "-original"] = aliasNodeModulePath;
        }
        finalAliases[aliasKey] = "performance-spy/resolver/" + aliasKey + "-module";
    }
    console.log("Overriden libraries by webpack performance spier", finalAliases);
    return finalAliases;
}
exports.spyWebpackAliases = spyWebpackAliases;
