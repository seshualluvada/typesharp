/// <reference path="../../../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />

describe("Dictionary Unit Tests ::", () => {
    var dictionary: TS.System.Collections.Dictionary<string, string>;

    beforeEach(() => {
        dictionary = new TS.System.Collections.Dictionary<string, string>();

        for (let counter = 1; counter <= 1000; counter++) {
            dictionary.add("Key" + counter.toString(), "Value" + counter.toString());
        }

    });

    it("Add method adds a dictionary item", () => {
        expect(dictionary.toList().length()).toBe(1000);
        var counter = 1001;
        dictionary.add("Key" + counter.toString(), "Value" + counter.toString());
        expect(dictionary.toList().length()).toBe(1001);
        expect(dictionary.containsKey("Key" + counter.toString())).toBe(true);
        expect(dictionary.getValue("Key" + counter.toString())).toBe("Value" + counter.toString());
    });

    it("Remove method removes a dictionary item", () => {
        expect(dictionary.toList().length()).toBe(1000);
        expect(dictionary.containsKey("Key500")).toBe(true);
        expect(dictionary.remove("Key500")).toBe(999);
        expect(dictionary.containsKey("Key500")).toBe(false);
        expect(dictionary.toList().length()).toBe(999);
    });
});