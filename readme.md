
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

Install library

    npm i performance-spy

## Setup with webpack

1 - add to webpack.config.js:

    alias: {
        /* my aliases */
        ...require("performance-spy").spyWebpackAliases({
            "redux-thunk": path.resolve("./node_modules/redux-thunk"),
            "reselect": path.resolve("./node_modules/reselect"),
            "re-reselect": path.resolve("./node_modules/re-reselect"),
            "redux": path.resolve("./node_modules/redux"),
        })
    }

it'll override redux/reselect with performance-spy libraries

2 - add to your init.js file, before any usage of one of the libraries

    require("performance-spy").enableSpying();

Note that step 2 shouldn't be used in production, it'll have performance impact since all the libraries functions will be used through the library..
You can allow it though to a specific user in production for research with some condition.


## Setup with jest

See example [Example](https://github.com/mentaman/performance-spy/tree/main/examples/jest-example)

1 - add to jest.config.js

    moduleNameMapper: {
        // my name mappers...
        ...spyJesAliases("<rootDir>/node_modules", ["redux-thunk", "re-reselect", "reselect", "redux"])
    }

2 - add to jest setup

    require("performance-spy").enableSpying();

3 - to jest beforeEach

    beforeEach(() => {
      perfStatsReset();
    });

## How to research with it

1 - load a page, do some actions

2 - run in f12 console:

    getPerfSummary()

3 - you'll get a summary of what had happend

## Measure a specific action

1 - load a page and prepare to do your action

2 - run in f12 console 

    perfStatsReset()

3 - do your action

4 - run in f12 console

    getPerfSummary

5 - you'll see a summary of this action

## Custom measures

If you have a function that you know it's slow, but you don't know which part
you can use 

    const timer = startCustomTimer("measuring a")
    // some actions
    timer.end()

and then you'll see it as part of getPerfSummary

so you can divide and conquer your slow function until you find which part is slow:

    const measureHeavy = startCustomTimer("heavy")
    someHeavyStuff()
    measureHeavy.end()

    const measureLight = startCustomTimer("light")
    someLightStuff()
    measureLight.end()

    const measureSuspect = startCustomTimer("suspicious")
    SomeSuspiciousStuff()
    measureSuspect.end()

and you'll get the answer which one is the slowing part? the heavy function? the suspicious? the light?


you can also provide data to it, for dynamic measure, to know which id had a slow transaction

    const measureIdStuff = startCustomTimer("suspicious"+id)
    heavyFunction(id)
    measureIdStuff.end()




