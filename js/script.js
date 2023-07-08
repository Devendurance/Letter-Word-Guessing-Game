const inputs = document.querySelector(".inputwrapper")
const resetBtn = document.querySelector(".resetBtn")
const hint = document.querySelector(".hint span")
const guessLeft = document.querySelector(".guess-left span")
const wrongLetter = document.querySelector(".wrong-letter span")
const typingInput = document.querySelector(".typing-input")
let maxGuesses, corrects = [], incorrects = []
let word;

const randomWord = ()=> {
    //getting random object from wordlist
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; //getting word of random object
    maxGuesses = 8
    corrects = []
    incorrects = []


    hint.innerText = ranObj.hint
    maxGuesses.innerText = maxGuesses
    wrongLetter.innerText = incorrects

    let html = ""
    for(i = 0 ; i < word.length; i++){
        html += `<input type="text" class="boxes" disabled>`;
    }
    inputs.innerHTML = html
}
randomWord();

const initGame = (e) =>{
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)  
    && !corrects.includes(key)){
        if(word.includes(key)){// if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                //showing matched letter in the input value
                if(word[i] === key){
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else{
            incorrects.push(` ${key}`)
            maxGuesses -- //decrement guesses by 1
        }
        guessLeft.innerText = maxGuesses
        wrongLetter.innerText = incorrects
    }
    typingInput.value = ""

    setTimeout( ()=>{
        if(corrects.length === word.length) {// if user found all letters in the word
            alert(`Congrats! You found the word ${word.toUpperCase()}`)
            randomWord()
        }
        else if (maxGuesses < 1){// if user couldn't find all guesses
            
        alert("You are out of moves")
        for ( let i = 0; i < word.length; i++){
            //show all letters on the input
            inputs.querySelectorAll("input")[i].value = word[i]
        }
        }
    }, 2000)


}

resetBtn.addEventListener("click",randomWord)
typingInput.addEventListener("input", initGame)
document.addEventListener("keydown", () => {
    typingInput.focus()
})