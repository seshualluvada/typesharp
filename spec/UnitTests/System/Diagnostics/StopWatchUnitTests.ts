/// <reference path="../../../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />

describe("StopWatch UnitTests ::", () => {
    var stopwatch: TS.System.Diagnostics.StopWatch;

    //Asynchronous Unit Test in Jasmine using the done function. 
    function runInBackground(done: ()=>void) {
        stopwatch = new TS.System.Diagnostics.StopWatch();
        stopwatch.Unit = TS.System.TimeSpanUnit.MilliSeconds;
        stopwatch.start();
        setTimeout(() => {
            done();
        }, 2000);
    }

    beforeEach(done => {
        runInBackground(done);
    });

    it("StopWatch Start Exception", () => {
        try {
            stopwatch.start();
        }
        catch (e) {
            expect(e).toBe("StopWatch is already Running");
        }
    });

    it("StopWatch can measure time elapsed", () => {
        var elapsedTime: number = stopwatch.stop();
        expect(elapsedTime).toBeGreaterThan(1900);
        expect(elapsedTime).toBeLessThan(2100);
        try {
            stopwatch.stop();
        }
        catch (e) {
            expect(e).toBe("StopWatch should be started before it can be stopped");
        }
    });
});