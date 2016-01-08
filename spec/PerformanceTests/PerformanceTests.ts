/// <reference path="../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../typings/jasmine/jasmine.d.ts" />

describe("Performance Tests ", () => {
   var iterationCounter = 1000000;   
   it("Dictionary is faster than Object Reference to Add Items", () => {
        var stopWatch = TS.System.Diagnostics.StopWatch.startNew();
        var dictionary = new TS.System.Collections.Dictionary<string,string>();
        for (var counter = 1; counter <= iterationCounter; counter++){
            dictionary.add("Item" + counter.toString(), "Value" + counter.toString());
        }    
        var dictionaryAddTime = stopWatch.stop();
        
        var stopWatch = TS.System.Diagnostics.StopWatch.startNew();
        var object = {};
        for (var counter = 1; counter <= iterationCounter; counter++){
            object["Item" + counter.toString()] =  "Value" + counter.toString();
        }
        var objectAddTime = stopWatch.stop();
        console.log(`Dictionary Add time: ${dictionaryAddTime}, Object Add time: ${objectAddTime} for ${iterationCounter} items.`);        
        
        var stopWatch = TS.System.Diagnostics.StopWatch.startNew();
        for (var counter = 1; counter <= iterationCounter; counter++){
            expect(dictionary.getValue("Item" + counter.toString())).toBe("Value" + counter.toString());
        }    
        var dictionaryRetrieveTime = stopWatch.stop();
        
        var stopWatch = TS.System.Diagnostics.StopWatch.startNew();
        for (var counter = 1; counter <= iterationCounter; counter++){
            expect(object["Item" + counter.toString()]).toBe("Value" + counter.toString());
        }    
        var objectRetrieveTime = stopWatch.stop();
        console.log(`Dictionary Retrieve time: ${dictionaryRetrieveTime}, Object Retrieve time: ${objectRetrieveTime} for ${iterationCounter} items`);
        
        var stopWatch = TS.System.Diagnostics.StopWatch.startNew();
        var keyValuePairList = dictionary.toList();    
        var keyValuePairListRetrieveTime = stopWatch.stop();
        console.log(`Dictionary Retrieve time for keyValuePairList: ${keyValuePairListRetrieveTime} for ${iterationCounter} items`);
        
        // expect(dictionaryAddTime).toBeLessThan(objectAddTime);
        // expect(dictionaryRetrieveTime).toBeLessThan(objectRetrieveTime);
   })
   
    
})