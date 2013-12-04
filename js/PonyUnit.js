function Failed(message) {
    this.name = "Failed";
    this.message = message || "Default Message";
}
Failed.prototype = new Error();
Failed.prototype.constructor = Failed;

/*
 * Du test au vrai goût de poney !
 */
var PonyUnit = (function () {
    var pony = this;

    pony.oneTestHasFailed = false;
    pony.describes = {};
    pony.errors= [];
    pony.testPassed = {};

    this.run = function(){
        pony.oneTestHasFailed = false;
        for (var description in pony.describes){
            //TODO : Complete error and fail messages with description
            pony.describes[description]();
        }
        return pony;
    };

    window.describe = function (description, describeFunc){
        describes[description] = describeFunc;
    };

    window.it = function (description, testFunc){
        try {
            testFunc();
            testPassed[description] = "Ok!";
        } catch (e) {
            if (e instanceof Failed) {
                errors.push(e.message);
                pony.oneTestHasFailed = true;
            } else {
                errors.push("Error :" + e.message);
            }
        }
    };

    window.ok = function (testResult, msg) {
        if (!testResult) {
            throw new Failed(msg)
        }
    };

    window.fail = function (msg) {
        ok(false, msg)
    };

    window.equal = function (a, b, msg) {
        ok(a === b, msg);
    };

    return {
        // some public methods ...
        run:run
    };
})();