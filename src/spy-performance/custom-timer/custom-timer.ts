
type perfStat = {
  times: number,
  duration: number,
  "moreThan0.5msTimes": number,
  moreThan1msTimes: number,
  moreThan10msTimes: number,
  moreThan100msTimes: number,
  moreThanFrameTimes: number,
  maxDuration: number | null,
  minDuration: number | null,
  avgTime?: number
}

let customTimersPerfStat: {[key: string]: perfStat} = {};
export const resetCustomTimers = () => {
  customTimersPerfStat = {};
};

export const getCustomTimers = () => {
  return customTimersPerfStat;
};


export class CustomSpyFunctionsTimer {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;

  constructor(name: string) {
    this.name = name;
    this.startTime = performance.now();
  }

  end() {
    this.endTime = performance.now();
    this.duration = this.endTime - this.startTime;
    if (!customTimersPerfStat[this.name]) {
      customTimersPerfStat[this.name] = {
        times: 0,
        duration: 0,
        "moreThan0.5msTimes": 0,
        moreThan1msTimes: 0,
        moreThan10msTimes: 0,
        moreThan100msTimes: 0,
        moreThanFrameTimes: 0,
        maxDuration: 0,
        minDuration: null
      };
    }
    customTimersPerfStat[this.name].times++;
    customTimersPerfStat[this.name].duration += this.duration;
    customTimersPerfStat[this.name].avgTime =
      customTimersPerfStat[this.name].duration / customTimersPerfStat[this.name].times;
    customTimersPerfStat[this.name].maxDuration = Math.max(this.duration as number, customTimersPerfStat[this.name].maxDuration as number);
    customTimersPerfStat[this.name].minDuration =
      customTimersPerfStat[this.name].minDuration === null
        ? this.duration
        : Math.min(this.duration as number, customTimersPerfStat[this.name].minDuration as number);
    if (this.duration > 0.5) {
      customTimersPerfStat[this.name]["moreThan0.5msTimes"]++;
    }
    if (this.duration > 1) {
      customTimersPerfStat[this.name].moreThan1msTimes++;
    }
    if (this.duration > 10) {
      customTimersPerfStat[this.name].moreThan10msTimes++;
    }
    if (this.duration > 16) {
      customTimersPerfStat[this.name].moreThanFrameTimes++;
    }
    if (this.duration > 100) {
      customTimersPerfStat[this.name].moreThan100msTimes++;
    }
  }
}
export const startCustomTimer = function (name: string): CustomSpyFunctionsTimer {
  return new CustomSpyFunctionsTimer(name);
};
