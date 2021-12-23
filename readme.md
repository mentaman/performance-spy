# Performance Spy

## How it works

It'll override the implentation of your favorite libraries!

- React ( still WIP )
- Redux Reducers ( still WIP )
- Redux Dispatches
- Redux Thunk
- Moment ( not implented yet )
- reselect
- re-reselect

And will tell you how much performance they take, and you can improve their usage.

For example if you have in reselect a function that takes 1 seconds each time, and gets calculated 5 times instead of once, it'll show you which arguments caused the cache to expire.

## Why use it instead of profiler?

1. Profilers work in samples, they check the stacktrace a few times in a ms, but in between there are lots of things you might miss and won't be able to find with it due to it.

2. Profilers will usually be less guidy, they won't show you, this cache selector doesn't work well and broken.

## Install

1.  Install library
    npm i performance-spy

(Not an npm library yet, just a placeholder)

## Setup with webpack

1.  add to webpack.config.js:

    alias: {
        /* my aliases */
        ...require("performance-spy").spyWebpackAliases({
            "redux-thunk": path.resolve("./node_modules/redux-thunk"),
            "reselect": path.resolve("./node_modules/reselect"),
            "re-reselect": path.resolve("./re-reselect-module"),
        })
    }

    it'll override redux/reselect with performance-spy libraries

2. add to your init.js file, before any usage of one of the libraries

    require("performance-spy").enableSpying();


## Setup with jest

1. add to jest.init
    require("performance-spy").enableSpying();

2. and then:
    
    require("performance-spy").spyJestAliases(jest, {
        "redux-thunk": path.resolve("./node_modules/redux-thunk"),
        "reselect": path.resolve("./node_modules/reselect"),
        "re-reselect": path.resolve("./re-reselect-module"),
    })

## How to research with it

1. load a page, do some actions

2. run in f12 console:

    getPerfSummary()

3. you'll get a summary of what had happend

## Measure a specific action

1. load a page and prepare to do your action

2. run in f12 console 

    perfStatsReset()

3. do your action

4. run in f12 console

    getPerfSummary

5. you'll see a summary of this action
