export const spyJesAliases = (mocka: any, reqActual: any, aliases: {[key: string]: string} = {}) => {
    const finalAliases: {[key: string]: string} = {};
    const supported = new Set(["redux-thunk", "reselect", "re-reselect"])
    for(const [aliasKey, aliasNodeModulePath] of Object.entries(aliases)) {
        if(supported.has(aliasKey)) {
            finalAliases[aliasKey+"/es"] = aliasNodeModulePath+"/es";
        }
        finalAliases[aliasKey] = "performance-spy/es/resolver/"+aliasKey+"-module";
    }
    
    console.log("Overriden libraries by jest spier", finalAliases);
    for(const [aliasKey, finalPath] of Object.entries(finalAliases)) {
        mocka(aliasKey, function () { return reqActual(finalPath) } );
    }

    return finalAliases;
}