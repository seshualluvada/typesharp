module TS {
    export module System {
        export module Collections {
            export interface IQueryable<T> {
                firstOrDefault(predicate: (item: T) => boolean): T;
                removeAll(predicate: (item: T) => boolean): number;
                where(predicate: (item: T) => boolean): IList<T>;
                countAll(predicate: (item: T) => boolean): number;
                trueForAny(predicate: (item: T) => boolean): boolean;
                trueForAll(predicate: (item: T) => boolean): boolean;
                select<TOut>(selector: (item: T) => TOut): IList<TOut>;
                selectMany<TOut>(selector: (item: T) => IList<TOut>): IList<TOut>;
                sum(selector: (item: T) => number): number;
                single(predicate: (item: T) => boolean): T;
                singleOrNull(predicate: (item: T) => boolean): T;
            }
        }
    }
}