const path = require("path");
const fs = require("fs");

const resolvers = fs.readdirSync(path.resolve("./src/resolver")).map((p) => path.parse(p).name);
const resolverPath = path.resolve("./resolver");

for(const resolver of resolvers) {
    console.log(resolver);
    const resolverFinalPath = path.join(resolverPath, resolver);

    const packageData = {
        name: resolver,
        "main": "./dist/lib/index.js",
        "jsnext:main": "./dist/es/index.js",
        "module": "./dist/es/index.js",
        "unpkg": "./dist/dist/index.js"
    }

    fs.writeFileSync(path.join(resolverFinalPath, "./package.json"), JSON.stringify(packageData, null, "\t"), {encoding: "utf-8"})
}

