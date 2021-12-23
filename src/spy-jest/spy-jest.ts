
export const spyJestAliases = (nodemodule: string, aliases: string[]) => {
    const finalAliases: {[key: string]: string} = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"])
    for(const aliasKey of aliases) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"-original(.*)"] = nodemodule+"/"+aliasKey+"$1";
        }
        finalAliases[aliasKey+"(.*)"] = nodemodule+"/performance-spy/resolver/"+aliasKey+"-module$1";
    }
    
    console.log("Overriden libraries by jest spier", finalAliases);

    return finalAliases;
}