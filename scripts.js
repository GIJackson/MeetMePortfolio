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

const userQuestionsArray = [ "How old are you?", "Do something cool.", "Tell me about yourself.", "User question four.", "User question five." ]

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
    inputField.id = 'InputField';

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

function createInputFieldForCounting() {
    const sectionElement = document.getElementById('UserQuestions');
    const inputField = document.createElement('input');
    sectionElement.appendChild(inputField);
    inputField.type = 'text';
    inputField.id = 'InputField';

    inputField.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        const userInputTotal = inputField.value.length;
          alert(`That adds up to ${userInputTotal} characters!`);
          inputField.value = '';
        }
    })
};

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
        const deleteElement = document.getElementById('InputField');
        const deleteWeather = document.getElementById('weather');
        targetButton.classList.add('hidden');
        setTimeout(function() {
            for(let i=0; i < removedButtons.length; i++){
                var undoButtons = createAndAppendElementToSection('UserQuestions','button', removedButtons[i]);
                undoButtons.className = 'fadeButton';};
            targetButton.remove();

            if(deleteElement != null){
                deleteElement.remove();
            }
            
            if(deleteWeather != null){
                deleteWeather.remove();
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
        let meTalking = document.getElementById("MeTalking");
        setTimeout(function(){
            if (removedButton[0] === removedButtons[0]) {
                let today = new Date();
                const myBirthday = new Date('06-27-1995');
                const differenceInYears = today.getFullYear() - myBirthday.getFullYear();
                meTalking.textContent = 'I am ' + differenceInYears + ' years old! How old are you?';
                createInputFieldWithValidation();
            }
            if (removedButton[0] === removedButtons[1]){
                createInputFieldForCounting()
                meTalking.textContent = 'Okay! Type up something for me to look at.'
            }
            if (removedButton[0] === removedButtons[2]){
                const section1 = document.getElementById('MePicture');
                const section3 = document.getElementById('UserQuestions');
                const newSectionHTML = '<section id="weather"></section>'
                section1.insertAdjacentHTML('afterbegin', newSectionHTML);getWeatherData()
                .then((data) => {
                    updateWeatherInfo(data);
                });
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

const apiKey = 'jDZWAZRAbDAyL4FVN56JTMlxxqGDNzl0';
const locationKey = '333278';

async function getWeatherData() {
    try {
        const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`);
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherInfo(weatherData) {
    const weatherContainer = document.getElementById('weather');
    const weatherInfo = `
        <h2>${weatherData.WeatherText}</h2>
        <p>Temp: ${weatherData.Temperature.Imperial.Value}°F</p>
        <p>Humidity: ${weatherData.RelativeHumidity}%</p>
    `;
    let meTalking = document.getElementById("MeTalking");
    let temp = weatherData.Temperature.Imperial.Value
    const myComfort =
    temp < 32
      ? "Shooey, that\'s too cold for me!"
      : temp < 70
      ? "I just need to put something on."
      : temp <= 85
      ? "Ahh. This is just right for me."
      : "Y\'owch that\'s too hot for me!";
      meTalking.textContent = myComfort
    weatherContainer.innerHTML += weatherInfo;
}
