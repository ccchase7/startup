alert("It's begun");

class AnagramBuilder
{
    outputTextBox;
    inputTextBox;
    sidebar;
    id_count;
    savedAnagrams;
    

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
        this.sidebar.appendChild(noAnagrams);
        return 0;
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
    return newAnagram;
}
