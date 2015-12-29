module TS {
    export module System {
        export module Collections {
            export enum Comparison {
                GreaterThan = 1, EqualTo = 0, LesserThan = -1
            }
            export interface IComparer<T> {
                compareItems(item1: T, item2: T): Comparison
            }
        }
    }
}