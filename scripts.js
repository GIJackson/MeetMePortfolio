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

    // Deactivate hideListItems function when a navbar link is clicked
    var navbarLinks = navbar.querySelectorAll('a');
    navbarLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // Stop or deactivate the hideListItems functionality here
            console.log('hideListItems deactivated');
        });
    });
});
