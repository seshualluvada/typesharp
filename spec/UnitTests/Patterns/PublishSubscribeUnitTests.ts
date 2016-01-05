/// <reference path="../../../dev-build/scripts/typesharp.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />

describe("PublishSubscribe UnitTests", () => {

    var notificationCount = 0;
    var subscription: TS.Patterns.PublishSubscribe.ISubscription;

    function subscriptionCallbackHandler(data: any) {
        notificationCount++;
    }

    beforeEach(() => {
        
    });

    it("PublishSubscribe can add a subscription", () => {
        subscription = TS.Patterns.PublishSubscribe.subscribe("TestEvent", subscriptionCallbackHandler);
        expect(subscription).not.toBe(undefined);
    });

    it("PublishSubscribe can notify an event", () => {
        subscription = TS.Patterns.PublishSubscribe.subscribe("TestCase2Event", subscriptionCallbackHandler);
        var notificationCountBefore = notificationCount;
        TS.Patterns.PublishSubscribe.notify("TestCase2Event", "This is a Test Message");
        var notificationCountAfter = notificationCount;
        expect(notificationCountAfter - notificationCountBefore).toBe(1);
    });

    it("PublishSubscribe can notify multiple subscribers", () => {
        var subscription1 = TS.Patterns.PublishSubscribe.subscribe("TestCase3Event", subscriptionCallbackHandler);
        var subscription2 = TS.Patterns.PublishSubscribe.subscribe("TestCase3Event", subscriptionCallbackHandler);
        var notificationCountBefore = notificationCount;
        TS.Patterns.PublishSubscribe.notify("TestCase3Event", "This is a Test Message");
        var notificationCountAfter = notificationCount;
        expect(notificationCountAfter - notificationCountBefore).toBe(3);
    });

});