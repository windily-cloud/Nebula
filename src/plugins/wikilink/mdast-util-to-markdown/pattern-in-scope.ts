
/**
 * @param {Array<ConstructName>} stack
 * @param {Unsafe} pattern
 * @returns {boolean}
 */
function patternInScope(stack: any, pattern: any): boolean {
    return (
        listInScope(stack, pattern.inConstruct, true) &&
        !listInScope(stack, pattern.notInConstruct, false)
    )
}

/**
 * @param {Array<ConstructName>} stack
 * @param {Unsafe['inConstruct']} list
 * @param {boolean} none
 * @returns {boolean}
 */
function listInScope(stack: any, list: any, none: boolean): boolean {
    if (typeof list === 'string') {
        list = [list]
    }

    if (!list || list.length === 0) {
        return none
    }

    let index = -1

    while (++index < list.length) {
        if (stack.includes(list[index])) {
            return true
        }
    }

    return false
}

export { patternInScope }