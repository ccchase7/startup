# startup
Startup project for CS 260

I clone trashy China cats.
Not really. But the cool thing is, if you mix up all the letters in that sentence, you can spell out my full name.  Imagine a website where you could just type in your name, or maybe someone else’s name, or any word or sentence really, and find out what else those letters would spell! That’s what my startup is all about: anagrams. I’m not saying they’ll be very good, but we’ll find you one if there is one. On the website, you’ll enter some letters and it’ll give you an anagram. You’ll be able to log in, save your favorite ones for later, send the good ones to your buddies (or your grandma), and maybe even more!
Features:
-	Secure login over HTTPS
-	It’ll give you an anagram
-	You can save your favorites
-	User-friendly display
-	You can send the ones you want to
-	Potential guess-the-word games

Accesible at claytoncchase.com (18.188.213.187)

DNS:
    - What happens when you type in a domain name:
        - Your browser sees if the IP address is already cached. If not,
        - Your browser contacts a DNS server and asks if it's in there. There might be:
            - A records, which map a domain name to an IP Address
            - CNAME records, which map a domain name to another domain name
        - Your browser establishes an HTTP connection with the server
    - Since there is so much caching for optimization, you can set a "Time To Live" (like an expiration date)
    - You can find the associated IP address with the "dig" command. You can find the route with "tracerout"
    - CORS: Cross Origin Resource Sharing
    - SOP: Same Origin Policy

HTML:
    - index.html is the first one it goes to, usually
    - Separate it into sections even though you don't necessarily have to, since it'll give the webpage more structure and help out with organization and non-visual functionality.
    - meta should contain character set setup and viewport settings. Something like
        "meta name="viewport" content="width=device-width, initial-scale=1.0" or
        "meta charset="UTF-8"
    - include (external), nav (navigation), text headings h<1-9>, table row, header, data.
    svg scalable vector graphic
    - List: [o u]l (ordered, unordered)
    - Links: a anchors text to a hyperlink, tell href. form (collection of inputs)


Changing the website once it's up:
    1. Make the changes you want.
    2. Push them to github
    3. pull them to the amazon console
    4. deploy them using the deployment script
<hr />

Simon:
    - Use < nav> to help the user navigate from one page to another.
    - The links should relate to other html pages. You should probably have a < nav> in
    all of your pages that helps the user get back to the home or at least get to
    the next place they will need to go.
    - < nav> is for internal "links", while < a href=""> is for external links.
    - Name the label and say it is "for" the id of the thing that it is for.
    - < b r /> and < h r /> are to help organize and separate paragraphs and sections of your page
    - At the top of the page, you can include < meta> stuff that defines some of the general
    characteristics of your page
    - Also, for some reason if you put an "_" in the name of your tab icon, it won't recognize it
    and you'll be severely disappointed until you figure it out.

Deploying Simon:
    - Make sure everything you want to deploy has been committed and pushed up to github
    - Pull or clone it down on your amazon account
    - make sure the permissions on the deploy script are correct. If you can't execute it
    you might have to give execute permissions using chmod a+x "file"
    - Run the deployment script. That will make it so when you go to the simon part of your
    website, caddy will send the files associated with your simon app

