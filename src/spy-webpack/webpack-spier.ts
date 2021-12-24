/* tslint:disable:no-console */
export function spyWebpackAliases(aliases: {[key: string]: string} = {}) {
    const finalAliases: {[key: string]: string} = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"])
    for(const [aliasKey, aliasNodeModulePath] of Object.entries(aliases)) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"-original"] = aliasNodeModulePath;
        }
        finalAliases[aliasKey] = "performance-spy/resolver/"+aliasKey+"-module";
    }
    console.log("Overriden libraries by webpack performance spier", finalAliases);
    return finalAliases;
}