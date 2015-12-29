# [TypeSharp] (https://github.com/seshualluvada/typesharp) 
(https://travis-ci.org/seshualluvada/typesharp.svg?branch=master)

This project implements .Net Framework C# types in typescript for a smooth transition from C# developer to typescript developer. Typescript provides a great entry point for developers with prior working knowledge of OOP concepts and not much experience working with core javascript, and this project leverages that opportunity to build types known to .net developers in typescript so that they can use a similar OOP mindset to write typescript code that finally runs in the browsers as javascript.

## Current Features
The project currently implements the following

### Types
##### 1. List&lt;T&gt; 
The generic List&lt;T&gt; stores a list of items of a predefined type and supports the full suite of LINQ extension methods i.e. projection, filtering using lambda expressions for selection and filtering.

###### Example
```typescript
it("where can find all the items based on a Predicate Condition", () => {
        var stringList = new TS.System.Collections.List<string>();
        for (let counter = 1; counter <= 1000; counter++) { 
            stringList.add("Item" + counter.toString());  
        }
        expect(stringList.length()).toBe(1000);
        //using LINQ style where clause with a lambda expression
        var foundItems: TS.System.Collections.List<string> = stringList.where(item => (item.length === 7));
        expect(foundItems.length()).toBe(900);
        expect(foundItems.exists("Item1000")).toBe(false);
    });
```

##### 2. Dictionary&lt;TKey, TValue&gt;
The generic Dictionary&lt;TKey, TValue&gt; stores a list of key value pairs, and supports the .net framework methods to getkeys, getvalues, containskey etc. 

To do items: 
* Hashing keys in the dictionary and storing it in a hashtable.
* Implement seperate chaining collision handling strategy

### Design Patterns
##### 1.  Publish Subscribe Pattern 
Implements the Publish Subscribe Event Notification Pattern with support for subscribers to pause nofications, hold missed notifications and resume notifications for better performance e.g. Subscribers responsible for updating the UI of a page pause notifications once that UI element goes out of view of the user and resume it back, once it comes with in the user's view.

### .net Framework Namespacing
The types are namespaced to match that of .net framework for easily locating the desired types from the TypeSharp library. e.g. collection types are placed in TS.System.Collection namespace.



