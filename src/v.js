let vFalsify = false;
let vLength = 0;
let vValue = '';

Input.removeEventListener('input', InputHandler);
Input.addEventListener('input', VInputHandler);
Input.addEventListener('keydown', ev => {
    vFalsify = ev.shiftKey ? true : false;
});

function VInputHandler(input)
{
    if (!isTyping)
    {
        isTyping = true;
        StartTyping();
    }

    CurrentWord = WordList.children[indexCounter];
    currentWord = CurrentWord.textContent;

    if (input.inputType === 'deleteContentBackward')
    {
        --vLength;
        vValue = vValue.slice(0, vLength);
    }
    else 
    {
        ++vLength;
        if (vFalsify) 
        {
            vValue += currentWord[Math.floor(Math.random() * vLength)];
        }
        else 
        {
            vValue += currentWord[vLength - 1];
        }
    }

    if (vLength <= currentWord.length)
    {
        Input.value = vValue;
        CheckCurrentWord();
    }
    else
    {
        vLength = 0;
        vValue = '';
        MoveToNextWord();
    }
}
