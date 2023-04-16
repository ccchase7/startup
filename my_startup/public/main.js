const noAnagramString = "No Anagram Found";
const shareAnagramEvent = 'shareAnagram';
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
    username;
    

    constructor(username)
    {
        this.outputTextBox = document.getElementById("answer-text");
        this.inputTextBox = document.getElementById("input-textbox");
        this.sidebar = document.getElementById("saved-anagrams");
        this.id_count = 0;
        this.savedAnagrams = [];
        this.sharedAnagrams = [];
        this.saveButton = document.getElementById("save-button");
        this.words = null;
        this.username = username;
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

let anagramBuilder;
let socket = null;
let inbox;
let outbox;

function clearInputOutput()
{
    anagramBuilder.inputTextBox.value = "";
    anagramBuilder.outputTextBox.textContent = "";
    anagramBuilder.inputTextBox.focus();
}

function logout()
{
    clearInputOutput();
    anagramBuilder.inputTextBox.value = "Input a word";
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

function removeSaved(el)
{
    while (el.firstChild)
    {
        el.removeChild(el.firstChild);
    }
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
        word: inbox.textContent,
        anagram: txt
    }
}

async function shareAnagram()
{
    broadcastEvent(anagramBuilder.inputTextBox.textContent, anagramBuilder.outputTextBox.textContent);
}

async function displayNewSharedAnagram(msg)
{
    let shareBar = document.getElementById("shared-anagrams");
    let currAnagram = await makeNewSharedAnagram(msg.user, msg.word, msg.anagram);

    if (anagramBuilder.sharedAnagrams.length >= ANAGRAM_LIMIT)
    {
        anagramBuilder.sharedAnagrams.shift();
        shareBar.removeChild(shareBar.lastChild);
    }

    anagramBuilder.sharedAnagrams.push(currAnagram);

    if (shareBar.firstChild)
    {
        shareBar.insertBefore(currAnagram, shareBar.firstChild);
    }
    else
    {
        shareBar.appendChild(currAnagram);
    }
}

async function makeNewSharedAnagram(usr, wrd, txt)
{
    let newAnagram = document.createElement("div");
    newAnagram.classList.add("card");
    newAnagram.id = await anagramBuilder.getNextId();
    newAnagram.textContent = usr + " shared: " +  "Word: " + wrd + " Anagram: " + txt;
    return newAnagram;
}

async function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {};
    socket.onclose = (event) => {};
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === shareAnagramEvent) {
        displayNewSharedAnagram(msg);
      }
    };
  }

  async function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
  }

  async function broadcastEvent(wrd, angram) {
    const event = {
        user: anagramBuilder.username,
        word: wrd,
        anagram: angram,
        type: shareAnagramEvent
        }
    socket.send(JSON.stringify(event));
  }



