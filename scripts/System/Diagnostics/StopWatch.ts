/// <reference path="../DateTime" />

module TS {
    export module System {
        export module Diagnostics {
            export class StopWatch {
                private date: Date;
                private isRunning: boolean = false;
                Unit: System.TimeSpanUnit;

                /**
                 * create a new instance of the stopwatch object. optionally pass the timespan unit to get the elapsed time in a specified unit. the default is milliseconds.
                 * @param unit
                 */
                static startNew(unit?: System.TimeSpanUnit): StopWatch {
                    var stopWatch = new StopWatch(unit);
                    stopWatch.start();
                    return stopWatch;
                }
                
                /**
                 * create a stopwatch object and optionally pass the timespan unit to get the elapsed time in a specified unit. the default is milliseconds. 
                 * @param unit
                 */
                constructor(unit?: System.TimeSpanUnit) {
                    if ((unit !== null) && (unit !== undefined)) {
                        this.Unit = unit;
                    } else {
                        this.Unit = System.TimeSpanUnit.MilliSeconds;
                    }
                }

                /**
                 * starts the stopwatch.
                 */
                start(): void {
                    if (this.isRunning) {
                        throw "StopWatch is already Running";
                    } else {
                        this.date = new Date(Date.now());
                        this.isRunning = true;
                    }
                }

                /**
                 * stops the stopwatch and returns the elapsed time in the units specified.
                 */
                stop(): number {
                    if (!this.isRunning) {
                        throw "StopWatch should be started before it can be stopped";
                    } else {
                        this.isRunning = false;
                        return System.DateTime.dateDiff(this.date, new Date(Date.now()), this.Unit);
                    }

                }
            }
        }
    }
}