# Performance Spy

## How it works

It'll override the implentation of your favorite libraries!

- React ( not fully implemented yet )
- Redux
- Redux Thunk
- Moment ( not implented yet )
- reselect
- re-reselect

And will tell you how much performance they take, and you can improve their usage.

For example if you have in reselect a function that takes 1 seconds each time, and gets calculated 5 times instead of once, it'll show you which arguments caused the cache to expire.

## How to use

(Not an npm library yet, just a placeholder)

1.  Install library
    npm i performance-spy

2.  add to webpack.config.js:

    import performanceSpy from "performance/spy-webpack"

    alias: {
        /* my aliases */
        ...performanceSpy.spyWebpackAliases({
            "redux-thunk": path.resolve("./node_modules/redux-thunk"),
            "reselect": path.resolve("./node_modules/reselect"),
            "re-reselect": path.resolve("./re-reselect-module"),
        })
    }

    it'll override redux/reselect with performance-spy libraries

3. add to your init.js file, before any usage of one of the libraries

require("performance/spy-initial")