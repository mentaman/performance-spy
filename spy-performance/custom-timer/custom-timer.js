let customTimersPerfStat = {};
export const resetCustomTimers = () => {
  customTimersPerfStat = {};
};

export const getCustomTimers = () => {
  return customTimersPerfStat;
};

class CustomSpyFunctionsTimer {
  constructor(name) {
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
    customTimersPerfStat[this.name].maxDuration = Math.max(this.duration, customTimersPerfStat[this.name].maxDuration);
    customTimersPerfStat[this.name].minDuration =
      customTimersPerfStat[this.name].minDuration === null
        ? this.duration
        : Math.min(this.duration, customTimersPerfStat[this.name].minDuration);
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
const startCustomTimer = function (name) {
  return new CustomSpyFunctionsTimer(name);
};
window.startCustomTimer = startCustomTimer;
