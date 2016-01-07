# resolve-queue

Resolve multiple asynchronous requests to a resource once with a resolver.

## Usage

``` javascript
var resolveQueue = require('resolve-queue');

var getSomeFile = resolveQueue(function(callback){

        fs.readFile('fileName.txt', callback);

    }, {
        immediate: false,
        cacheResult: true
    });

// Begins loading file.
getSomeFile(function(error, file){
    // Runs once file is loaded.
});

// Called while loading, just pushes callback into queue.
getSomeFile(function(error, file){
    // Runs once file is loaded.
});

// Called while loading, just pushes callback into queue.
getSomeFile(function(error, file){
    // Runs once file is loaded.
});

// After some time..
setTimeout(function(){

    // Begins loading file again, as the last task was resolved (probably)
    getSomeFile(function(error, file){
        // Runs once file is loaded.
    });

}, 1000);

```

## Options

cache: Whether to cache the result indefinitelly.

immediate: Whether to call the resolver immediately after setup.

## queue.clear();

You can also manually clear the queue's cache by calling `queue.clear()`;

```
var resolveQueue = require('resolve-queue');

var queue = resolveQueue(resolverFunction, {
        immediate: false,
        cacheResult: true
    });


setInterval(resolveQueue.clear, 100); // Clear out the queue's cached resulte every 100ms

```