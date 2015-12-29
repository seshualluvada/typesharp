/// <reference path="../../System/Collections/List" />
/// <reference path="../../System/Collections/Dictionary" />

module TS {
    export module Patterns {
        /**
         * PublishSubscribe is an implementation of the publisher subscriber pattern where disconnected subscribers can subscribe for 
         *  specific events along with a callback handler and publishers can notify when any event occurs there by invoking the callbacks,
         *  for the subscribers.
         */
        export module PublishSubscribe {
            import Collections = TS.System.Collections;
            var subscriptions: Collections.Dictionary<string, Collections.List<Subscription>> = new Collections.Dictionary<string, Collections.List<Subscription>>();
            var subscriptionCounter: number = 0;

            class Subscription implements ISubscription {

                private subscriptionId: number;
                private subscriptionCallback: (...params:any[]) => void;
                private isSubscriberActive: boolean;
                private holdMessagesWhileInactive: boolean;
                private heldMessages: System.Collections.List<Array<any>>;

                constructor(subscriptionId: number, subscriptionCallback: (...params:any[]) => void) {
                    this.subscriptionId = subscriptionId;
                    this.subscriptionCallback = subscriptionCallback;
                    this.isSubscriberActive = true;
                }

                pauseNotifications(holdMissedNotifications: boolean): void {
                    this.holdMessagesWhileInactive = holdMissedNotifications;
                    this.isSubscriberActive = false;
                }

                resumeNotifications(dispatchMissedNotifications: boolean): void {
                    if (dispatchMissedNotifications) {
                        this.heldMessages.forEach(item=> this.subscriptionCallback(item));
                    }
                    this.heldMessages = new System.Collections.List<Array<any>>();
                    this.isSubscriberActive = true;
                }

                cancelSubscription(): void {
                    subscriptions.toList().forEach(item=>item.value.removeAll(sub=>sub.subscriptionId === this.subscriptionId));
                }

                get callback(): (...params:any[]) => void {
                    return this.subscriptionCallback;
                }

                get isActive(): boolean {
                    return this.isSubscriberActive;
                }

                addHeldMessage(...params:any[]): void {
                    if (this.holdMessagesWhileInactive) {
                        this.heldMessages.add(params);
                    }
                }
            }

            /**
             * Subscribe to an event by passing the event name and callback handler.
             * @param eventName
             * @param callback
             * @returns ISubscription
             */
            export function subscribe(eventName: string, callback: (...params:any[]) => void): ISubscription {
                var sub = new Subscription(++subscriptionCounter, callback);
                if (!subscriptions.containsKey(eventName)) {
                    var sublist = new System.Collections.List<Subscription>();
                    sublist.add(sub);
                    subscriptions.add(eventName, sublist);
                } else {
                    subscriptions.getValue(eventName).add(sub);
                }
                return sub;
            }

            /**
             * Publish the occurence of an event to all the subscribers who have subscribed to the event.
             * @param eventName
             * @param params
             */
            export function notify(eventName: string, ...params:any[]): void {
                if (subscriptions.containsKey(eventName)) {
                    subscriptions.getValue(eventName).forEach(item => {
                        if (item.isActive) {
                            item.callback(params);
                        } else {
                            item.addHeldMessage(params);
                        }
                    });
                }
            }
        }
    }
}