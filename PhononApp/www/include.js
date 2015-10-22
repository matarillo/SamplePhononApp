riot.include = (function () {
    var includeEvent = document.createEvent("HTMLEvents");
    includeEvent.initEvent("include", false, false);

    var includeCounter = {
        defined: 0,
        loaded: 0,
        scriptDefined: 0,
        scriptLoaded: 0
    };

    var fireIfIncluded = function () {
        if (includeCounter.defined === includeCounter.loaded && includeCounter.scriptDefined === includeCounter.scriptLoaded) {
            console.log("fire document.include");
            document.dispatchEvent(includeEvent);
        }
    };

    var xhrLoaded = function (xhr, container) {
        var cs = xhr.response.body.children;
        var arr = [];
        var scripts = [];
        for (var i = 0; i < cs.length; i++) {
            if (cs[i].tagName === "SCRIPT") {
                scripts.push(cs[i].getAttribute("src"));
            } else {
                arr.push(cs[i]);
            }
        }
        for (var i = 0; i < arr.length; i++) {
            container.appendChild(arr[i]);
        }
        includeCounter.scriptDefined += scripts.length;
        console.log("includeCounter.scriptDefined=" + includeCounter.scriptDefined);
        for (var i = 0; i < scripts.length; i++) {
            riot.compile(scripts[i], function () {
                includeCounter.scriptLoaded += 1;
                console.log("includeCounter.scriptLoaded=" + includeCounter.scriptLoaded);
                fireIfIncluded();
            });
        }
        includeCounter.loaded += 1;
        console.log("includeCounter.loaded=" + includeCounter.loaded);
        fireIfIncluded();
    };

    var include = function (container) {
        includeCounter.defined += 1;
        console.log("includeCounter.defined=" + includeCounter.defined);
        var src = container.getAttribute("src");
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            xhrLoaded(xhr, container);
        }
        xhr.open("GET", src, true);
        xhr.responseType = "document";
        xhr.send();
    };

    return include;
})();
riot.mount("include");
