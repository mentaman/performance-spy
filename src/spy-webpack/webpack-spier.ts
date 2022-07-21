interface Options {
    silent: boolean;
}

export function spyWebpackAliases(aliases: {[key: string]: string} = {}, options: Options = { silent: true }) {
    const finalAliases: {[key: string]: string} = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect", "redux"])
    for(const aliasKey of aliases) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"-original"] = nodemodule+"/"+aliasKey;
            finalAliases[aliasKey] = nodemodule+"/performance-spy/resolver/"+aliasKey+"-module";
        }
    }

    if (!options.silent) {
        console.log("Overriden libraries by webpack performance spier", finalAliases);
    }

    return finalAliases;
}
