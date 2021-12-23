"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spyJestAliases = void 0;
const spyJestAliases = (nodemodule, aliases) => {
    const finalAliases = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"]);
    for (const aliasKey of aliases) {
        if (supported.has(aliasKey)) {
            finalAliases[aliasKey + "-original(.*)"] = nodemodule + "/" + aliasKey + "$1";
        }
        finalAliases[aliasKey + "(.*)"] = nodemodule + "/performance-spy/resolver/" + aliasKey + "-module$1";
    }
    console.log("Overriden libraries by jest performance spier", finalAliases);
    return finalAliases;
};
exports.spyJestAliases = spyJestAliases;
