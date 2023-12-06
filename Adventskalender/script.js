document.addEventListener("DOMContentLoaded", function () {
    // Get the container element
    var container = document.getElementById("container");

    // Create 24 div elements
    for (var i = 1; i <= 24; i++) {
        // Create a div element
        var square = document.createElement("div");

        // Set the class and id attributes
        square.className = "square";
        square.id = "square-" + i;

        // Set the inner text to the current id
        square.innerText = i;

        // Check if the current date's day is greater than or equal to the square's id
        if (new Date().getDate() >= i) {
            // Add a click event listener to each square
            square.addEventListener("click", function () {
                // Change the background color to light blue
                this.style.backgroundColor = "#87CEEB";
                
                // Change the inner text to a star
                this.innerText = "★";

                // Remove the click event listener to prevent further clicks
                this.removeEventListener("click", arguments.callee);
            });
        }

        // Append the div to the container
        container.appendChild(square);
    }
});
