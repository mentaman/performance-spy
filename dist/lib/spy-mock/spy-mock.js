"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spyJesAliases = void 0;
const spyJesAliases = (mocka, reqActual, aliases = {}) => {
    const finalAliases = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"]);
    for (const [aliasKey, aliasNodeModulePath] of Object.entries(aliases)) {
        if (supported.has(aliasKey)) {
            finalAliases[aliasKey + "-original"] = aliasNodeModulePath;
        }
        finalAliases[aliasKey] = "performance-spy/resolver/" + aliasKey + "-module";
    }
    console.log("Overriden libraries by jest spier", finalAliases);
    for (const [aliasKey, finalPath] of Object.entries(finalAliases)) {
        mocka(aliasKey, function () { return reqActual(finalPath); });
    }
    return finalAliases;
};
exports.spyJesAliases = spyJesAliases;
