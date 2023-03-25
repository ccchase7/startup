alert("It's begun");
let aaaaa;
let justDeleted = false;
class AnagramBuilder
{
    outputTextBox;
    inputTextBox;
    sidebar;
    id_count;
    savedAnagrams;
    lastSaved;
    

    constructor()
    {
        this.outputTextBox = document.getElementById("answer-text");
        this.inputTextBox = document.getElementById("input-textbox");
        this.sidebar = document.getElementById("saved-anagrams");
        this.id_count = 0;
        this.savedAnagrams = [];
    }

    getAnagram()
    {
        let input = this.inputTextBox.value;
        let ang = this.makeAnagram(input);
        this.outputTextBox.textContent = ang;
    }

    makeAnagram(input)
    {
        return "No anagram found for " + input;
    }

    async loadSavedAnagrams()
    {
        let noAnagrams = await makeNewSavedAnagram("You have no saved Anagrams.")
        this.savedAnagrams.push(noAnagrams);
        this.lastSaved = noAnagrams;

        this.sidebar.appendChild(noAnagrams);
        return 0;
    }

    async deleteSavedAnagram(last)
    {
        this.lastSaved = aaaaa;
        let childNum = -1;
        alert("In delete looking for id " + this.lastSaved.id);
        for (let an in this.savedAnagrams)
        {
            alert("Checking " + this.savedAnagrams[an].id);
            if (this.savedAnagrams[an].id === this.lastSaved.id)
            {
                alert("Deleting " + this.lastSaved.id);
                this.savedAnagrams.splice(an, 1);
                childNum = an;
                break;
            }
        }
        if (childNum >= 0)
        {
            let par = this.lastSaved.parentNode;
            par.removeChild(par.children[childNum]);
            justDeleted = true;
        }

    }

    async getNextId()
    {
        return this.id_count++;
    }

}

const anagramBuilder = new AnagramBuilder();
anagramBuilder.loadSavedAnagrams();
inbox = anagramBuilder.inputTextBox;
outbox = anagramBuilder.outputTextBox;

function clearInputOutput()
{
    anagramBuilder.inputTextBox.value = "";
    anagramBuilder.outputTextBox.textContent = "";
    anagramBuilder.inputTextBox.focus();
}

async function saveAnagram()
{
    let sidebar = anagramBuilder.sidebar;

    if (anagramBuilder.savedAnagrams.length === 0)
    {
        while (anagramBuilder.sidebar.firstChild)
        {
            anagramBuilder.sidebar.removeChild(anagramBuilder.sidebar.firstChild);
        }
    }

    let currAnagram = await makeNewSavedAnagram(anagramBuilder.outputTextBox.textContent);

    anagramBuilder.savedAnagrams.push(currAnagram);
    sidebar.appendChild(currAnagram);
}

async function makeNewSavedAnagram(txt)
{
    let newAnagram = document.createElement("div");
    newAnagram.classList.add("card");
    newAnagram.id = await anagramBuilder.getNextId();
    newAnagram.textContent = txt;
    newAnagram.onmouseover = (hoverSaved);
    newAnagram.onmouseout = (unHoverSaved);
    return newAnagram;
}

function savedOptions(n_id)
{
    let options = document.createElement("div");
    options.classList.add("card");
    options.id= n_id;
    option1 = document.createElement("div");
    option1.classList.add("delete-button");
    option1.textContent = "Delete";
    option1.onclick = (function anon(look) {anagramBuilder.deleteSavedAnagram(look.parentNode);});
    option1.id = n_id;
    option2 = document.createElement("div");
    option2.classList.add("other-button");
    option2.id = n_id;
    options.appendChild(option1);
    options.appendChild(option2);

    options.onmouseout = (unHoverSaved);
    return options;
}

function hoverSaved()
{
    

    let parnt = this.parentNode;
    console.log("This's id is " + this.id);
    let bt = savedOptions(this.id);
    console.log("bt's id is " + bt.id);
    aaaaa = bt;
    if (bt.id === this.id)
    {
        console.log("Deleting " + bt.id);
        parnt.replaceChild(bt, this);
    }
    


}

function unHoverSaved()
{
    if (this.id !== this.parentNode.id)
    {
        if (!justDeleted)
        {
            
                alert("HERE")
                let parnt = this.parentNode;
                parnt.replaceChild(aaaaa, this);
            
                
        }
        else
        {
            justDeleted = false;
        }
    }
    
    
}


