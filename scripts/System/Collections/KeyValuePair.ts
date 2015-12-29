module TS {
    export module System {
        export module Collections {
            export class KeyValuePair<TKey,TValue>  {
                private keyInternal: TKey;
                private valueInternal: TValue;

                constructor(key: TKey, value: TValue) {
                    this.keyInternal = key;
                    this.valueInternal = value;
                }

                get key(): TKey {
                    return this.keyInternal;
                }

                get value(): TValue {
                    return this.valueInternal;
                }
            }
        }
    }
}