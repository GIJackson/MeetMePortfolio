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

var removedButton = [];
var removedButtons = [];

function removeAllButtonsWithClass(className) {
    var buttons = document.querySelectorAll('.' + className);
    buttons.forEach(function(button) {
        removedButtons.push(button.textContent);
        button.remove();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var fadeButtons = document.querySelectorAll('.fadeButton');

    fadeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.classList.add('hidden');
            removedButton.push(button.textContent);
            removeAllButtonsWithClass('fadeButton')
            var undoButton = createAndAppendElementToSection('UserQuestions', 'button', 'Undo');
            undoButton.className = 'EmptySpace';
            removedButtons.splice(removedButtons.indexOf(removedButton[0]), 1);
        });
    });
});

const buttonContainer = document.getElementById('UserQuestions');
  
buttonContainer.addEventListener('click', handleButtonClick);
  
function handleButtonClick(event) {
    const targetButton = event.target;

    if (targetButton.className === 'EmptySpace') {

        var clickedButton = createAndAppendElementToSection('UserQuestions','button', removedButton[0]);

        clickedButton.className = 'fadeButton';

        for(let i=0; i < removedButtons.length; i++){
            var undoButtons = createAndAppendElementToSection('UserQuestions','button', removedButtons[i]);
            undoButtons.className = 'fadeButton';
            //need to do something here that retains the order of the buttons because as of right now it puts the removed button at the top and the rest of the buttons
        }
        targetButton.remove();
        removedButton = [];
        removedButtons = [];
    }

    if (targetButton.className === 'fadeButton')
    {
        var fadeButtons = document.querySelectorAll('.fadeButton');

        fadeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                button.classList.add('hidden');

                setTimeout(function() {
                    var emptySpace = document.createElement('button');
                    emptySpace.className = 'EmptySpace';
                    var textNode = document.createTextNode('Undo');
                    emptySpace.appendChild(textNode);
                    removedButton.push(button.textContent);
                    button.parentNode.insertBefore(emptySpace, button);
                    removeAllButtonsWithClass("fadeButton");
                    removedButtons.splice(removedButtons.indexOf(removedButton[0]), 1);
                }, 1000);
            });
        });
    }
  };

  function createAndAppendElementToSection(sectionId, elementType, content) {
    const section = document.getElementById(sectionId);
  
    if (section) {
      const newElement = document.createElement(elementType);

      if (content) {
        newElement.textContent = content;
      }
  
      section.appendChild(newElement);
  
      return newElement;
    } else {
      console.error(`Section element with ID '${sectionId}' not found.`);
      return null;
    }
  }