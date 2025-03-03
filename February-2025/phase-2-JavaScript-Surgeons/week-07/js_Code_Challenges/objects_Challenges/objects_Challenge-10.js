// You just need to implement the getNestedValue function
function getNestedValue(obj, keyPath) {
    // Return the value from the nested object based on keyPath
    let keys = keyPath.split("."); // Split keyPath into an array of keys
    let value = obj;

    for (let key of keys) {
        if (value && typeof value === "object" && key in value) {
            value = value[key]
        }
        else {
            return "Key not found"
        }
    }
    return value;
}