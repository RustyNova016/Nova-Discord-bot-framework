/** Return True if the variable is not undefined
 *
 * @param variable
 * @returns {boolean}
 */
export function isset(variable: any): boolean {
    return (typeof variable !== "undefined");
}

/** Return if an array is empty
 *
 * @param {any[]} array
 * @returns {boolean}
 */
export function emptyArray(array: any[]) {
    return array.length == 0;
}