/// <reference path="../../../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />

describe("List UnitTests ", () => {
    var stringList: TS.System.Collections.List<string>;
    var stopWatch = new TS.System.Diagnostics.StopWatch();
    stopWatch.Unit = TS.System.TimeSpanUnit.MilliSeconds; 

    beforeEach(() => {
        stopWatch.start();
        stringList = new TS.System.Collections.List<string>();
        for (let counter = 1; counter <= 1000; counter++) { 
            stringList.add("Item" + counter.toString());  
        }
    });

    afterEach(() => {
        stopWatch.stop();
    });

    it("String List can store a list of strings", () => {
        stringList = new TS.System.Collections.List<string>();
        expect(stringList.length()).toBe(0);

        stringList.add("item1");
        expect(stringList.length()).toBe(1);
        expect(stringList.exists("item1")).toBe(true);
        expect(stringList.exists("item2")).toBe(false);

        stringList.add("item2");
        expect(stringList.length()).toBe(2);
        expect(stringList.exists("item1")).toBe(true);
        expect(stringList.exists("item2")).toBe(true);

        stringList.remove("item1");
        expect(stringList.length()).toBe(1);
        expect(stringList.exists("item1")).toBe(false);
        expect(stringList.exists("item2")).toBe(true);

        stringList.remove("item2");
        expect(stringList.length()).toBe(0);
        expect(stringList.exists("item1")).toBe(false);
        expect(stringList.exists("item2")).toBe(false);

    });

    it("Removing the first item from a list works accurately", () => {

        expect(stringList.length()).toBe(1000);

        stringList.remove("Item1");
        expect(stringList.length()).toBe(999);
        expect(stringList.exists("Item1")).toBe(false);

        for (let counter = 2; counter <= 1000; counter++) {
            expect(stringList.exists("Item" + counter.toString())).toBe(true);
        }
    });

    it("Removing the bottom item from a list works accurately", () => {

        expect(stringList.length()).toBe(1000);

        stringList.remove("Item1000");
        expect(stringList.length()).toBe(999);
        expect(stringList.exists("Item1000")).toBe(false);

        for (let counter = 1; counter <= 999; counter++) {
            expect(stringList.exists("Item" + counter.toString())).toBe(true);
        }
    });

    it("Removing a middle item from the list works accurately", () => {
        expect(stringList.length()).toBe(1000);

        stringList.remove("Item500");
        expect(stringList.length()).toBe(999);
        expect(stringList.exists("Item500")).toBe(false);

        for (let counter = 1; counter <= 499; counter++) {
            expect(stringList.exists("Item" + counter.toString())).toBe(true);
        }

        for (let counter = 501; counter <= 1000; counter++) {
            expect(stringList.exists("Item" + counter.toString())).toBe(true);
        }
    });

    it("findFirst can find the first item based on a Predicate Condition", () => {
        expect(stringList.length()).toBe(1000);
        var foundItem: string = stringList.firstOrDefault(item => (item.length === 7));
        expect(foundItem).toBe("Item100");
    });

    it("where can find all the items based on a Predicate Condition", () => {
        expect(stringList.length()).toBe(1000);
        var foundItems: TS.System.Collections.List<string> = stringList.where(item => (item.length === 7));
        expect(foundItems.length()).toBe(900);

        for (let counter = 100; counter <= 900; counter++) {
            expect(foundItems.exists("Item" + counter.toString())).toBe(true);
        }

        for (let counter = 1; counter <= 99; counter++) {
            expect(foundItems.exists("Item" + counter.toString())).toBe(false);
        }

        expect(foundItems.exists("Item1000")).toBe(false);
    });

    it("forEach runs for every item in the list", () => {
        var newList: TS.System.Collections.List<string> = new TS.System.Collections.List<string>();
        expect(stringList.length()).toBe(1000);
        stringList.forEach((item, index) => newList.add(item + index.toString()));

        for (let counter = 1; counter <= 1000; counter++) {
            expect(stringList.exists("Item" + counter.toString())).toBe(true);
            expect(newList.exists("Item" + counter.toString() + (counter - 1).toString())).toBe(true);
        }
    });

    it("trueForAll returns true if all items match a Predicate Condition and false if it doesnt", () => {
        expect(stringList.length()).toBe(1000);
        expect(stringList.trueForAll(item => item.indexOf("Item") === 0)).toBe(true);
        expect(stringList.trueForAll(item => item.length === 5)).toBe(false);
    });

    it("select projects the source type to a destination type based on selector method", () => {
        expect(stringList.length()).toBe(1000);

        var anonymousTypeList = stringList.select(item => { return { itemname: item, length: item.length } });
        expect(anonymousTypeList.length()).toBe(stringList.length());

        anonymousTypeList.forEach((item, index) => {
            expect(item.itemname).toBe("Item" + (index + 1).toString());
            expect(item.length).toBe(("Item" + (index + 1).toString()).length);
        });
    });

    it("addRange can add an array of items to the list", () => {
        expect(stringList.length()).toBe(1000);
        var appendArray: string[] = [];
        for (let counter = 1001; counter <= 2000; counter++) {
            appendArray.push("Item" + counter.toString());
        }

        expect(stringList.addRange(appendArray)).toBe(2000);

        stringList.forEach((item, index) => {
            expect(item).toBe("Item" + (index + 1).toString());
        });
    });

    it("clears all items in the list", () => {
        expect(stringList.length()).toBe(1000);
        stringList.clear();
        expect(stringList.length()).toBe(0);
    });

    it("concat appends one list to the end of the other", () => {
        expect(stringList.length()).toBe(1000);
        var appendList: TS.System.Collections.List<string> = new TS.System.Collections.List<string>();
        for (let counter = 1001; counter <= 2000; counter++) {
            appendList.add("Item" + counter.toString());
        }

        expect(stringList.concat(appendList)).toBe(2000);

        stringList.forEach((item, index) => {
            expect(item).toBe("Item" + (index + 1).toString());
        });
    });

    it("remove all removes the items in the list with matching predicate", () => {
        expect(stringList.length()).toBe(1000);
        expect(stringList.exists("Item10")).toBe(true);
        expect(stringList.exists("Item99")).toBe(true);
        expect(stringList.removeAll(item => item.length === 6)).toBe(90);
        expect(stringList.trueForAll(item => item.length !== 6)).toBe(true);
        expect(stringList.exists("Item10")).toBe(false);
        expect(stringList.exists("Item99")).toBe(false);

    });
});