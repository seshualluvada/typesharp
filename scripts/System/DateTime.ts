module TS {
    export module System {
        export enum TimeSpanUnit {
            Years, Months, Weeks, Days, Hours, Minutes, Seconds, MilliSeconds
        }
        export class DateTime {

            static dateDiff(startDate: Date, endDate: Date, unit: TimeSpanUnit): number {

                switch (unit) {
                    case TimeSpanUnit.MilliSeconds:
                        return Math.abs(endDate.valueOf() - startDate.valueOf());

                    case TimeSpanUnit.Seconds:
                        return Math.floor(Math.abs(endDate.valueOf() - startDate.valueOf()) / 1000);

                    case TimeSpanUnit.Minutes:
                        return Math.floor(Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60));

                    case TimeSpanUnit.Hours:
                        return Math.floor(Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60));

                    case TimeSpanUnit.Days:
                        return Math.floor(Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24));

                    case TimeSpanUnit.Weeks:
                        return Math.floor(Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24 * 7));

                    case TimeSpanUnit.Months:
                        return Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24 * 30.4375);

                    case TimeSpanUnit.Years:
                        return Math.abs(endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24 * 30.4375 * 12);

                    default:
                        throw "Unit is not valid";
                }
            }
        }
    }
}