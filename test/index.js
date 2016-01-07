var resolveQueue = require('../'),
    test = require('tape');

function repeater(task, time, limit){
    var interval = setInterval(function(){
        if(!--limit){
            clearInterval(interval);
        }
        task();
    }, time);
}

test('default', function(t){

    t.plan(10);

    var getX = resolveQueue(function(callback){
        t.pass('resolver called');
        setTimeout(function(){
            callback(null, 'FOO');
        }, 200);
    });

    repeater(function(){
        getX(function(error, x){
            t.equal(x, 'FOO', 'got correct result');
        });
    }, 50, 8);

});

test('cache', function(t){

    t.plan(11);

    var getX = resolveQueue(function(callback){
        t.pass('resolver called');
        setTimeout(function(){
            callback(null, 'FOO');
        }, 200);
    }, {cacheResult: true});

    setTimeout(function(){

        repeater(function(){
            getX(function(error, x){
                t.equal(x, 'FOO', 'got correct result');
            });
        }, 50, 10);

    }, 25);

});

test('immediate', function(t){

    t.plan(3);

    var interval;

    var getX = resolveQueue(function(callback){
        t.pass('resolver called');
        setTimeout(function(){
            callback(null, 'FOO');
        }, 200);
    }, {cacheResult: true, immediate: true});

    setTimeout(function(){

        interval = setInterval(function(){
            getX(function(error, x){
                clearInterval(interval);
                t.equal(x, 'FOO', 'got correct result');
            });
        }, 50);

    }, 75);

});