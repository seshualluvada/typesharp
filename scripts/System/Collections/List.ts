module TS {
    export module System {
        export module Collections {
            /**
             * List<T> is a .net Framework style type safe implementation of several List functionalities in TypeScript.
             */
            export class List<T> implements IList<T>, IQueryable<T>, ICollection<T> {
                private listInternal: Array<T>;

                constructor() {
                    this.listInternal = new Array<T>();
                }
    
                /**
                 * add an item to the list
                 * @param {T} item 
                 * @returns {number} number of items in the list after adding the item 
                 */
                add(item: T): number {
                    return this.listInternal.push(item);

                }

                /**
                 * add a range of items
                 * @param inpArray 
                 * @returns {} 
                 */
                addRange(inpArray: T[]): number {
                    this.listInternal = this.listInternal.concat(inpArray);
                    return this.listInternal.length;
                }

                /**
                 * clear all the items in the list
                 * @returns {} 
                 */
                clear(): void {
                    this.listInternal = new Array<T>();
                }

                /**
                 * concatenate another list to this list
                 * @param anotherList 
                 * @returns {} 
                 */
                concat(anotherList: List<T>): number {
                    this.listInternal = this.listInternal.concat(anotherList.toArray());
                    return this.listInternal.length;
                };

                /**
                 * convert the list to an array
                 * @returns {} 
                 */
                toArray(): Array<T> {
                    return this.listInternal;
                }

                /**
                 * remove the item from the list
                 * @param item 
                 * @returns {} 
                 */
                remove(item: T): number {
                    var itemRemoveIndex = -1;
                    itemRemoveIndex = this.listInternal.indexOf(item);
                    if (itemRemoveIndex === 0) {
                        this.listInternal = this.listInternal.slice(itemRemoveIndex + 1);
                    } else if (itemRemoveIndex === this.listInternal.length - 1) {
                        this.listInternal = this.listInternal.slice(0, itemRemoveIndex);
                    } else {
                        this.listInternal = this.listInternal.slice(0, itemRemoveIndex).concat(this.listInternal.slice(itemRemoveIndex + 1));
                    }

                    return this.listInternal.length;
                }

                /**
                 * remove all items from the list that match a predicate condition and return the number of items removed.
                 * @param predicate 
                 * @returns the number of items removed from the list
                 */
                removeAll(predicate: (item: T) => boolean): number {
                    var removedItemCount: number = 0;
                    var foundItem: T = this.firstOrDefault(predicate);
                    while (foundItem !== undefined) {
                        this.remove(foundItem);
                        removedItemCount++;
                        foundItem = this.firstOrDefault(predicate);
                    }
                    return removedItemCount;
                }

                /**
                 * get the length of the list
                 * @returns {} 
                 */
                length(): number {
                    return this.listInternal.length;
                }

                /**
                 * verify whether a specific item exists in the list
                 * @param item 
                 * @returns {} 
                 */
                exists(item: T): boolean {
                    var itemIndex: number = -1;
                    itemIndex = this.listInternal.indexOf(item);
                    if (itemIndex > -1) return true;
                    return false;
                }

                /**
                 * find the first item in the list based on the predicate condition
                 * @param predicate 
                 * @returns {} 
                 */
                firstOrDefault(predicate: (item: T) => boolean): T {
                    var counter: number = 0;
                    while (counter < this.listInternal.length) {
                        if (predicate(this.listInternal[counter])) {
                            return this.listInternal[counter];
                        }
                        counter++;
                    }
                    return undefined;
                }

                /**
                 * filter the list of items based on a predicate condition
                 * @param predicate 
                 * @returns {} 
                 */
                where(predicate: (item: T) => boolean): List<T> {
                    var foundItems = new List<T>();
                    for (let counter = 0; counter < this.listInternal.length; counter++) {
                        if (predicate(this.listInternal[counter])) foundItems.add(this.listInternal[counter]);
                    }
                    return foundItems;
                }

                /**
                 * count all the items in the list that match a predicate condition
                 * @param predicate 
                 * @returns {} 
                 */
                countAll(predicate: (item: T) => boolean): number {
                    var itemsFound: number = 0;
                    for (let counter = 0; counter < this.listInternal.length; counter++) {
                        if (predicate(this.listInternal[counter])) itemsFound++;
                    }
                    return itemsFound;
                }

                /**
                 * execute a piece of code for each of the items in the list
                 * @param action 
                 * @returns {} 
                 */
                forEach(action: (item: T, index?: number) => void): void {
                    for (let counter = 0; counter < this.listInternal.length; counter++) {
                        action(this.listInternal[counter], counter);
                    }
                }

                /**
                 * verify whether the predicate condition is true for *any* of the items in the list
                 * @param predicate 
                 * @returns {} 
                 */
                trueForAny(predicate: (item: T) => boolean): boolean {
                    var counter: number = 0;
                    while (counter < this.listInternal.length) {
                        if (predicate(this.listInternal[counter])) {
                            return true;
                        }
                        counter++;
                    }
                    return false;
                }

                /**
                 * verify whether the predicate condition is true for *all* of the items in the list
                 * @param predicate 
                 * @returns {} 
                 */
                trueForAll(predicate: (item: T) => boolean): boolean {
                    var canContinue: boolean = true;
                    var counter: number = 0;
                    while (canContinue && counter < this.listInternal.length) {
                        canContinue = canContinue && predicate(this.listInternal[counter]);
                        counter++;
                    }
                    return canContinue;
                }

                /**
                 * sort the items in the list using the provided comparer
                 * @param comparer 
                 * @returns {} 
                 */
                sort(comparer?: IComparer<T>): void {
                    if (comparer === undefined || comparer === null) {
                        this.listInternal.sort();
                    } else
                    {
                        this.listInternal.sort(comparer.compareItems);
                    }
                }

                /**
                 * project the list of items to a different type based on the selector function
                 * @param selector 
                 * @returns List<TOut> 
                 */
                select<TOut>(selector: (item: T) => TOut): List<TOut> {
                    var outputList: List<TOut> = new List<TOut>();
                    this.forEach(item => outputList.add(selector(item)));
                    return outputList;
                }

                /**
                 * flatten the list of items into a single list if every item in the list inturn has a list of items of another type
                 * @param selector 
                 * @returns {} 
                 */
                selectMany<TOut>(selector: (item: T) => List<TOut>): List<TOut> {
                    var outputList: List<TOut> = new List<TOut>();
                    this.forEach(item => selector(item).forEach(itemChild => outputList.add(itemChild)));
                    return outputList;
                }

                /**
                 * calculate the sum of numbers based on projection from the list items
                 * @param selector 
                 * @returns {} 
                 */
                sum(selector: (item: T) => number): number {
                    var total: number = 0;
                    this.forEach(item => total += selector(item));
                    return total;
                }

                /**
                 * verify that there is only one item matching the predicate condition and return that item
                 * throws an exception if there are multiple items in the list matching the predicate condtition
                 * @param predicate 
                 * @returns {} 
                 */
                single(predicate: (item: T) => boolean): T {
                    var itemsFound: number = this.countAll(predicate);
                    if (itemsFound < 1) throw "No Elements selected based on the predicate criteria";
                    if (itemsFound > 1) throw "Multiple Elements found based on the predicate criteria";
                    return this.firstOrDefault(predicate);
                }

                /**
                 * verify that there is one or no items matching the predicate. returns null if there are no matches and returns the item if there is one match
                 * @param predicate 
                 * @returns {} 
                 */
                singleOrNull(predicate: (item: T) => boolean): T {
                    var itemsFound: number = this.countAll(predicate);
                    if (itemsFound < 1) return null;
                    if (itemsFound > 1) throw "Multiple Elements found based on the predicate criteria";
                    return this.firstOrDefault(predicate);
                }

            }
        }
    }
}