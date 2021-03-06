const keyA = "measuring a";
const keyB = "measuring b";

describe("should check how long it takes to measure", () => {
    it("should show at least time in test", () => {
        const timer = startCustomTimer(keyA);

        const start = performance.now();
        let txt = "";
        for(let i=0; i<1000; i++) {
            txt += "a";
        }
        const end = performance.now();

        timer.end();

        expect(end-start).toBeLessThanOrEqual(getPerfSummary().customTimersPerfStat[keyA].duration)
    })

    it("should show time of both measures", () => {
        const timer = startCustomTimer(keyA);

        const start = performance.now();
        let txt = "";
        for(let i=0; i<1000; i++) {
            txt += "a";
        }
        const end = performance.now();

        timer.end();

        const timer2 = startCustomTimer(keyA);

        const start2 = performance.now();
        let txt2 = "";
        for(let i=0; i<1000; i++) {
            txt2 += "a";
        }
        const end2 = performance.now();

        timer2.end();

        expect((end-start)+(end2-start2)).toBeLessThanOrEqual(getPerfSummary().customTimersPerfStat[keyA].duration)
    })

    it("should keep each measure in its key", () => {
        const timer = startCustomTimer(keyA);

        const start = performance.now();
        let txt = "";
        for(let i=0; i<1000; i++) {
            txt += "a";
        }
        const end = performance.now();

        timer.end();

        const timer2 = startCustomTimer(keyB);

        const start2 = performance.now();
        let txt2 = "";
        for(let i=0; i<1000; i++) {
            txt2 += "a";
        }
        const end2 = performance.now();

        timer2.end();

        expect((end-start)).toBeLessThanOrEqual(getPerfSummary().customTimersPerfStat[keyA].duration)
        expect((end2-start2)).toBeLessThanOrEqual(getPerfSummary().customTimersPerfStat[keyB].duration)
    })
})