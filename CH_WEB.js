// Web infrastructure become significatn development platform. JS has leading role as dynamic script language on both client and server side. The API documentation is covered within Mozzila's MDN web doc.

// DOM API, reminder for templatong engine - is used for easier appand UI mainatanance. DOM is object that represent the document displayed in one tab or page in web browser. So each tab
// holds document element which can be manipulated with DOM object and related methods. Each html document is defined with markup language which is not actualy programing language, but using DOM
// and JS it can have form of programing language. Document object hast tree structure and JS has trough document object object element of page which can be referenced
// node uses several moduls to start the server and to show the site including the logic. UI and frontend keep separate forom backend logic. Do the fronend manipulation.
// when we do the page DOM API maps the page in tree structure. By calling each element we can manipulate those elements with JS methods. 
// Finaly difference between function, var and const, let, class. Var and function key word defines the property in window() global object and the property can be access with window.f() or
// window.c. On other hand let, const and class does not define the instance as property of global object but uses shared namespace. 
// JS script is executing in two phases. In first phase it execute the code from first to last line, just goes trogh and do what is writen. In second phase looks if async behaviour is
// registered. If yes and if there is callback, event hendlers etc. in stack than in second phase code wait for event or async behaviour to fulfill to execute. This is similar behaviour
// as Operating system or RTOS. This task is fulfilled by JS interpreter. Second phase is starting with load() which loads all events and registere all events. Looking at the mechanism
// how web works, on request from browser the page or UI will be loaded including the script tag. The script starts executing when all resources are loaded when browser starts with load() on 
// global object. Execution is going in two phases, and until both fases are finished and code executed, the UI is not responding on eny user action. JS is doing the task in single tread, goes
// sequentialy fase one than two. Until last element is registerd in eventloop the UI starts to capture the user interaction. This should be taken in account when doing the app not to have
// massive code on the beginig of the loading the html, css etc. WEB Worker mechanisam allow some form of concurency, actualy it establish the execution Isle for intensive operations. This Isle
// does not have any connection to "main" code but trough async messageing mecahnism exchanging informations. 

// Events. Must understand that there is difference between node and browser event model. The browser event model is much reacher and complex. There is event type 
// Browser is responsible to generate events on all elements in documents. the HTML document is loading and browser is compsing tha page and back structure in DOM. On DOM objects again
// browser is generating the statuses and events on klik on hoover on ... on each element is tree generated from HTML document. Script is definig the what will happend with each event and what 
// will browser do on each event capture.
// EVENT TYPE is string which defines the event like "click", "hoover", "keydown" the list of events is available https://www.w3schools.com/jsref/dom_obj_event.asp
// EVENT TARGET is object on which event apply like window.document.element <button> etc. The message event is applied on WEB WORKER when message form worker arrives or is send.
// EVENT HANDLER (LISTENER) APP or script is registering the function or event handler listener with browser, when event on object is catched the hendler function do the work.
// EVENT OBJECT is associated wirh event and keep all necessary informatio about event. This object is passed to hendler function as argument. From this object hendler gets all necessary
// informations
// EVENT PROPAGATION process - when event occure the propagation proces is importan as it propagate the event trough object tree from the element on which event ocure to document object
// for object like workers the propagation is not applied as this is object not in tree so mesaage event will be only on that object. This mechanism enable to have optimisation
// of event handler, for example to have single click event handle on document level of tree. Handler  can stop the propagation so if event ocures and start propagate ol element level the 
// element method can stop the propagation and introduce the different method or handler 
// event can be device dependant, device independant, UI,change state, API specific
// HOW TO REGISTER EVENT? by setting the event property of object referncing the event hendler, or by passing referencing hendler to event listener of object by AddEventListener() method.

// SETTING THE EVENT PROPERTY ON OBJECT - with on<event property> method onclick, onchange, onmouseover

window.onload = function(){
    let form = document.querySelector("form#shipping");
    form.onsubmit = function(event){
        if (!isFormValid(this)){
            event.preventDefault();
        }
    };
};


// addEventListener()
// each element in DOM tree can be used as even target. With method event hendler is registered on object on specific event type

let b = document.querySelector('#mybutton');
b.onclick = function(){
    console.log ('click');
}
b.addEventListener("click", ()=>{
    console.log ("click again");
});

