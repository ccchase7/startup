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

HTML:
    Separate it into sections even though you don't necessarily have to, since it'll give the webpage more structure and help out with organization and non-visual functionality.

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
        Selectors:
            - Used to declare which elements you want the following css rules to apply to.
            - Class selector: a period before the class name. .class
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


