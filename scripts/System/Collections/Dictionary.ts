/// <reference path="./KeyValuePair" />
/// <reference path="./List" />
/// <reference path="../Utils" />


module TS {
    export module System {
        export module Collections {
            export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue>  {

                private keyValuePairCollection: {
                    [id: string] : KeyValuePair<TKey,TValue>
                };
                private itemsCount: number = 0;
                
                constructor() {
                    this.keyValuePairCollection = {};
                }

                /**
                 * returns a list of the keys in the dictionary.
                 * @returns IList<TKey>
                 */
                keys(): IList<TKey> {
                    var keyList = new List<TKey>();
                    for (var prop in this.keyValuePairCollection){
                        if (this.keyValuePairCollection.hasOwnProperty(prop)){
                            var retrievedKeyValuePair = this.keyValuePairCollection[prop];
                            if (!((retrievedKeyValuePair == null) || (retrievedKeyValuePair == undefined))){
                                keyList.add(retrievedKeyValuePair.key);
                            } 
                            
                        }
                    }
                    return keyList;
                }

                /**
                 * returns a collection of the values in the dictionary.
                 * @returns ICollection<TValue>
                 */
                values(): IList<TValue> {
                    var valueList = new List<TValue>();
                    for (var prop in this.keyValuePairCollection){
                        if (this.keyValuePairCollection.hasOwnProperty(prop)){
                            var retrievedKeyValuePair = this.keyValuePairCollection[prop];
                            if (!((retrievedKeyValuePair == null) || (retrievedKeyValuePair == undefined))){
                                valueList.add(retrievedKeyValuePair.value);
                            } 
                        }
                    }
                    return valueList;
                }

                /**
                 * check whether a key is present already in the dictionary or not
                 * @param key
                 * @returns boolean
                 */
                containsKey(key: TKey): boolean {
                    var currentValue = this.keyValuePairCollection[Utils.serialize(key)];
                     
                    if (!((currentValue == undefined) || (currentValue == null))) {
                        return true;
                    } else{
                        return false;
                    }
                }

                /**
                 * adds a keyvaluepair to the dictionary
                 * @param keyvaluepair
                 * @returns number of items in the dictionary after adding
                 */
                add(key: TKey, value: TValue): number {
                    if (this.containsKey(key)){
                        throw new Error("Dictionary already contains an item with the key : " + Utils.serialize(key));
                    } else {
                        this.itemsCount++;
                        this.keyValuePairCollection[Utils.serialize(key)] = new KeyValuePair(key, value);
                    }
                    
                    return this.itemsCount;
                }

                /**
                 * removes an item from the dictionary based on matching key
                 * @param keyvaluepair
                 * @returns number of items in the dictionary after removing the keyvaluepair
                 */
                remove(key: TKey): number {
                    if (this.containsKey(key)){
                        this.keyValuePairCollection[Utils.serialize(key)] = undefined;
                        this.itemsCount--;
                    } 
                    return this.itemsCount;
                }

                /**
                 * gets the value in the dictionary based on a matching key
                 * @param key
                 * @returns TValue
                 */
                getValue(key: TKey): TValue {
                    if (this.containsKey(key)){
                        return this.keyValuePairCollection[Utils.serialize(key)].value;    
                    } else {
                        return null;
                    }
                }

                /**
                 * clear the items in the dictionary
                 */
                clear() {
                    this.keyValuePairCollection = {};
                    this.itemsCount = 0;
                }

                /**
                 * converts the dictionary to a list of keyvaluepairs
                 */
                toList(): IList<KeyValuePair<TKey, TValue>> {
                    var keyvaluepairList = new List<KeyValuePair<TKey,TValue>>();                   
                    for (var prop in this.keyValuePairCollection){
                        if (this.keyValuePairCollection.hasOwnProperty(prop)){
                            var retrievedKeyValuePair = this.keyValuePairCollection[prop];
                            if (!((retrievedKeyValuePair == null) || (retrievedKeyValuePair == undefined))){
                                keyvaluepairList.add(retrievedKeyValuePair);
                            } 
                        }
                    }                    
                    return keyvaluepairList; 
                }

                /**
                 * converts the dictionary to a queryable collection of keyvaluepairs
                 */
                asQueryable(): IQueryable<KeyValuePair<TKey, TValue>> { 
                    return <List<KeyValuePair<TKey,TValue>>>this.toList(); 
                }
            }
        }
    }
}