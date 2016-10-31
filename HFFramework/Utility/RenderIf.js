/**
 * Created by shange on 16/8/12.
 *
 * 通过条件判断是否加载
 */

'use strict';
const isFunction = input => typeof input === 'function';
export default predicate => elemOrThunk =>
    predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;