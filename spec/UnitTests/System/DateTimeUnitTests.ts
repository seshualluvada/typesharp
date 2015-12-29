/// <reference path="../../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />

describe("DateTime Unit Tests ::", () => {
    var startDate: Date;
    var endDate: Date;

    it("datediff can calcuale date difference in milliseconds", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2015, 12, 2, 10, 15, 20, 600);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.MilliSeconds)).toBeCloseTo(100, 0);
    });

    it("datediff can calcuale date difference in seconds", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2015, 12, 2, 10, 15, 25, 500);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.Seconds)).toBeCloseTo(5, 0);
    });

    it("datediff can calcuale date difference in minutes", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2015, 12, 2, 10, 20, 20, 500);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.Minutes)).toBeCloseTo(5, 0);
    });

    it("datediff can calcuale date difference in hours", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2015, 12, 2, 12, 15, 20, 500);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.Hours)).toBeCloseTo(2, 0);
    });

    it("datediff can calcuale date difference in days", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2015, 12, 8, 10, 15, 20, 500);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.Days)).toBeCloseTo(6, 0);
    });

    it("datediff can calcuale date difference in weeks", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2015, 12, 9, 10, 15, 20, 500);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.Weeks)).toBeCloseTo(1, 0);
    });

    it("datediff can calcuale date difference in months", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2016, 3, 2, 10, 15, 20, 500);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.Months)).toBeCloseTo(3, 0);
    });

    it("datediff can calcuale date difference in years", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2017, 12, 2, 10, 15, 20, 500);
        expect(TS.System.DateTime.dateDiff(startDate, endDate, TS.System.TimeSpanUnit.Years)).toBeCloseTo(2, 0);
    });

    it("datediff throws an expection if the date unit is UnitNotSet", () => {
        startDate = new Date(2015, 12, 2, 10, 15, 20, 500);
        endDate = new Date(2017, 12, 2, 10, 15, 20, 500);
        try {
            var result = TS.System.DateTime.dateDiff(startDate, endDate, undefined);
        } catch (e) {
            expect(e).toBe("Unit is not valid");
        }

    });

});