CSS:
    General:
        - Say link rel="stylesheet" href="main.css" to indicate where the page should go for the css
        Selectors:
            - Used to declare which elements you want the following css rules to apply to.
            - Class selector: a period before the class name. .class
            - Descendant combinator: parent descendant {} ALL DESCENDANTS
            - child: >. sibling: ~. adjacent sibling; +. attribute p[href], p[href = ""] (any p that has
            an href attribute)
            - Also, element.class selects all items of that class that are children of that element.
            - #id   element[attributes ]
                Pseudo Selectors:
                    - changes attributes of an element based on actions (like hover) rather than name/class...
                    - :hover    :visited    :checked

    Layout:
        Grid:
            - display: grid; grid-template-columns: repeat(auto-fill, minmax(minimumpx, 1fr)); grid-auto-rows: Xpx;
                grid-gap: Xem;
                - fr is a fractional unit (it splits up the parent into equal parts)
            - For when you want to display a group of child elements in a grid.
            - maybe use ^div^. define class for outer (container) and children.
            - margin, border, padding, content

        Flex:
            -* You should specify how much room you want the whole thing (or just parts of it) to take using
            the "height:" attribute. Ex. height: 100vh;
            - the flex number indicates how many "units" of space it should have. This number is relative
            to the total number of flex units defined in the subdivision.
            - To the right of the flex number, you can also indicate a starting height. If you want something
            to have a fixed height, give it a flex number of 0 and then indicate the starting height.
            - You can also include a flex-direction (ex. column or row, column-reverse or row-reverse) property
            to indicate what the main axis will be. So if you say row, then things will go on a horizontal axis
            left to right (they'll be separated into columns, but the main axis will be a row.)

User Experience:
    - Think of your User Interface as a story. Why are they using your service? What will satisfy them?
    - Consistent with other experiences so they know what to do, but different enough that it's interesting.
    - Breadcrumb: displays the path of how you got to where you are.
    - Choose a good COLOR scheme! Probably include a primary, secondary, and focus color and keep it
    consistent. Consider using Paletton and Adobe to pick a color scheme.
    - FONTS: Probably stick to 3 or less fonts and be consistent in how you use them. Also, keep your font
    sizing consistent.
        - em means the width of the character 'm' in that font. That's how you describe line length.
    - Use ICONS for the right things.
    - Try to set everything up to be used INTERNATIONALLY. That means your right-left can easily switch
    to left-right, things can be translated, and dates account for time zones.
    - Space / whitespace can be good for creating focus and decreasing the effort needed to understant
    something.
    - Interaction, Images, and Animation make your product interesting.
    - Avoid DECISION fatigue: don't present them with all the options at once, just a few at a time, so
    they don't get overwhelmed.
    - Performance: after 1-5 seconds of waiting, the probability that they'll leave increases 90%. etc.
    So that means you should try your best not to keep them waiting.
        -Short circuit: If something goes wrong or takes too long, the user should still be able to do a lot.
    - WALLS: something that hinders the User Experience.  Complexity, payment, failure, security (too high or
    too low), or legal.

Notes from Simon CSS:
    - Instead of trying to make the html format your buttons, it's a lot easier to do it in the css file
    - min-width is the smallest you ever want it to go even when the window shrinks
    - position: absolute; will make it so the object doesn't take up any room in the layout, so it's nice
    when you want something to just stay at one place the whole time and not worry about making everything
    else fit around it.
    - a lot of the time, the bootstrap keyword will be in the class name, and you can put more than one in
    there and they'll compound on each other.
    - It is a lot more useful than I thought to give something a class name and use that as the reference in
    the css file.

Notes from Start up HTML and CSS:
    - This time I started from the bottom with organization and structure in mind, after having seen a few other
    examples of how it was done, and it was a lot easier to make css do what I needed it to since I knew what
    element I was dealing with.
    - The options available from the bootstrap framework are so abundant that I can't really learn them all right
    away, but I can definitely search for something I think I might like and find something that helps me make
    it work.
    - The percentage isn't always the percentage of the screen, sometimes it's the percentage of the width of the
    element or of something else.
    - You can make a textarea read-only by typing readonly behind the tag.
    
How to Javascript:
    - Putting it into your website:
        - script src="other_page.js" tells it where to look for the javascript.
    - Random Stuff:
        - (expression) ? if_true : if_false;
        - rest:
            - in a function parameter list, put function(first, second, ...all_the_rest) and it'll combine all the rest of
            the parameters given into an array called all_the_rest. (allows for variadic functions)
        - spread:
            - opposite of spread. expands an iterable to make it several parameters. like ** in python
        - JSON:
            - Strings: always double quotes. Arrays: square braces and commas. Objects: {}
            - to and from JSON: json.stringify(object), JSON.parse(json)
    - Scope:
        - var ignores block scope, so probably use let and const.
        - this:
            - in funciton, refers to object it belongs to. up to globalThis, unless strict: undefined if in global scope.
            - in object, refers to object.
            - globalThis: the environment.
        - Closure:
            - "A function and its surrounding state"
            - When you create a function, it remembers everything accessible in its creation scope.
            - But arrow functions are different, they remember the creation context.
            - But if you create the arrow function inside a function, then that function's context is its creation context.
    - Module:
        - Node.js (server-side javascript execution) introduced it so you could import things from other
        providers.
        - Node.js: CommonJS. Normal: ES Modules
        - scope is file-based, so if you want it visible outside of that then you have to "export" it
        - You can import stuff with the keyword "import"

    - Loops:
        - for (const val in list) { }   iterates over the property names.
        - for (const val of list) { }   iterates over the items in the list. 
    - Arrow Functions
        - Make a closure (the function can access elements from its original scope.)
        - () => 3; returns 3. () => { 3; } returns undefined.
    - Asynchronous:
        - Promise:
            - new Promise(***) you pass it a function that takes 2 variables: resolve and reject.
                - (resolve, reject) => {process,  resolve(XXX) or reject(YYY)}
            - .then(***) you pass it the function you want it to execute on success.
                - (XXX) => {what you want it to do after promise resolves}
            - .catch(***) you pass it the function you want it to execute on reject.
                - (YYY) => {what you want it to do when promise rejects}
            - .finally(***) you pass it the function it should always execute, on success and reject.
                - (ZZZ) => {what you want it to execute every time, after the other stuff is done}
            - Sometimes your promise will return another promise on a then or a catch, so you should
            specify what happens on then or catch with the returned promise.
        - Callback:
            - setTimeout(***, miliseconds); you pass it a function and the amount of time you want
            it to wait
                - () => what you want it to do after it's done waiting
            - Event Listener:
                - item.addEventListener('event', (***)); you pass it the "event" it's waiting for (like
                "click" or something) and the function you want it to execute when that event happens to
                the item.
        - async / await:
            - declare a function and use the keyword "async", which means you can use the "await" keyword
            in there
            - use await for things that might take a bit. It will return on success, or maybe throw an error
            if it fails. So use error handling.
            - "THE AWAIT EXPRESSION WILL BLOCK UNTIL THE PROMISE MOVES TO FULFILLED OR THROWS AN EXCEPTION"
            - await expects a promise, and will execute the promise it is given. so if a function "a" returns
            a promise, then when you call await a(), the call to a() returns a promise, the "await" sees the
            promise and initiates it and blocks until it is resolved.

    - Reduce:
        - array.reduce((a, v) => a + v, initial)
    - Objects:
        - entries: list of key-value pairs. keys: list of keys. values: array list of values.
        - Any function that returns an object is considered a constructor, and can be invoked with "new"
        - "Object literal syntax" is when you use the { } and specify what's in there (separated by comma,
        not ;).
    - Regex:
        - https://www.youtube.com/watch?v=rhzKDrUiJVk
        - regex literal begins and ends with slash
        - Flags are after the last slash. Flags like global (match all), i (case insensitive) m (multiline, $ end, ^ begins every line)
        - e+ (one or more "e"s) e* (zero or more)
        - a? (The symbol before the ? is optional. one or 0)
        - . (any character, but not newline) \. for actual period
        - \w (any word character, meaning letters) \s (any white space) \W (anything not \w) \S (anything not \s)
        - \w{4,} (any set of word characters of length 4+) \w{4, 6} (length 4 to 6)
        - [a-g] (character grouping)
        - (r|l) (one or the other)
        - ^ (beginning of line), $ (end of line)
        - Parenthesis group things. You can reference those groupings after by using $1 (group number), or name them with ?<name>
    - Classes:
        - constructor() {} is the keyword to indicate the constructor function. May have parameters.
        - '#' indicates a private member
        - Class class {}
        - inheritance: "extends __"
    - Destructuring:
        - [a] = [1, 2, 3] means a is 1 now.
        - Used to rename things too. can use rest syntax.
        - You could go into {}s to take things out of an object. also provide default values {a, b = 20} = obj. if nothing, undefined 
    - DOM
        - Stands for Document Object Model. It's a tree-like object that represents the structure of the html.

    - Notes From Javascript Simon:
        - You just have to include something like "< script src="name.js"></script>" at the bottom of the html (but still within the body section)
        - Encapsulate big ideas in classes.
            - You can get sounds / other media ready by reading it in in the constructor
        - You can pass in the element that triggered the javascript function by using the "this" keyword. From there, you can process
        it in a general way without needing to use logic to figure out which one got pressed.
        - localStorage is like a datacache that's managed by the user's browser, you can store things there that'll be there when you ask for them
        (localStorage.setItem("itemName", "itemValue") or localStorage.getItem("itemName")). Everything has to be stored as a string, so if you need
        to store an object then use JSON.stringify(object). Un-stringify using JSON.parse(json_object).
        - If you want to run something as soon as the page shows up, you can just call the function / write the code at the bottom of the script file (like in
        scores.js)
        - You can also mess with the css by accessing the "style" attribute of an element. Ex. "this.el.style.backgroundColor = background;" (play.js:18)
        - When updating the scores (play.js:141), they used "splice" to insert a score into the middle of the list of scores.
        - To link an instance of the class with the game on the website, instantiate a "game" object, and in the constructer it sets everything up, and in the
        html it specifies the name of that instance as the object that it is calling the callback functions on.
        - To go through the list of objects of a certain class (or all accessed by the same selector), you can use something like 
        "document.querySelectorAll('.game-button').forEach((el, i) => {} );"

    - Node.js:
        - If you want to use preexisting packages, you should use a Node Package Manager (npm):
            - make a new directory for your project
            - go to that directory
            - "npm init -y"
            - creates a "package.json" file that contains 1. metadata, 2. commands, 3. packages that your project
            depends on
            - package-lock.json keeps track of the package version you got so when you want to install it again,
            you get the same package version.
            - "npm install name-of-package"
            - "npm uninstall name-of-package"
            - IMPORTANT: it'll create a node-modules directory, which is probably going to get super big. You
            don't want to be moving that around (since you can just regenerate it with package.json), so you
            should keep it in your .gitignore file.
            - When you clone it to a new location, run "npm install" and it'll get everything ready for you.
        - Using a package:
            - instead of "import A as B", say "const B = require("A");" (where A is the package name and B is
            how you want to refer to it)
        - Summary:
            - Create your project directory
            - Initialize it for use with NPM by running npm init -y
            - Make sure .gitignore file contains node-modules
            - Install any desired packages with npm install <package name here>
            - Add require('<package name here>') to your JavaScript code
            - Run your code with node main.js

