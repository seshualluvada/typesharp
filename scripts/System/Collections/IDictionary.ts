module TS {
    export module System {
        export module Collections {
            export interface IDictionary<TKey, TValue> {
                keys(): IList<TKey>;
                values(): IList<TValue>;
                containsKey(key: TKey): boolean;
                add(key: TKey, value: TValue): number;
                remove(key: TKey): number;
                getValue(key:TKey): TValue;
            }
        }
    }
}