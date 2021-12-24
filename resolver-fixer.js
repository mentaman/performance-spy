const path = require("path");
const fs = require("fs");

const resolvers = fs.readdirSync(path.resolve("./src/resolver")).map((p) => path.parse(p).name);
const resolverPath = path.resolve("./resolver");

if(!fs.existsSync(resolverPath)) {
    fs.mkdirSync(resolverPath);    
}
for(const resolver of resolvers) {
    console.log(resolver);
    const resolverFinalPath = path.join(resolverPath, resolver);
    const resolverFinalPathDist = path.join(resolverFinalPath, "dist");
    const resolverFinalPathDistEs = path.join(resolverFinalPathDist, "es");
    const resolverFinalPathDistLib = path.join(resolverFinalPathDist, "lib");
    
    if(!fs.existsSync(resolverFinalPath)) {
        fs.mkdirSync(resolverFinalPath);    
    }
    if(!fs.existsSync(resolverFinalPathDist)) {
        fs.mkdirSync(resolverFinalPathDist);    
    }
    if(!fs.existsSync(resolverFinalPathDistEs)) {
        fs.mkdirSync(resolverFinalPathDistEs);    
    }
    if(!fs.existsSync(resolverFinalPathDistLib)) {
        fs.mkdirSync(resolverFinalPathDistLib);    
    }
    fs.copyFileSync(path.resolve("./dist/es/resolver/"+resolver+".js"), resolverFinalPathDistEs+"/index.js");
    fs.copyFileSync(path.resolve("./dist/lib/resolver/"+resolver+".js"), resolverFinalPathDistLib+"/index.js");
    const packageData = {
        name: resolver,
        "main": "./dist/lib/index.js",
        "jsnext:main": "./dist/es/index.js",
        "module": "./dist/es/index.js",
        "exports": {
            ".": {
            "import": "./dist/es/index.js",
            "require": "./dist/lib/index.js"
            }
        }
    }
    fs.writeFileSync(path.join(resolverFinalPath, "./package.json"), JSON.stringify(packageData, null, "\t"), {encoding: "utf-8"})
}

