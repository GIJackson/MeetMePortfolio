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

var removedButtons = [];

document.addEventListener('DOMContentLoaded', function() {
    
    
    var fadeButtons = document.querySelectorAll('.fadeButton');
    
    fadeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.classList.add('hidden');
            
            setTimeout(function() {
                button.style.display = 'none';
                var emptySpace = document.createElement('button');
                emptySpace.className = 'EmptySpace';
                var textNode = document.createTextNode('Undo');
                emptySpace.appendChild(textNode);
                removedButtons.push(button.textContent);
                button.parentNode.insertBefore(emptySpace, button);
            }, 1000);
        });
    });
});