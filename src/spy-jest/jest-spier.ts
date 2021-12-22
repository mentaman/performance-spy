
import * as path from "path";

export function spyJestAliases(jest, aliases) {
    const finalAliases = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"])
    for(const [aliasKey, aliasNodeModulePath] of Object.entries(aliases)) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"/es"] = aliasNodeModulePath+"/es";
        }
        finalAliases[aliasKey] = path.resolve("../resolvers/"+aliasKey);
    }
    console.log("Overriden libraries by jest spier", finalAliases);
    for(const [aliasKey, absPath] of Object.entries(finalAliases)) {
        jest.mock(aliasKey, () => jest.requireActual(absPath));
    }
    
    return finalAliases;
}