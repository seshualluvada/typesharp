/// <reference path="../../../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />

describe("KeyValuePair Unit Tests ::", () => {
    it("Constructor creates a keyvaluepair", () => {
        var keyvaluepair = new TS.System.Collections.KeyValuePair<string, string>("TestKey", "TestValue");
        expect(keyvaluepair.key).toBe("TestKey");
        expect(keyvaluepair.value).toBe("TestValue");
    });
});   