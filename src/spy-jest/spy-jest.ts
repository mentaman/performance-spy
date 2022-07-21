interface Options {
    silent: boolean;
}

export const spyJestAliases = (nodemodule: string, aliases: string[], options: Options = { silent: true }) => {
    const finalAliases: {[key: string]: string} = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect", "redux"])
    for(const aliasKey of aliases) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"-original(.*)"] = nodemodule+"/"+aliasKey+"$1";
            finalAliases[aliasKey+"(.*)"] = nodemodule+"/performance-spy/resolver/"+aliasKey+"-module$1";
        }
    }
    
    if (!options.silent) {
        console.log("Overriden libraries by jest performance spier", finalAliases);
    }

    return finalAliases;
}
