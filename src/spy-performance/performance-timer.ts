export class PerfStatsStuff {
  type: string;
  stats: {
    [key: string]: {
      duration?: number;
      count?: number;
      maxCount?: number;
      minCount?: number;
      moreThanFrameCount?: number;
      'moreThan0.1s'?: number;
    } & {
      [key: string]: number | PerfStatsStuff
    }
  }

  constructor(type: string = "") {
    this.type = type;
    this.stats = {};
  }

  createStat(key: string, name: string, defaultValue: number | PerfStatsStuff) {
    if (!this.stats[key]) {
      this.stats[key] = {};
    }

    if (this.stats[key][name] === undefined) {
      this.stats[key][name] = defaultValue;
    }
  }

  statExists(key: string, name: string) {
    return this.stats[key] && this.stats[key][name] !== undefined;
  }

  getSubStat(key: string, name: string) {
    if (!this.statExists(key, name)) {
      this.createStat(key, name, new PerfStatsStuff());
    }

    return this.stats[key][name];
  }

  setStat(key: string, name: string, value: number) {
    this.createStat(key, name, value);
    this.stats[key][name] = value;
  }

  increaseStat(key: string, name: string, increaseBy: number) {
    this.createStat(key, name, 0);
    (this.stats[key][name] as number) += increaseBy;
  }

  maxStat(key: string, name: string, value: number) {
    this.createStat(key, name, value);
    this.stats[key][name] = Math.max(value, this.stats[key][name] as number);
  }

  minStat(key: string, name: string, value: number) {
    this.createStat(key, name, value);
    this.stats[key][name] = Math.min(value, this.stats[key][name] as number);
  }

  forwardStat(key: string, name: string) {
    this.increaseStat(key, name, 1);
  }

  addDurationStat(key: string, duration: number) {
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
