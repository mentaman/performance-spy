import * as path from "path";

export function spyWebpackAliases(aliases) {
    const finalAliases = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"])
    for(const [aliasKey, aliasNodeModulePath] of Object.entries(aliases)) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"/es"] = aliasNodeModulePath+"/es";
        }
        finalAliases[aliasKey] = path.resolve("../resolvers/"+aliasKey);
    }
    console.log("Overriden libraries by webpack spier", finalAliases);
    return finalAliases;
}