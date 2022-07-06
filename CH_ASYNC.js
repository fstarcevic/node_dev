// Async programing is the basic for event programing in JS. JS is handlong code sequentialy and when run it gos t ill end and closes. So there are no threads aservices or something
// what can handle events or async behaviour. For that purpose there is event handler or EVENT LOOP so called in JS which is actualy hande the events or async events. Functions or methods 
// actualy registers the so salled call back function s(functions to be called later or back when some event heppen) and thos efunctions are registered at EVENT LOOP with reference to event, and
// this is the part of V8 engine or Google JS interpreter, or SpiderMonkey Firefox JS interpreter.



// Timers async
setTimeout(chckForUpdatets, 60000); // registers the function to callback after one minute just once, timer async


let updateIntervalId = setInterval(checkForUpdate, 60000); //same as setTimeout but in intervals, registers the functon wothout arguments and calls it evry minute = 60000 ms

function stopCheckingForUpdates() {
    clearInterval(updateIntervalId);
}


// Event async
let okay = documet.querySelector('#confirmUpdateDialog button.okay'); //refrence to DOM element, or set of elements with sepcific atribute class or name
okay.addEventListener('click', applyUpdate);    // on refrenced DOM element there is registered callback function witout arguments on click event, so when click hits the DOM element callback 
                                                // will be called


// network events - calls to remot site with POST, GET, DELETE, HEAD, PUT, CONNECT, OPTIONS, TRACE, PATCH, but most uwsed are CRUD (Create - POST, Read - GET, Update - PUT, Delete - DELETE)
function getCurrentVersionNumber(versionCallback){
    let request = new XMLHttpRequest(); //usualy called XHR object in AJAX, the structure of network event i smuch complex, must know the XMLHttpRequest Object in detail
    request.open("GET", "http://www.example.com/api/version");      // defined new object of class XHR named request. Consist of properties, methods and event
    request.send();                                                 // so properties are properties and have some values base on actions like Type Text Header Body etc
                                                                    // the methods are like .open(), .send()., etc
    request.onload = function(){                                    // finaly event are actual hendlers for async behaviou rwhere we register the hendler functions
        if (request.status == 200){                                 // like .omload for load, .onerror for error, .onabort for abort, etc the common thing is on prefix
            let currentVersion = parseFloat(request.responseText);  // hendler are references to function which must handle the event or just do something on event
            versionCallback(null, currentVersion);
        }                                                           // in this example we defined the REQUEST as XHR object. wi opened the comunication to web with GET HTTP method
                                                                    // and upon opening the connection the request is send with .send() method
        else {                                                      // with event handler fo load the respons .onload we referenced the function which handle the event doing
            versionCallback(response.statusText, null);             // cheking if status of request is 200 meing that server send OK code, assignig the cuurentVersion variable the
        }                                                           // parsed text of responseText (object format) So as the getCurentVersionNumber is ASYNC it can not return the sync result
    };                                                              // but pass the callback function, or function which will handle the result upon arival so when status is ok 200 please
                                                                    // parse the response and put in callback function with first arg NULL and second of text of current version
    request.onerror = request.ontimeout = function (e){             // the versionCallback function is for example to printout the version or error with control on NULL argument
        versionCallback(e.type, null);                              // on other hand if not OK it will call the function with response.status and second arg equal to NULL
    };                                                              // the last one defines the error handler function same on two events on error and on timeout which 
}                                                                   // printout the type of error and second arg to be null defining that something is not OK.



const { request } = require("http");
// file read async events or http request in node.js
const https = require("https");
function GetText(url, callback){                                    // same GetText is function that fetch text with GET method and do the callback over callback function.
    request = https.get(url);                                       // sets the https method to GET and returns the object containing the user request 
    request.on ("response", response => {                           // .on is something not documented or I did not find it. This is event handler defined by EVENT module within core API
        let httpStatus = response.stsusCode;                        // description at https://blog.logrocket.com/handling-and-dispatching-events-with-node-js/ 
        response.setEncoding("utf-8");                              // So the events like DATA, END and ERROR are defined or in https module or in program within EVENT object definition.
        let body = "";                                              // here is definition of function and some elements are misiing like event definition or callback function, same as previous
                                                                    // GetText will pass args URL to GET from and callback function which handles the result of GET method.
        response.on("data", chunk => {body += chunk;});             // Create request object from https.get(url) method. The module EVENTS is applied to enable the .on method on events "data"
                                                                    // "end", "error". So the response object .on method will register event listener (handler) by definig the function 
        response.on("end", () => {                                  // as second arg. On "data" event add body to body, else report error (the same function as in previous explanation)
            if (httpStatus === 200) {                               // on event "end"close the comunication and callback with first arg null and second body probably to print out.    
                callback(null, body);                               // on error or not ok ststus callback (printout) function with first arg status and second null 
            }                                                       // next EVENT module and promise
            else {
                callback(httpStatus, null);
            }

        });
    });

    request.on("error", (err) => {
        callback(err, null);
    });
}



