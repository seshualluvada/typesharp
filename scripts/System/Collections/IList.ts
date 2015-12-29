module TS {
    export module System {
        export module Collections {
            export interface IList<T> extends ICollection<T> {
                addRange(itemArray: T[]): number;
                concat(anotherList: IList<T>): number;
                toArray(): Array<T>;
                length(): number;
                forEach(action: (item: T, index?: number) => void): void;
                sort(comparer?: IComparer<T>): void;
            }
        }
    }
}