// addEventLstener() method can register more than one hendler on same object and same event, when event ocures the handlers will handle the event in oredr they were registered in JS
// code. The methos does not mask or overwrite the onclick property event listener but will execute also this regsitered handler.
// addEventListener() is paird with removeEventListener() with same arguments it removes the registered hendlers from object.

// third argument in addEventListener() and removeEventListener() can be property or object containing one or one of three properties: capture: true|false once: true|false passive: true|false
// once is clear and it will invoke the handler once of true, passive if true will prevent the invokation of default method for the event if exists. Capturing if true defines the hendler as
// capturing and for now it is unlcear mechanism. For now capturing event hendler will capture events from his parent object. If the perent is window than all capturing hendlers will capture
// the event. Events are bubble up form object on which event heppend. In case of capturing hendlers it actualy capture the event but from top to bottom of tree and only the events hendlers
// which are registred as capturing hendlers

// event cancelation preventDefault(), stopPropagation(), stopImmediatePropagation() methods. Difference between stopPropagation and stopImmediatePropagation is that stopPropagation stops the 
// propagation but hendlers on that object are invoked. stopImmediatePropagation stops henders on the object and the bubbelnig process.

// custom event. The idea is that we create dispatcher which will create object and send event. Event hendler registered with addEventListener hendles this event further.
// for using custom events we have CustomEvent() constructor, dispatchEvent() method and addEventListener() method
// to create the custom event we use contructor to create event object. CustomEvent() arguments are string which defines the name of event and sencond is object which defines the properties
// Properties are same as from Event() object, bubbles:true|false, cancelable: true|false, composed: true|false
// example

document.dispatchEvent(new CustomEvent("busy", {detail:true}));                         // dispatch new custom event "busy" with status true

fetch(url)                                                                              //fetch document
    .then(HandleNetworkResponse)
    .catch(handleNetworkError)
    .finally(() => {
        document.dispatchEvent(new CustomEvent("busy", {detail:false}));                // when finished async op (resolved and fulfilled) dispatch new custom event "busy" with detail false
    });

document.addEventListener("busy", (e)=>{                                                // register event listener which accepts the event object e as argument, looks for information and  
    if (e.detail){                                                                      // if detail is true shof busy simbol, if not hide busy simbol
        showSpinner();
    } else{
        hideSpinner();
    }
});


// DOM is about document and JS is about manipulating the behaviour of the documet. Based on that featrure UI can be interactive. Dynamicity is achived with templating engines and with this
// template principle it can be easier to maintain the application on web.
// to select the element in DOM we use querySelector() method which uses the CSS sleectors which identify the element or group of element in UI (DOM)
// CSS selectors are div reperesenting the <div> tag, #nav representing element with id=nav and .warning any elemnt with "warning" in its class atribute
// one method is also getElementById() and getElementByName() getElementByTagName() getElementByClassName() 
// CSS selector - JS methos using method querySelector() an querySelectorAll(). Selector can be composit and take in account ore than oneproperty of TAG
// selector a[href] for all  <a href = > tags with href propertie.
// Using querySelector let b = document.querySelector("#byId") is the same let b = document.getElementById("Id")
// let b = document.querySelector("*[name=ime]") is the same let b = document.getElementByName("ime") there are also getelementByTag() and getElementByClass()
// innerHTML, outerHTML, adjastentHTML(),
// Element clas defines getAttribute(), setAttribute(), hasAttribute(), removeAttribute(), there is also HTMLelement object hich represend the node lement and its properitie is value
// of the element

let image = document.querySelector("#main_image");
let url = image.src;
image.id = "main_image";


let f = document.querySelector("form");
f.action = "https://www.example.com/submit";
f.method = "POST";

// Document oobject has methods and properties for manipulating the whole tree ov the document and to add delete the nodes and content of the nodes (tags)
// to creaate new element we can use createElement() method. example
// Element class and instance of that class Element object represent the element of HTML document. Properties 


let paragraph = document.createElement("p");
let emphasis = document.createElement("em");

emphasis.append("world");
paragraph.append("hello ", emphasis, "!");
paragraph.append(" ");
paragraph.innerHTML;