Web Services:
    - url:
        - url: uniform resource locator. http = protocol = scheme. then domain name.
            - instead of l, it could be n (for name) or i (identifier)
        - "< scheme>://< domain name>:< port>/< path>?< parameters>#< anchor>"
    - port:
        - Allows for multiple protocols or multiple types of services.
        - Famous ports: 20:ftp, 22:ssh, 25:SMTP (email), 53:dns lookup, 80:http, 443:https;
        - (caddy is listening on 80 and 443) (80 auto-redirects to 443)
    - http:
        - Request:
            < verb> < url path, parameters, anchor> < version>
            [< header key: value>]*
            [

                < body>
            ]
        - you can specify the type of resource with "Accept:" (like "text/html")(image/png)
        (text/javascript)(application/json) (has to be MIME type)
        - Response:
            < version> < status code> < status string>
            [< header key: value>]*
            [

            < body>
            ]
        - Verbs:
            - GET: get a resource
            - POST: create new resource (returns unique id)
            - PUT: update resource (requires unique id)
            - DELETE: delete
            - OPTIONS: get metadata, not resource.
        - Response Codes:
            - 1: info. 2: success. 3: redirect. 4: client error. 5: server error
        - Cookies:
            -server tells client what data to store with "Set-Cookie:" header, then client adds that on
            to subsequent requests.
            - Lets server remember things about client.
        - CORS and SOP
            - CORS: Cross Origin Resource Sharing (gets around SOP). SOP is default, but pretty much it
            asks "where else am I allowed to get content from" before it shows that content.
            - SOP: Same Origin Policy. javascript can't request something from a domain that the user is
            not viewing.
            - you have to be on the "access-control-allow-origin:" list if you want to use their stuff.
    - Designing an API:
        - RPC: Remote Procedure Calls (simple function calls) (couples API and implementation, :( )
        - REST: Representational State Transfer (acts on a resource.)
        - GraphQL: just exposes one endpoint and sends a query, and the server can process a lot at once
        instead of making the client send a ton of requests. Database stuff.

    - Express:
        - It's a Node package that helps you make a production-ready server. "creating and using http
        routing and middleware functions"
        1. npm install express (in the directory)
        2. const express = require('express');
        3. const app = express();
        4. app.listen(PORT);

        - Http routing (you get a request, you send it somewhere.)
        5. Add routes (endpoints)
            "app.get('path/:parameter', (***))"
            "app.get('path/:storeName', (***))"
            (you can use regular expressions /REGEX/ (you have to escape /)) ex.:
            app.delete(/\/store\/(.+)/, (req, res) => res.send({ delete: req.params[0] }));
                Parameters are indicated with ":"
                where (***) is a callback function that takes parameters req, res, next, where:
                    - req: the http request object
                        - you can get parameters from the path using req.params. Ex. req.params.storeName
                    - res: response object (res.send({}))
                    - next: the next routing function (if necessary to generate response)
                        - the order that these routes are added is enforced. if there are two that
                        match, it'll start with the first one then the second one is passed in as "next
    Mediator/Middleware:
        - The mediator (express) gets a request and passes it around to various middleware functions.
        - There are tons of middleware functions, and you can make your own. routing functions are middleware
        functions.
        - Except for routing, middleware functions are always called whenever the previous middleware function
        in the chain calls next().
        - Respond with a static file: "app.use(express.static('public'));"
        - Error handling function:
                app.use(function (err, req, res, next) {
                    res.status(500).send({ type: err.name, message: err.message });
                });
        - cookie-parser is a package that makes it easy to use cookies.
        





