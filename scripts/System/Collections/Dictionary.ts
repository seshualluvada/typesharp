/// <reference path="./KeyValuePair" />
/// <reference path="./List" />

module TS {
    export module System {
        export module Collections {
            export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue>  {

                private keyValuePairCollection: List<KeyValuePair<TKey, TValue>>;

                constructor() {
                    this.keyValuePairCollection = new List<KeyValuePair<TKey, TValue>>();
                }

                /**
                 * returns a collection of the keys in the dictionary.
                 * @returns ICollection<TKey>
                 */
                keys(): IList<TKey> {
                     return this.keyValuePairCollection.select(item=> item.key);
                }

                /**
                 * returns a collection of the values in the dictionary.
                 * @returns ICollection<TValue>
                 */
                values(): IList<TValue> {
                     return this.keyValuePairCollection.select(item=> item.value);
                }

                /**
                 * check whether a key is present already in the dictionary or not
                 * @param key
                 * @returns boolean
                 */
                containsKey(key: TKey): boolean {
                     return this.keyValuePairCollection.trueForAny(item => item.key === key);
                }

                /**
                 * adds a keyvaluepair to the dictionary
                 * @param keyvaluepair
                 * @returns number of items in the dictionary after adding
                 */
                add(key: TKey, value: TValue): number {
                    if (this.keyValuePairCollection.trueForAny(item=> item.key === key)) {
                        throw new Error("Dictionary already contains an item with the key : " + key.toString());
                    } else {
                        return this.keyValuePairCollection.add(new KeyValuePair(key, value));
                    }
                }

                /**
                 * removes an item from the dictionary based on matching key
                 * @param keyvaluepair
                 * @returns number of items in the dictionary after removing the keyvaluepair
                 */
                remove(key: TKey): number {
                    this.keyValuePairCollection.removeAll(item => (item.key === key));
                    return this.keyValuePairCollection.length();
                }

                /**
                 * gets the value in the dictionary based on a matching key
                 * @param key
                 * @returns TValue
                 */
                getValue(key: TKey): TValue {
                    if (this.containsKey(key)) {
                        return this.keyValuePairCollection.single(item => item.key === key).value;
                    } else {
                        return null;
                    }
                }

                /**
                 * clear the items in the dictionary
                 */
                clear() {
                     this.keyValuePairCollection.clear();
                }

                /**
                 * converts the dictionary to a list of keyvaluepairs
                 */
                toList(): IList<KeyValuePair<TKey, TValue>> { return this.keyValuePairCollection; }

                /**
                 * converts the dictionary to a queryable collection of keyvaluepairs
                 */
                asQueryable(): IQueryable<KeyValuePair<TKey, TValue>> { return this.keyValuePairCollection; }
            }
        }
    }
}