// EVENT modul



// Promises - is objet thet is representing the future reuslt od async operation. Returning the pomise is actualy returning the reference to promise object where the reuslt of async operation 
// will be storred. When working with promise, the function must return promise as object on which we can apply the .then() method, or .catch() method.
// .then(callback, errorhendler) callback fucntion accept the result of promise as argument, or if exception is rised, than errorhandler will do the job. The last in chain is .catch(error) 
// which propagate the error hendling reult or if exception is rised and not handled in cahin the last .catch() wil catch the exception and handle it. 

// Promise can be fulfiled or rejected .than(fulfilled_callback, rejectd_callback)

// fetch is function that uses promises for async read (GET) form URL

fetch("/api/user/profile").then(response => {
    if (response.ok && response.headers.get ("conntent-Type") === "application/json") {
            // do something
    }
});


fetch("/api/user/profile").then(response => {                       // How this actualy works? So Fetch is promisse function and return the promise object response of the fetch operation, and 
    return response.json();                                         // pass the object as argumnet to first fucntion in .then() method which takes the response object as argument and do the
}).then(profile => {                                                // method .json() and return it as response object to argument of next .then() method takes return object as argument to do
    DisplayUserProfile(profile);                                    // DisplayUserProfile()
});


// Promise form ground up. If function is not promise based we must use constructor class to ceate promise with two arguments resolve and reject

function prom_fja (argument) {                                      // So we have here the defined function which is returning the promisse object we can attach the .next() method.
    let prom_obj = new Promise ((resolve, reject) => {              // definition of promise with class contrucor havin as argument callback function with two args. First for resolve and 
        if (argument === 'ok') {                                    // second for reject
                reject ("error, ok is not allowed");
        }
        setTimeout(resolve, duration);
    });
}


prom_fja(arg).next( resolve => {
    Ispiši(resolve);
}).catch(error => {
    // do something with error
});



const http = require('http');

function getJSON(url) {                                                                 // function definition for promise usage - returns promise object
    return new Promise((resolve, reject) => {                                           // returns the promise object with resolve and reject callbacks
        request = http.get(url, response => {                                           // definition of reference on result of request object for URL GET (url:string, response: string stream)
            if (response.statusCode !== 200) {                                          // cheking for response code and if not ok 200
                reject(new Error(`HTTP status ${response.statusCode}`));                // rejectwith error object construct form error class constructor 
                response.resume();                                                      // check what .resume() method is doing on response object. On string stream .resume(), on paused stream
            }                                                                           // resumes the data flow again
            else if (response.headers["content-type"] !== "aplication/json") {          // .then(null, e) = .catch(e)
                reject (new Error("Inavlid content-type"));                             // Check the type of payload and if type is not what expected the return error object
            }
            else {                                                                      // same as prevous examples, open empty string body, wait for data event and append to string
                let body = "";
                response.setEncoding("utf-8")
                response.on("data", chunk => { body += chunk});
                response.on("end", () => {
                    try {
                        let parsed = JSON.parse(body);
                        resolve(parsed);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        });
        request.on ("error", error => {
            reject(error);
        });
    });
}


// async await, ideogram.
// Way the async code can be written as sync code. AWAIT returns the value form promise object. If promise is sattled than it returns the value of sattlement, othervise it returns exception
// this is async ideogram so to use await we have to declare/define function with async keyword where this AWAIT will be used. The ASYNC function is function that returns the promise so
// it is asyncronius function (callback function )

// pseudo example

async function getHighScore(url){                                           // We define the async function or function which will be acting as call back on sync event. 
    let response = await fetch(url);                                        // the variable response (sync) takes the value of async operation from promise which returns the fetch
    let profile = await response.json();                                    // further variable profile takes the response json object and the funcrion returns promise and when all is 
    return profile.highScore;                                               // settled the it returns the value within promisse object
}


displayProfielHighScore(await getHighScore('https://myProfile/name'));      // the sync function will take argument which is value of promise object when async op. is settled
                                                                            // IMPORTANT! this line will only work within async declared function as await can only exists within async function


// iterative operations

const fs = require("fs");

async function parseFile(filename) {
    let stream = fs.createReadStream(filename, {encoding: "utf-8"});
    for await (let chunk of stream){
        parseChunk(chunk);
    }
}








