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

const userQuestionsArray = [ "How old are you?", "User question two.", "User question three.", "User question four.", "User question five." ]

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

document.addEventListener('DOMContentLoaded', generateUserQuestions)

function fadeTheFadeButtons (targetButton) {
    targetButton.classList.add('hidden');
    setTimeout(function() {
        var emptySpace = document.createElement('button');
        emptySpace.className = 'EmptySpace';
        var textNode = document.createTextNode('Undo');
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
        
        targetButton.classList.add('hidden');
        setTimeout(function() {
            for(let i=0; i < removedButtons.length; i++){
                var undoButtons = createAndAppendElementToSection('UserQuestions','button', removedButtons[i]);
                undoButtons.className = 'fadeButton';};
            targetButton.remove();
            removeAllButtonsWithClass("ClickedButton");
            removedButton = [];
            removedButtons = [];
            meTalkingContent();},
            1000);
            
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
        }}, 1000)
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
  