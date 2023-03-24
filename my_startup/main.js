alert("It's begun");

class AnagramBuilder
{
    outputTextBox;
    inputTextBox;

    constructor()
    {
        this.outputTextBox = document.getElementById("answer-text");
        this.inputTextBox = document.getElementById("input-textbox");
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

}

const anagramBuilder = new AnagramBuilder();

function clearInputOutput()
{
    anagramBuilder.inputTextBox.value = "";
    anagramBuilder.outputTextBox.textContent = "";
    anagramBuilder.inputTextBox.focus();
}