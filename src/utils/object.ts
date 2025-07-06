/**
 * Deep clone an object
 * Note: This is a simple implementation that works for plain objects and arrays
 * It doesn't handle special cases like Dates, RegExp, Maps, Sets, etc.
 */
export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    const clonedArr: any[] = [];
    for (let i = 0; i < obj.length; i++) {
      clonedArr[i] = cloneDeep(obj[i]);
    }
    return clonedArr as T;
  }

  if (obj instanceof Object) {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = cloneDeep(obj[key]);
      }
    }
    return clonedObj as T;
  }

  return obj;
}

/**
 * Check if two values are deeply equal
 */
export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b;
  }
  
  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }
  
  if (a.prototype !== b.prototype) return false;
  
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  
  return keys.every(k => isEqual(a[k], b[k]));
}