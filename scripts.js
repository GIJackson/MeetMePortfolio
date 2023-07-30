document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.getElementById('navbar');
    var list = navbar.querySelector('ul');

    function hideListItems() {
        var listItems = list.children;
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].style.visibility = 'hidden';
        }
        setTimeout(function() {
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].style.visibility = 'visible';
            }
        }, 10000);
    }

    hideListItems();
});

document.addEventListener('DOMContentLoaded', meTalkingContent());

function meTalkingContent(){
    let meTalking = document.getElementById('MeTalking');
    meTalking.textContent = "Hello!";
};

const userQuestionsArray = [ "How old are you?", "Do something cool.", "User question three.", "User question four.", "User question five." ]

let removedButton = [];
let removedButtons = [];

function removeAllButtonsWithClass(className) {
    let buttons = document.querySelectorAll('.' + className);
    buttons.forEach(function(button) {
        removedButtons.push(button.textContent);
        button.remove();
    });
    observeNewButtons()
}

function generateUserQuestions() {

    for(let i = 0; i < userQuestionsArray.length; i++) {

        let fadeButton = createAndAppendElementToSection ('UserQuestions', 'button', userQuestionsArray[i]);
        fadeButton.className = 'fadeButton';
        fadeButton.addEventListener('click', handleButtonClick);
    }
    observeNewButtons()
}

function validateIsNumber(input) {
    const numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(input)) {
        return false;
    }
    else {
        return true;
    }
};

function validateNumberLow(input){
    const numberValue = parseInt(input, 10);
    return numberValue >= 1;
};

function validateNumberHigh(input){
    const numberValue = parseInt(input, 10);
    return numberValue <= 105;
};

function createInputFieldWithValidation() {
    const sectionElement = document.getElementById('UserQuestions');
    const inputField = document.createElement('input');
    sectionElement.appendChild(inputField);
    inputField.type = 'text';
    inputField.id = 'HowOldAreYou';

    inputField.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        const userInput = inputField.value.trim();
        const numberHigh = validateNumberHigh(userInput);
        const numberLow = validateNumberLow(userInput);
        if (userInput === '') {
          alert('Please enter valid information.');
        }
        if (validateIsNumber(userInput)) { 
            if (numberLow){
                if (numberHigh){
                    alert(`Wow! You\'re ${userInput} years old? That's cool!`);
                    } else {
                        alert(`There\'s no way you\'re ${userInput} years old. Try again!`);
                    }
                } else {
                    alert(`Not possible. Try again!`);
                }
            } else {
                alert(`I don\'t think that\'s a number. Try again!`)
            }
            inputField.value = '';
        }
    });
}; //Current limitation: can't deal with word number mixes ex. "Twenty 1" is unrecognizable.
  
document.addEventListener('DOMContentLoaded', generateUserQuestions)

function fadeTheFadeButtons (targetButton) {
    targetButton.classList.add('hidden');
    setTimeout(function() {
        var emptySpace = document.createElement('button');
        emptySpace.className = 'EmptySpace';
        var textNode = document.createTextNode('Go Back');
        emptySpace.appendChild(textNode);
        removedButton.push(targetButton.textContent);
        targetButton.parentNode.insertBefore(emptySpace, targetButton);
        removeAllButtonsWithClass("fadeButton");
    }, 1000);
    observeNewButtons();
};

function createAndAppendElementToSection(sectionId, elementType, content) {
    const section = document.getElementById(sectionId);

    if (section) {
        const newElement = document.createElement(elementType);

        if (content) {
        newElement.textContent = content;
        }

        section.appendChild(newElement);

        observeNewButtons()
        return newElement;
    } 
    else {
        console.error(`Section element with ID '${sectionId}' not found.`);
        return null;
    }
};

function handleButtonClick(event) {
    
    const targetButton = event.target;

    if (targetButton.className === 'EmptySpace') {
        const deleteElement = document.getElementById('HowOldAreYou');
        targetButton.classList.add('hidden');
        setTimeout(function() {
            for(let i=0; i < removedButtons.length; i++){
                var undoButtons = createAndAppendElementToSection('UserQuestions','button', removedButtons[i]);
                undoButtons.className = 'fadeButton';};
            targetButton.remove();
            if(deleteElement != null){
                deleteElement.remove();
            }
            removeAllButtonsWithClass("ClickedButton");
            removedButton = [];
            removedButtons = [];
            meTalkingContent();
        },1000);
            
        observeNewButtons();
    }

    if (targetButton.className === 'fadeButton')
    {
        fadeTheFadeButtons(targetButton);
        setTimeout(function(){
            if (removedButton[0] === removedButtons[0]) {
                let meTalking = document.getElementById("MeTalking");
                let today = new Date();
                const myBirthday = new Date('06-27-1995');
                const differenceInYears = today.getFullYear() - myBirthday.getFullYear();
                meTalking.textContent = 'I am ' + differenceInYears + ' years old! How old are you?';
                createInputFieldWithValidation();
            }  
             
        }, 1000)
    };
};

function observeNewButtons() {

const buttonContainer = document.getElementById('UserQuestions');

const observer = new MutationObserver(function(mutationsList, observer) {
    for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'BUTTON') {
            node.addEventListener('click', handleButtonClick);
        }
        });
    }
    }
});
observer.observe(buttonContainer, { childList: true });
};

  