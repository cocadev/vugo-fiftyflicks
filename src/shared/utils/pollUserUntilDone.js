// create a promise that resolves after a short delay
function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}

// interval is how often to poll
// timeout is how long to poll waiting for a result (0 means try forever)
// url is the URL to request
export function pollUserUntilDone(pr_callback, interval, timeout) {
    let start = Date.now();
    function run() {
        return pr_callback().then(function (res) {
            if (res.data.userProduct) {
                // we know we're done here, return from here whatever you
                // want the final resolved value of the promise to be
                return res;
            } else {
                if (timeout !== 0 && Date.now() - start > timeout) {
                    console.log(
                        "timeout error on pollUntilDone - returning user object without userProduct"
                    );
                    return res;
                } else {
                    // run again with a short delay
                    return delay(interval).then(run);
                }
            }
        });
    }
    return run();
}
