module.exports = function(resolver, options){
    var running,
        queue = [],
        results;

    if(!options){
        options = {};
    }

    function clear(){
        results = null;
    }

    function start(){
        running = true;
        resolver(function(){
            results = arguments;
            running = false;

            while(queue.length){
                queue.shift().apply(null, results);
            }

            if(!options.cacheResult){
                clear();
            }
        });
    }

    if(options.immediate){
        start();
    }

    function getResult(callback){
        if(results){
            callback.apply(null, results);
            return;
        }

        if(!options.immediate && !running){
            start();
        }

        queue.push(callback);
    };

    getResult.clear = clear;

    return getResult;
}