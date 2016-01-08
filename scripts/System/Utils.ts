module TS {
    export module System {
        export class Utils {
            public static serialize(obj: any): string {
                if ((obj === undefined) || (obj === null) || (typeof obj === "function")) {
                    return "";
                } else {
                    var stringParam = obj.toString();
                    var serializedParam: string;
                    if ((stringParam.length > 7) && (stringParam.substr(1, 7) == "object")) {
                        serializedParam = "{";
                        let first = true;
                        for (const prop in obj) {
                            if (obj.hasOwnProperty(prop)) {
                                if (first) {
                                    first = false;
                                } else {
                                    serializedParam += ",";
                                }
                                serializedParam += (prop + ":" + obj[prop]);
                            }
                        }
                    } else {
                        serializedParam = stringParam;
                    }
                }
                return serializedParam + "}";
            }
            
            public static ExtractKeys(obj: any): Array<string>{
                if ((obj === undefined) || (obj === null) || (typeof obj === "function")) {
                    return new Array<string>();
                } else {
                    var returnArray = new Array<string>();
                    for (const prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            returnArray.push(prop);
                        }
                    }
                    return returnArray
                    
                }
            }
            
            
        }
    }
}






