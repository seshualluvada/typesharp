/// <reference path="../../../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />

describe("Dictionary Unit Tests ", () => {
    var dictionary: TS.System.Collections.Dictionary<string, string>;

    beforeEach(() => {
        dictionary = new TS.System.Collections.Dictionary<string, string>();

        for (let counter = 1; counter <= 10; counter++) {
            dictionary.add("Key" + counter.toString(), "Value" + counter.toString());
        }

    });

    it("Add method adds a dictionary item", () => {
        expect(dictionary.toList().length()).toBe(10);
        var counter = 11;
        dictionary.add("Key" + counter.toString(), "Value" + counter.toString());
        expect(dictionary.toList().length()).toBe(11);
        expect(dictionary.containsKey("Key" + counter.toString())).toBe(true);
        expect(dictionary.getValue("Key" + counter.toString())).toBe("Value" + counter.toString());
    });

    it("Remove method removes a dictionary item", () => {
        expect(dictionary.toList().length()).toBe(10);
        expect(dictionary.containsKey("Key5")).toBe(true);
        expect(dictionary.remove("Key5")).toBe(9);
        expect(dictionary.containsKey("Key5")).toBe(false);
        expect(dictionary.toList().length()).toBe(9);
    });
});