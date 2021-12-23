"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfStatsStuff = void 0;
class PerfStatsStuff {
    constructor(type = "") {
        this.type = type;
        this.stats = {};
    }
    createStat(key, name, defaultValue) {
        if (!this.stats[key]) {
            this.stats[key] = {};
        }
        if (this.stats[key][name] === undefined) {
            this.stats[key][name] = defaultValue;
        }
    }
    statExists(key, name) {
        return this.stats[key] && this.stats[key][name] !== undefined;
    }
    getSubStat(key, name) {
        if (!this.statExists(key, name)) {
            this.createStat(key, name, new PerfStatsStuff());
        }
        return this.stats[key][name];
    }
    setStat(key, name, value) {
        this.createStat(key, name, value);
        this.stats[key][name] = value;
    }
    increaseStat(key, name, increaseBy) {
        this.createStat(key, name, 0);
        this.stats[key][name] += increaseBy;
    }
    maxStat(key, name, value) {
        this.createStat(key, name, value);
        this.stats[key][name] = Math.max(value, this.stats[key][name]);
    }
    minStat(key, name, value) {
        this.createStat(key, name, value);
        this.stats[key][name] = Math.min(value, this.stats[key][name]);
    }
    forwardStat(key, name) {
        this.increaseStat(key, name, 1);
    }
    addDurationStat(key, duration) {
        this.increaseStat(key, "duration", duration);
        this.forwardStat(key, "count");
        if (duration > 16) {
            this.forwardStat(key, "moreThanFrameCount");
        }
        if (duration > 100) {
            this.forwardStat(key, "moreThan0.1s");
        }
        this.minStat(key, "minDuration", duration);
        this.maxStat(key, "maxDuration", duration);
    }
    reset() {
        this.stats = {};
    }
}
exports.PerfStatsStuff = PerfStatsStuff;
