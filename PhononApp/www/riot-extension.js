(function (riot) {
    var compileAsyncSingle = function (url) {
        return new Promise(function (resolve, reject) {
            riot.compile(url, function () {
                resolve();
            });
        });
    };
    var compileAsyncArray = function (array) {
        var promises = [];
        var len = array.length;
        for (var i = 0; i < len; i++) {
            promises.push(compileAsyncSingle(array[i]));
        }
        return Promise.all(promises);
    }
    var compileAsync = function (arg) {
        if (Array.isArray(arg)) {
            return compileAsyncArray(arg);
        } else if (typeof arg === "string") {
            return compileAsyncSingle(arg);
        } else {
            return Promise.reject();
        }
    }
    riot.compileAsync = compileAsync;
})(riot || (riot = {}));
