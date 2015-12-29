module TS {
    export module Patterns {
        export module PublishSubscribe {
            /**
             * ISubscription is returned when a subscriber subscribes to an event. This object can be used to pause and resume notifications
             *  or to cancel the subscription altogether.
             */
            export interface ISubscription {
                pauseNotifications(holdMissedNotifications: boolean): void;
                resumeNotifications(dispatchMissedNotifications: boolean): void;
                cancelSubscription(): void;   
            }
        }
    }
}