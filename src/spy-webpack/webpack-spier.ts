/* tslint:disable:no-console */
export function spyWebpackAliases(nodemodule: string, aliases: string[]) {
    const finalAliases: {[key: string]: string} = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect", "redux"])
    for(const aliasKey of aliases) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"-original"] = nodemodule+"/"+aliasKey;
            finalAliases[aliasKey] = nodemodule+"/performance-spy/resolver/"+aliasKey+"-module";
        }
    }
    console.log("Overriden libraries by webpack performance spier", finalAliases);
    return finalAliases;
}