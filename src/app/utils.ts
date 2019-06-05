export function isPlainObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export function hasChanges(source: any, target: any) {
    const keys = Object.keys(source);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const s = source[key];
        const t = target[key];
        if (isPlainObject(s)) {
            return hasChanges(s, t);
        }
        if (!s && !t) {
            // undefined, null and empty
        } else if (s !== t) {
            return true;
        }
    }
    return false;
}
