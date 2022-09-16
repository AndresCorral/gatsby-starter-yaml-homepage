/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function createHashMap(key: string, value: any, object: any[]): {[key: string]: any } {
  return object.reduce((map, element) => ({
    ...map,
    [element[key]]: element[value] || value,
  }), {});
}

export function createObjectHashMap<T>(key: string, object: T[]): {[key: string]: T } {
  return object.reduce((map, element) => ({
    ...map,
    [element[key as keyof T] as unknown as string]: element,
  }), {});
}

export function prefixKeys(prefix: string, object: any): {[key: string]: any } {
  return Object.keys(object).reduce((map, key) => ({ ...map, [`${prefix}.${key}`]: object[key] }), {});
}

export function stringifyObject(object: any): {[key: string]: string } {
  return Object.keys(object).reduce((map, key) => ({ ...map, [`${key}`]: `${object[key]}` }), {});
}

export function stateReducer<T>(state: T, actions: Partial<T>) : T {
  let modified = false;

  const keys = Object.keys(actions);

  if (!keys.length) return actions as T;

  const currentState = { ...state };

  keys.forEach((key) => {
    const k = key as keyof T;

    if (state[k] !== actions[k]) {
      modified = true;
      currentState[k] = (actions as T)[k];
    }
  });

  return modified ? currentState : state;
}
