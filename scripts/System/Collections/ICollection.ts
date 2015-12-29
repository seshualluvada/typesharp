module TS {
    export module System {
        export module Collections {
            export interface ICollection<T> {
                add(item: T): number;
                clear(): void;
                remove(item: T): number;
                exists(item: T): boolean;
            }
        }
    }
}