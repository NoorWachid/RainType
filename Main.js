const typeBoxLm = document.getElementById("TypeBox");
const boardLm = document.getElementById("Board");
const inputLm = document.getElementById("Input");
const infoLm = document.getElementById("Info");
const timerLm = document.getElementById("Timer");
const currentWpmLm = document.getElementById("CurrentWpm");

const scoreBoxLm = document.getElementById("ScoreBox");
const wpmLm = document.getElementById("Wpm");
const accuracyLm = document.getElementById("Accuracy");
const wordDetailLm = document.getElementById("WordDetail");
const keystrokeDetailLm = document.getElementById("KeystrokeDetail");

const restartBtnLm = document.getElementById("RestartBtn");
const settingsBtnLm = document.getElementById("SettingsBtn");
const settingsBoxLm = document.getElementById("SettingsBox");
const saveBtnLm = document.getElementById("SaveBtn");

const themeLm = document.getElementById("Theme");
const themeLms = document.getElementsByName("Theme");
const timeLms = document.getElementsByName("Time");


let indexCounter = 0;
let charCounter = 0;
let correctCharCounter = 0;
let wordCounter = 0;
let corretWordCounter = 0;
let wordMin = 110;
let wordAboutGen = 20;
let wordScaleGen = 50;
let running = false;
let timeoutMax = 60;
let timeout = 0;
let intervalId = 0;
let beginPoint = 0;
let elements = [];
let prevTypedWord = "";

function Initialize()
{
    inputLm.addEventListener("blur", ev => inputLm.placeholder = "Type here...");
    inputLm.addEventListener("focus", ev => inputLm.placeholder = "");
    inputLm.addEventListener("input", OnInput);

    restartBtnLm.addEventListener("click", ev => {
        Reset();
    });

    settingsBtnLm.addEventListener("click", ev => {
        settingsBoxLm.hidden = !settingsBoxLm.hidden;
    });

    saveBtnLm.addEventListener("click", OnSaveSettings);

    infoLm.hidden = true;
    scoreBoxLm.hidden = true;
    settingsBoxLm.hidden = true;

    if (localStorage.hasOwnProperty("Theme"))
    {
        const value = localStorage.getItem("Theme");
        Array.from(themeLms).find(el => el.value === value).checked = true;
        themeLm.href = value + ".css";
    }
    if (localStorage.hasOwnProperty("Time"))
    {
        const value = localStorage.getItem("Time");
        Array.from(timeLms).find(el => el.value === value).checked = true;
        timeoutMax = parseInt(value);
    }
}

function Reset()
{
    boardLm.textContent = "";
    elements = [];

    indexCounter = 0;
    charCounter = 0;
    correctCharCounter = 0;
    wordCounter = 0;
    correntWordCounter = 0;
    beginPoint = 0;
    inputLm.value = "";
    running = false;

    Generate(wordMin);
    clearInterval(intervalId);
    infoLm.hidden = true;
    scoreBoxLm.hidden = true;
    typeBoxLm.hidden = false;

    elements[indexCounter].scrollIntoView({
        block: "start",
        inline: "start"
    });

    inputLm.focus();
}

function Start()
{
    timeout = timeoutMax;
    OnTick();
    intervalId = setInterval(OnTick, 1000);
    beginPoint = Date.now();
    infoLm.hidden = false;
}

function Finish()
{
    let accr = 0;

    if (charCounter > 0) 
    {
        accr = correctCharCounter / charCounter * 100;
    }

    wpmLm.textContent = CalculateWpm().toFixed(1);
    accuracyLm.textContent = accr.toFixed(1);

    wordDetailLm.textContent = correntWordCounter + "/" + wordCounter;
    wordDetailLm.textContent += wordCounter > 1 ? " words" : " word";

    keystrokeDetailLm.textContent = correctCharCounter + "/" + charCounter;
    keystrokeDetailLm.textContent += charCounter > 1 ? " keystrokes" : " keystroke";

    clearInterval(intervalId);
    typeBoxLm.hidden = true;
    scoreBoxLm.hidden = false;
}

function OnTick()
{
    if (timeout <= 0)
    {
        Finish();
    }
    
    let formated = "";
    const min = Math.floor(timeout / 60);
    if (min > 0)
    {
        formated += min + "m ";
        formated += (timeout % 60) + "s";
    }
    else
    {
        formated += timeout + "s";
    }

    timerLm.textContent = formated;
    currentWpmLm.textContent = CalculateWpm().toFixed(1) + "w/m";
    timeout--;
}

function OnInput(ev)
{
    if (!running) 
    {
        running = true;
        Start();
    }

    if (ev.data !== " ")
    {
        const cutted = elements[indexCounter].textContent.slice(0, inputLm.value.length);
        if (inputLm.value !== cutted)
        {
            elements[indexCounter].classList = ["ActiveWrong"];
        }
        else
        {
            elements[indexCounter].classList = ["Active"];
        }
        prevTypedWord = inputLm.value;
    }
    else
    {
        if (indexCounter + wordAboutGen > elements.length)
        {
            Generate(wordScaleGen);
        }

        elements[indexCounter].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
        });

        if (prevTypedWord === elements[indexCounter].textContent)
        {
            elements[indexCounter].classList = ["Typed"];
            correctCharCounter += inputLm.value.length;
            ++correntWordCounter;
        }
        else
        {
            elements[indexCounter].classList = ["TypedWrong"];
        }

        charCounter += inputLm.value.length;
        ++wordCounter;
        ++indexCounter;
        inputLm.value = "";
        elements[indexCounter].classList = ["Active"];
    }
}

function Generate(n)
{
    for (let i = 0; i < n; ++i)
    {
        const value = words[Math.floor(Math.random() * words.length)];
        const word = document.createElement("span");
        const space = document.createElement("span");
        word.textContent = value;
        space.textContent = " ";
        boardLm.appendChild(word);
        boardLm.appendChild(space);

        elements.push(word);
    };
}

function CalculateWpm()
{
    const timeSpent = Date.now() - beginPoint;
    return (correctCharCounter / 5) / (timeSpent / 60e3);
}

function OnSaveSettings()
{
    const formTheme = Array.from(themeLms).find(el => el.checked).value;
    const formTime = Array.from(timeLms).find(el => el.checked).value;

    timeoutMax = parseInt(formTime);
    themeLm.href = formTheme + ".css";

    localStorage.setItem("Time", formTime);
    localStorage.setItem("Theme", formTheme);
}

Initialize();
Reset();
