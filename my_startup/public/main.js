const noAnagramString = "No Anagram Found";
const ANAGRAM_LIMIT = 10;
class AnagramBuilder
{
    outputTextBox;
    inputTextBox;
    sidebar;
    id_count;
    savedAnagrams;
    sharedAnagrams;
    lastSaved;
    words;
    saveButton;
    

    constructor()
    {
        this.outputTextBox = document.getElementById("answer-text");
        this.inputTextBox = document.getElementById("input-textbox");
        this.sidebar = document.getElementById("saved-anagrams");
        this.id_count = 0;
        this.savedAnagrams = [];
        this.sharedAnagrams = [];
        this.saveButton = document.getElementById("save-button");
        this.words = null;
    }

    async loadWords()
    {
        const response = await fetch('/api/words');
        this.words = await response.json();
    }

    async detectEnterOrSpace(event)
    {
        if ((event.keyCode === 13)) {
            event.preventDefault();
            this.getAnagram();
        }
        if (event.keyCode === 32)
        {
            event.preventDefault();
        }
    }

    async getAnagram()
    {
        let input = this.inputTextBox.value;
        let ang = await this.makeAnagram(input);
        this.outputTextBox.textContent = ang;
    }

    async makeAnagram(input)
    {
        if (this.words === null)
        {
            await this.loadWords();
        }

        this.inputTextBox.textContent = input;
        for (let word of this.words)
        {
            if (this.anagram(input, word) && (word !== input))
            {
                this.saveButton.disabled = false;
                return word;
            }
        }
        
        this.saveButton.disabled = true;
        return noAnagramString;
    }

    anagram(s1, s2){
        return s1.split("").sort().join("") === s2.split("").sort().join("");
    }

    async loadSavedAnagrams()
    {
        console.log("DISPLAYING SAVED");
        let saved = null;
        try {
            const response = await fetch('/api/saved', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
            });
      
            // Store what the service gave us as the high scores
            saved = await response.json();
          } catch (e) {
            // If there was an error then just track scores locally
            console.log("Could not get saved anagrams.");
            console.log(e);
        }
    
        if (saved.length > 0)
        {
            displayAnagrams(saved);
        }
        
        return 0;
    }

    async getNextId()
    {
        return this.id_count++;
    }

}

const anagramBuilder = new AnagramBuilder();

inbox = anagramBuilder.inputTextBox;
outbox = anagramBuilder.outputTextBox;




function clearInputOutput()
{
    anagramBuilder.inputTextBox.value = "";
    anagramBuilder.outputTextBox.textContent = "";
    anagramBuilder.inputTextBox.focus();
}

function logout()
{
    clearInputOutput();
    anagramBuilder.inputTextBox = "Input a word";
    removeSaved(anagramBuilder.sidebar);
    removeSaved(document.getElementById("shared-anagrams"));
    loginHelper.logout();
}

async function loginFromEnter(event)
    {
        if ((event.keyCode === 13)) {
            await loginHelper.login();
        }
    }

async function login()
{
    await loginHelper.login();
    anagramBuilder.loadSavedAnagrams();
}

async function saveAnagram()
{
    let sidebar = anagramBuilder.sidebar;

    if (anagramBuilder.outputTextBox.textContent === noAnagramString)
    {
        return;
    }
    if (anagramBuilder.outputTextBox.textContent === "")
    {
        return;
    }

    if (anagramBuilder.savedAnagrams.length === 0)
    {
        while (anagramBuilder.sidebar.firstChild)
        {
            anagramBuilder.sidebar.removeChild(anagramBuilder.sidebar.firstChild);
        }
    }

    let currAnagram = await makeSavedAnagramObj(anagramBuilder.outputTextBox.textContent);
    let saved = [];

    try {
        const response = await fetch('/api/save', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(currAnagram),
        });
  
        // Store what the service gave us as the high scores
        saved = await response.json();
      } catch {
        // If there was an error then just track scores locally
        console.log("Could not save.");
    }

    displayAnagrams(saved);
}

async function displayAnagrams(saved)
{
    removeSaved(anagramBuilder.sidebar);

    anagramBuilder.savedAnagrams = [];
    let nChild;
    for (an of saved)
    {
        nChild = await makeNewSavedAnagramElement(an.word, an.anagram);
        anagramBuilder.sidebar.insertBefore(nChild, anagramBuilder.sidebar.firstChild);
        anagramBuilder.savedAnagrams.push(nChild);
    }
}

async function shareAnagram()
{
    let shareBar = document.getElementById("shared-anagrams");

    if (anagramBuilder.outputTextBox.textContent === "")
    {
        return;
    }

    if (anagramBuilder.sharedAnagrams.length >= ANAGRAM_LIMIT)
    {
        anagramBuilder.sharedAnagrams.shift();
        shareBar.removeChild(shareBar.lastChild);
    }

    let currAnagram = await makeNewSharedAnagram(anagramBuilder.outputTextBox.textContent);

    anagramBuilder.sharedAnagrams.push(currAnagram);

    if (shareBar.hasChildNodes)
    {
        shareBar.insertBefore(currAnagram, shareBar.firstChild);
    }
    else
    {
        shareBar.appendChild(currAnagram);
    }
    
}

function removeSaved(el)
{
    while (el.firstChild)
    {
        el.removeChild(el.firstChild);
    }
}

async function makeNewSavedAnagram(txt)
{
    let newAnagram = document.createElement("div");
    newAnagram.classList.add("card");
    newAnagram.id = await anagramBuilder.getNextId();
    newAnagram.textContent = "Word: " + anagramBuilder.inputTextBox.textContent + " Anagram: " + txt;
    return newAnagram;
}

async function makeNewSavedAnagramElement(word, txt)
{
    let newAnagram = document.createElement("div");
    newAnagram.classList.add("card");
    newAnagram.id = await anagramBuilder.getNextId();
    newAnagram.textContent = "Word: " + word + " Anagram: " + txt;
    return newAnagram;
}

function makeSavedAnagramObj(txt)
{
return {
    word: anagramBuilder.inputTextBox.textContent,
    anagram: txt
}
}

async function makeNewSharedAnagram(txt)
{
    let newAnagram = document.createElement("div");
    newAnagram.classList.add("card");
    newAnagram.id = await anagramBuilder.getNextId();
    let user = localStorage.getItem("userName");
    newAnagram.textContent = user + ": " +  "Word: " + anagramBuilder.inputTextBox.textContent + " Anagram: " + txt;
    return newAnagram;
}





