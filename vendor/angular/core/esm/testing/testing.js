goog.module('_angular$core$testing$testing');
/**
 * Public Test Library for unit testing Angular2 Applications. Uses the
 * Jasmine framework.
 */
var test_injector_1 = goog.require('_angular$core$testing$test__injector');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var test_injector_2 = test_injector_1;
exports.inject = test_injector_2.inject;
exports.async = test_injector_2.async;
exports.injectAsync = test_injector_2.injectAsync;
var /** @type {?} */ _global = ((typeof window === 'undefined' ? global : window));
exports.expect = _global.expect;
/**
 * Run a function (with an optional asynchronous callback) after each test case.
 *
 * See http://jasmine.github.io/ for more details.
 *
 * ## Example:
 *
 * {@example testing/ts/testing.ts region='afterEach'}
 */
exports.afterEach = _global.afterEach;
/**
 * Group test cases together under a common description prefix.
 *
 * See http://jasmine.github.io/ for more details.
 *
 * ## Example:
 *
 * {@example testing/ts/testing.ts region='describeIt'}
 */
exports.describe = _global.describe;
/**
 * See {@link fdescribe}.
 */
exports.ddescribe = _global.fdescribe;
/**
 * Like {@link describe}, but instructs the test runner to only run
 * the test cases in this group. This is useful for debugging.
 *
 * See http://jasmine.github.io/ for more details.
 *
 * ## Example:
 *
 * {@example testing/ts/testing.ts region='fdescribe'}
 */
exports.fdescribe = _global.fdescribe;
/**
 * Like {@link describe}, but instructs the test runner to exclude
 * this group of test cases from execution. This is useful for
 * debugging, or for excluding broken tests until they can be fixed.
 *
 * See http://jasmine.github.io/ for more details.
 *
 * ## Example:
 *
 * {@example testing/ts/testing.ts region='xdescribe'}
 */
exports.xdescribe = _global.xdescribe;
var /** @type {?} */ jsmBeforeEach = _global.beforeEach;
var /** @type {?} */ jsmIt = _global.it;
var /** @type {?} */ jsmIIt = _global.fit;
var /** @type {?} */ jsmXIt = _global.xit;
var /** @type {?} */ testInjector = test_injector_1.getTestInjector();
// Reset the test providers before each test.
jsmBeforeEach(() => { testInjector.reset(); });
/**
 *  Allows overriding default providers of the test injector, which are defined in test_injector.js. * The given function must return a list of DI providers. * ## Example: * {@example testing/ts/testing.ts region='beforeEachProviders'}
 * @param {?} fn
 * @return {?}
 */
function beforeEachProviders(fn) {
    jsmBeforeEach(() => {
        var /** @type {?} */ providers = fn();
        if (!providers)
            return;
        try {
            testInjector.addProviders(providers);
        }
        catch (e) {
            throw new Error('beforeEachProviders was called after the injector had ' +
                'been used in a beforeEach or it block. This invalidates the ' +
                'test injector');
        }
    });
}
exports.beforeEachProviders = beforeEachProviders;
/**
 * @param {?} fn
 * @return {?}
 */
function _wrapTestFn(fn) {
    // Wraps a test or beforeEach function to handle synchronous and asynchronous execution.
    return (done) => {
        if (fn.length === 0) {
            let /** @type {?} */ retVal = fn();
            if (lang_1.isPromise(retVal)) {
                // Asynchronous test function - wait for completion.
                ((retVal)).then(done, done.fail);
            }
            else {
                // Synchronous test function - complete immediately.
                done();
            }
        }
        else {
            // Asynchronous test function that takes "done" as parameter.
            fn(done);
        }
    };
}
/**
 * @param {?} jsmFn
 * @param {?} name
 * @param {?} testFn
 * @param {?} testTimeOut
 * @return {?}
 */
function _it(jsmFn, name, testFn, testTimeOut) {
    jsmFn(name, _wrapTestFn(testFn), testTimeOut);
}
/**
 *  Wrapper around Jasmine beforeEach function. * beforeEach may be used with the `inject` function to fetch dependencies. * See http://jasmine.github.io/ for more details. * ## Example: * {@example testing/ts/testing.ts region='beforeEach'}
 * @param {?} fn
 * @return {?}
 */
function beforeEach(fn) {
    jsmBeforeEach(_wrapTestFn(fn));
}
exports.beforeEach = beforeEach;
/**
 *  Define a single test case with the given test name and execution function. * The test function can be either a synchronous function, the result of {@link async}, or an injected function created via {@link inject}. * Wrapper around Jasmine it function. See http://jasmine.github.io/ for more details. * ## Example: * {@example testing/ts/testing.ts region='describeIt'}
 * @param {?} name
 * @param {?} fn
 * @param {?=} timeOut
 * @return {?}
 */
function it(name, fn, timeOut = null) {
    return _it(jsmIt, name, fn, timeOut);
}
exports.it = it;
/**
 *  Like {@link it}, but instructs the test runner to exclude this test entirely. Useful for debugging or for excluding broken tests until they can be fixed. * Wrapper around Jasmine xit function. See http://jasmine.github.io/ for more details. * ## Example: * {@example testing/ts/testing.ts region='xit'}
 * @param {?} name
 * @param {?} fn
 * @param {?=} timeOut
 * @return {?}
 */
function xit(name, fn, timeOut = null) {
    return _it(jsmXIt, name, fn, timeOut);
}
exports.xit = xit;
/**
 *  See {@link fit}.
 * @param {?} name
 * @param {?} fn
 * @param {?=} timeOut
 * @return {?}
 */
function iit(name, fn, timeOut = null) {
    return _it(jsmIIt, name, fn, timeOut);
}
exports.iit = iit;
/**
 *  Like {@link it}, but instructs the test runner to only run this test. Useful for debugging. * Wrapper around Jasmine fit function. See http://jasmine.github.io/ for more details. * ## Example: * {@example testing/ts/testing.ts region='fit'}
 * @param {?} name
 * @param {?} fn
 * @param {?=} timeOut
 * @return {?}
 */
function fit(name, fn, timeOut = null) {
    return _it(jsmIIt, name, fn, timeOut);
}
exports.fit = fit;
//# sourceMappingURL=testing.js.map