
/**
 * tryTuple 函数
 *
 * @export
 * @param {Function} fn
 * @returns {[Error,any]}
 */
export function tryTuple(fn) {
    try {
        return [null, fn()];
    }
    catch (ex) {
        return [ex, fn];
    }
}

/**
 * 获取数据类型
 *
 * @export
 * @param {*} sender 要判断的数据
 * @returns {string}
 */
export function type(sender) {
    return Object.prototype.toString.call(sender).toLowerCase().match(/\s(\S+?)\]/)[1];
}
