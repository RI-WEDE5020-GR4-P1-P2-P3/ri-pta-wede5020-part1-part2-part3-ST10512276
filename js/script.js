$(document).ready(function () {
    // Accordion on the About Us page
    $(".accordion-title").click(function () {
        $(this).next(".accordion-content").slideToggle();
    });

    // Back to Top button, fades in after scrolling down
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }
    });

    // Slide smoothly to the top when the button is clicked
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });

    // Open or Closed message on the Home page
    var hoursSection = document.getElementById("hours-section");

    if (hoursSection !== null) {
        var now = new Date();
        var day = now.getDay();     // 0 = Sunday, 1 = Monday ... 6 = Saturday
        var hour = now.getHours();  // 0 to 23
        var isOpen = false;

        if (day >= 1 && day <= 5 && hour >= 8 && hour < 17) {
            isOpen = true;
        }
        if (day === 6 && hour >= 8 && hour < 13) {
            isOpen = true;
        }

        var message = document.createElement("p");

        if (isOpen) {
            message.textContent = "We are OPEN right now. Come and enjoy a meal!";
            message.classList.add("status-open");
        } else {
            message.textContent = "We are CLOSED right now. Please check our opening hours and visit us again soon. We look forward to serving you!";
            message.classList.add("status-closed");
        }

        hoursSection.appendChild(message);
    }

    // Menu filter, search and sort on the Menu page
    var searchBox = document.getElementById("search-box");

    if (searchBox !== null) {
        var sortSelect = document.getElementById("sort-select");
        var noResults = document.getElementById("no-results");
        var filterButtons = document.querySelectorAll(".filter-button");
        var categories = document.querySelectorAll(".menu-category");
        var menuGrid = document.querySelector(".menu-grid");
        var chosenCategory = "all";

        categories.forEach(function (category) {
            category.querySelectorAll(".menu-item").forEach(function (item, index) {
                item.setAttribute("data-order", index);
            });
        });

        // Show or hide meals using the category button and the search words
        var updateMenu = function () {
        var searchText = searchBox.value.toLowerCase();
            var shownCategories = 0;

            categories.forEach(function (category) {
                var shownItems = 0;

                category.querySelectorAll(".menu-item").forEach(function (item) {
                    var itemText = item.textContent.toLowerCase();

                    if (itemText.indexOf(searchText) !== -1) {
                        item.style.display = "";
                        shownItems++;
                    } else {
                        item.style.display = "none";
                    }
                });

                var rightCategory = (chosenCategory === "all" || category.getAttribute("data-category") === chosenCategory);

                if (rightCategory && shownItems > 0) {
                    category.style.display = "";
                    shownCategories++;
                } else {
                    category.style.display = "none";
                }
            });

            menuGrid.classList.toggle("one-column", shownCategories === 1);

            if (shownCategories === 0) {
                noResults.style.display = "block";
            } else {
                noResults.style.display = "none";
            }
        };

        var sortMenu = function () {
            var sortChoice = sortSelect.value;

            categories.forEach(function (category) {
                var items = Array.from(category.querySelectorAll(".menu-item"));

                items.sort(function (a, b) {
                    var nameA = a.querySelector("strong").textContent;
                    var nameB = b.querySelector("strong").textContent;
                    var priceA = parseInt(a.querySelector(".price").textContent.replace("R", ""));
                    var priceB = parseInt(b.querySelector(".price").textContent.replace("R", ""));

                    if (sortChoice === "price-low") {
                        return priceA - priceB;
                    }
                    if (sortChoice === "price-high") {
                        return priceB - priceA;
                    }
                    if (sortChoice === "name") {
                        return nameA.localeCompare(nameB);
                    }
                    return Number(a.getAttribute("data-order")) - Number(b.getAttribute("data-order"));
                });

                items.forEach(function (item) {
                var itemText = item.querySelector("p").textContent.toLowerCase();
                });
            });
        };

        searchBox.addEventListener("input", updateMenu);
        sortSelect.addEventListener("change", sortMenu);

        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                chosenCategory = button.getAttribute("data-category");
                updateMenu();

                filterButtons.forEach(function (otherButton) {
                    otherButton.classList.remove("active");
                });
                button.classList.add("active");
            });
        });
    }

    // Gallery lightbox on the Gallery page
    $(".gallery-item img").click(function () {
        $(".lightbox-image").attr("src", $(this).attr("src"));
        $(".lightbox-image").attr("alt", $(this).attr("alt"));
        $(".lightbox-caption").text($(this).attr("alt"));
        $(".lightbox").fadeIn();
    });

    // Close the lightbox when it is clicked
    $(".lightbox").click(function () {
        $(this).fadeOut();
    });

    // Close the lightbox with the Escape key
    $(document).keydown(function (event) {
        if (event.key === "Escape") {
            $(".lightbox").fadeOut();
        }
    });

    // Popular meals loaded with JavaScript on the Home page
    var popularMeals = document.getElementById("popular-meals");

    if (popularMeals !== null) {
        var meals = [
            { name: "Full Breakfast", price: "R55", image: "image/english-breakfast-fried-eggs-beans-bacon-toast_106006-5319.jpg", alt: "Full breakfast with eggs, beans, bacon and toast" },
            { name: "Beef/Chicken Burger, Chips", price: "R45", image: "image/burger-beef-chips.png", alt: "Beef or chicken burger with chips" },
            { name: "Juice (All Flavours)", price: "R15", image: "image/fruit-juice.jpg", alt: "Fruit juice, all flavours" }
        ];

        var cards = "";

        for (var i = 0; i < meals.length; i++) {
            cards += '<div class="popular-card">';
            cards += '<img src="' + meals[i].image + '" alt="' + meals[i].alt + '" loading="lazy">';
            cards += '<h3>' + meals[i].name + '</h3>';
            cards += '<p class="price">' + meals[i].price + '</p>';
            cards += '</div>';
        }

        popularMeals.innerHTML = cards;
    }

    // WhatsApp share link uses the page title and the page address
    $("#share-whatsapp").attr("href", "https://wa.me/?text=" + encodeURIComponent(document.title + " " + window.location.href));

    // Shopping cart, saved in the browser with localStorage
    var getCart = function () {
        var saved = localStorage.getItem("rosebankCart");

        if (saved === null) {
            return [];
        }
        return JSON.parse(saved);
    };

    var saveCart = function (cart) {
        localStorage.setItem("rosebankCart", JSON.stringify(cart));
    };

    // Shows the total number of items next to CART in the navigation
    var updateCartCount = function () {
        var cart = getCart();
        var total = 0;

        for (var i = 0; i < cart.length; i++) {
            total += cart[i].quantity;
        }
        $("#cart-count").text(total);
    };

    updateCartCount();

    // Put an Add to Cart button inside every meal on the Menu page
    $(".menu-item").each(function () {
        $(this).find("p").wrap('<div class="menu-info"></div>');
        $(this).find(".menu-info").append('<button class="add-button">ADD TO CART</button>');
    });

    // Add the meal to the cart when the button is clicked
    $(document).on("click", ".add-button", function () {
        var item = $(this).closest(".menu-item");
        var name = item.find("strong").text();
        var price = parseInt(item.find(".price").text().replace("R", ""));
        var cart = getCart();
        var found = false;

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].quantity++;
                found = true;
            }
        }

        if (found === false) {
            cart.push({ name: name, price: price, quantity: 1 });
        }

        saveCart(cart);
        updateCartCount();

        // Show a short message on the button
        var button = $(this);
        button.text("ADDED!");
        setTimeout(function () {
            button.text("ADD TO CART");
        }, 1000);
    });

    // Contact form validation and email on the Contact page
    var contactForm = document.getElementById("contact-form");

    if (contactForm !== null) {
        var recipient = "Cafeteria@rbipta.ac.za";

        // Show an error message under a field and mark the field red
        var showError = function (fieldName, message) {
            document.getElementById("contact-" + fieldName + "-error").textContent = message;
            document.getElementById("contact-" + fieldName).classList.add("invalid");
        };

        // Counts the characters typed in the message box
        $("#contact-message").on("input", function () {
            $("#contact-count").text($(this).val().length + " / 500");
        });

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Clear the old error messages
            $(".error-message").text("");
            $(".form-box").removeClass("invalid");
            $("#contact-success").text("");

            var name = document.getElementById("contact-name").value.trim();
            var email = document.getElementById("contact-email").value.trim();
            var phone = document.getElementById("contact-phone").value.replace(/ /g, "");
            var type = document.getElementById("contact-type").value;
            var message = document.getElementById("contact-message").value.trim();
            var allGood = true;

            // Name: letters, spaces, hyphens and apostrophes, at least 2 characters
            if (name.length < 2 || !/^[A-Za-z' -]+$/.test(name)) {
                showError("name", "Please enter your name using letters only (at least 2 letters).");
                allGood = false;
            }

            // Email: must look like name@site.com
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError("email", "Please enter a valid email address, e.g. name@example.com.");
                allGood = false;
            }

            // Phone: South African number, 10 digits starting with 0
            if (!/^0[0-9]{9}$/.test(phone)) {
                showError("phone", "Please enter a 10 digit phone number starting with 0.");
                allGood = false;
            }

            // Type of message must be chosen
            if (type === "") {
                showError("type", "Please choose a type of message.");
                allGood = false;
            }

            // Message: 10 to 500 characters
            if (message.length < 10 || message.length > 500) {
                showError("message", "Your message must be between 10 and 500 characters.");
                allGood = false;
            }

            // Stop here if anything is wrong
            if (allGood === false) {
                return;
            }

            // Put the information together into an email
            var subject = type + " from " + name;
            var body = "Name: " + name + "\r\n" +
                       "Email: " + email + "\r\n" +
                       "Phone: " + phone + "\r\n" +
                       "Type of message: " + type + "\r\n\r\n" +
                       "Message:\r\n" + message;

            window.location.href = "mailto:" + recipient + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

            $("#contact-success").text("Thank you! Your email app should now open. Please click Send in your email app to send the message.");
        });
    }

    // Catering enquiry form on the Enquiry page
    var enquiryForm = document.getElementById("enquiry-form");

    if (enquiryForm !== null) {
        // Show an error message under a field and mark the field red
        var showEnquiryError = function (fieldName, message) {
            document.getElementById("enquiry-" + fieldName + "-error").textContent = message;
            document.getElementById("enquiry-" + fieldName).classList.add("invalid");
        };

        // The earliest event date is tomorrow
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var tomorrowMonth = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
        var tomorrowDay = ("0" + tomorrow.getDate()).slice(-2);
        document.getElementById("enquiry-date").setAttribute("min", tomorrow.getFullYear() + "-" + tomorrowMonth + "-" + tomorrowDay);

        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Clear the old errors and the old result
            $(".error-message").text("");
            $(".form-box").removeClass("invalid");
            $("#enquiry-result").html("");

            var name = document.getElementById("enquiry-name").value.trim();
            var email = document.getElementById("enquiry-email").value.trim();
            var phone = document.getElementById("enquiry-phone").value.replace(/ /g, "");
            var dateText = document.getElementById("enquiry-date").value;
            var people = parseInt(document.getElementById("enquiry-people").value);
            var packageId = document.getElementById("enquiry-package").value;
            var notes = document.getElementById("enquiry-notes").value.trim();
            var allGood = true;

            // Name: letters, spaces, hyphens and apostrophes, at least 2 characters
            if (name.length < 2 || !/^[A-Za-z' -]+$/.test(name)) {
                showEnquiryError("name", "Please enter your name using letters only (at least 2 letters).");
                allGood = false;
            }

            // Email: must look like name@site.com
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showEnquiryError("email", "Please enter a valid email address, e.g. name@example.com.");
                allGood = false;
            }

            // Phone: 10 digits starting with 0
            if (!/^0[0-9]{9}$/.test(phone)) {
                showEnquiryError("phone", "Please enter a 10 digit phone number starting with 0.");
                allGood = false;
            }

            // Date: must be chosen, in the future and within 6 months
            if (dateText === "") {
                showEnquiryError("date", "Please choose the date of your event.");
                allGood = false;
            } else {
                var eventDate = new Date(dateText + "T00:00:00");
                var limit = new Date();
                limit.setMonth(limit.getMonth() + 6);

                if (eventDate < tomorrow.setHours(0, 0, 0, 0)) {
                    showEnquiryError("date", "The event date must be tomorrow or later.");
                    allGood = false;
                } else if (eventDate > limit) {
                    showEnquiryError("date", "Please choose a date within the next 6 months.");
                    allGood = false;
                }
            }

            // Number of people: 10 to 200
            if (isNaN(people) || people < 10 || people > 200) {
                showEnquiryError("people", "Please enter a number of people between 10 and 200.");
                allGood = false;
            }

            // Package must be chosen
            if (packageId === "") {
                showEnquiryError("package", "Please choose a meal package.");
                allGood = false;
            }

            // Notes are optional but cannot be longer than 200 characters
            if (notes.length > 200) {
                showEnquiryError("notes", "Your notes must be 200 characters or less.");
                allGood = false;
            }

            // Stop here if anything is wrong
            if (allGood === false) {
                return;
            }

            $("#enquiry-result").html("<p>Checking prices and availability...</p>");

            // AJAX: send the form data and read the prices without reloading the page
            $.ajax({
                url: "data/packages.json",
                method: "GET",
                dataType: "json",
                data: { package: packageId, people: people, date: dateText }
            }).done(function (data) {
                // Find the package the customer chose
                var chosen = null;

                for (var i = 0; i < data.packages.length; i++) {
                    if (data.packages[i].id === packageId) {
                        chosen = data.packages[i];
                    }
                }

                // Work out the cost
                var subtotal = chosen.price * people;
                var discount = 0;

                if (people >= data.discountFrom) {
                    discount = subtotal * data.discountPercent / 100;
                }
                var total = subtotal - discount;

                // Work out availability
                var weekday = eventDate.getDay();   // 0 = Sunday, 6 = Saturday
                var daysAhead = Math.round((eventDate - new Date().setHours(0, 0, 0, 0)) / 86400000);
                var available = true;
                var availabilityText = "Your date is available.";

                if (weekday === 0) {
                    available = false;
                    availabilityText = "Sorry, we are closed on Sundays. Please choose another date.";
                } else if (people > 100 && daysAhead < 5) {
                    available = false;
                    availabilityText = "Groups of more than 100 people need at least 5 days notice. Please choose a later date.";
                } else if (weekday === 6) {
                    availabilityText = "Your date is available. Please note that we close at 1pm on Saturdays, so collection must be before 1pm.";
                }

                // Show the response
                var result = '<div class="result-box">';
                result += "<h3>Thank you, " + name + "</h3>";
                result += "<p>" + chosen.name + " (" + chosen.includes + ")</p>";
                result += "<table>";
                result += "<tr><td>Price per person</td><td>R" + chosen.price + "</td></tr>";
                result += "<tr><td>Number of people</td><td>" + people + "</td></tr>";
                result += "<tr><td>Subtotal</td><td>R" + subtotal.toFixed(2) + "</td></tr>";
                result += "<tr><td>Group discount</td><td>-R" + discount.toFixed(2) + "</td></tr>";
                result += "<tr><td>Estimated total</td><td>R" + total.toFixed(2) + "</td></tr>";
                result += "</table>";
                result += "<p><strong>Availability:</strong> " + availabilityText + "</p>";
                result += "</div>";

                $("#enquiry-result").html(result);

                if (available === false) {
                    $("#enquiry-result .result-box").addClass("unavailable");
                }
            }).fail(function () {
                $("#enquiry-result").html('<p class="error-message">Sorry, the prices could not be loaded. Please try again later.</p>');
            });
        });
    }

    // Cart page, shows the meals the customer added
    var cartItems = document.getElementById("cart-items");

    if (cartItems !== null) {
        // Builds the cart table and the total from the saved cart
        var showCart = function () {
            var cart = getCart();
            var cartTotal = 0;

            if (cart.length === 0) {
                $("#cart-items").html('<p>Your cart is empty. Visit the <a href="menu.html" class="text-link">Menu page</a> to add some meals.</p>');
                $("#cart-summary").hide();
                return;
            }

            var rows = "";

            for (var i = 0; i < cart.length; i++) {
                var lineTotal = cart[i].price * cart[i].quantity;
                cartTotal += lineTotal;

                rows += "<tr>";
                rows += "<td>" + cart[i].name + "</td>";
                rows += "<td>R" + cart[i].price + "</td>";
                rows += '<td><button class="qty-button minus-button" data-index="' + i + '" aria-label="Decrease quantity">-</button> ';
                rows += cart[i].quantity;
                rows += ' <button class="qty-button plus-button" data-index="' + i + '" aria-label="Increase quantity">+</button></td>';
                rows += "<td>R" + lineTotal + "</td>";
                rows += '<td><button class="remove-button" data-index="' + i + '">REMOVE</button></td>';
                rows += "</tr>";
            }

            var table = '<table class="cart-table">';
            table += "<tr><th>Meal</th><th>Price</th><th>Quantity</th><th>Total</th><th>Remove</th></tr>";
            table += rows;
            table += "</table>";

            $("#cart-items").html(table);
            $("#cart-total").text("R" + cartTotal);
            $("#cart-summary").show();
        };

        // Add one more of a meal
        $(document).on("click", ".plus-button", function () {
            var cart = getCart();
            var index = $(this).attr("data-index");

            cart[index].quantity++;
            saveCart(cart);
            updateCartCount();
            showCart();
        });

        // Take one away, and remove the meal when the quantity reaches 0
        $(document).on("click", ".minus-button", function () {
            var cart = getCart();
            var index = $(this).attr("data-index");

            cart[index].quantity--;

            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }

            saveCart(cart);
            updateCartCount();
            showCart();
        });

        // Remove the whole meal from the cart
        $(document).on("click", ".remove-button", function () {
            var cart = getCart();
            var index = $(this).attr("data-index");

            cart.splice(index, 1);
            saveCart(cart);
            updateCartCount();
            showCart();
        });

        // Empty the whole cart after the customer confirms
        $("#clear-cart").click(function () {
            if (confirm("Remove all meals from your cart?")) {
                saveCart([]);
                updateCartCount();
                showCart();
            }
        });
                // Checkout form on the Cart page
        var checkoutForm = document.getElementById("checkout-form");

        // Show an error message under a field and mark the field red
        var showCheckoutError = function (fieldName, message) {
            document.getElementById("checkout-" + fieldName + "-error").textContent = message;
            document.getElementById("checkout-" + fieldName).classList.add("invalid");
        };

        checkoutForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Clear the old error messages
            $(".error-message").text("");
            $(".form-box").removeClass("invalid");

            var name = document.getElementById("checkout-name").value.trim();
            var phone = document.getElementById("checkout-phone").value.replace(/ /g, "");
            var time = document.getElementById("checkout-time").value;
            var payment = document.getElementById("checkout-payment").value;
            var notes = document.getElementById("checkout-notes").value.trim();
            var allGood = true;

            // Name: letters, spaces, hyphens and apostrophes, at least 2 characters
            if (name.length < 2 || !/^[A-Za-z' -]+$/.test(name)) {
                showCheckoutError("name", "Please enter your name using letters only (at least 2 letters).");
                allGood = false;
            }

            // Phone: 10 digits starting with 0
            if (!/^0[0-9]{9}$/.test(phone)) {
                showCheckoutError("phone", "Please enter a 10 digit phone number starting with 0.");
                allGood = false;
            }

            // Collection time must be inside the opening hours
            if (time === "") {
                showCheckoutError("time", "Please choose a collection time.");
                allGood = false;
            } else {
                var timeParts = time.split(":");
                var minutes = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
                var today = new Date().getDay();   // 0 = Sunday, 6 = Saturday
                var closing = 17 * 60;

                if (today === 6) {
                    closing = 13 * 60;
                }

                if (today === 0) {
                    showCheckoutError("time", "Sorry, we are closed on Sundays. Please order again on Monday.");
                    allGood = false;
                } else if (minutes < 8 * 60 || minutes > closing) {
                    showCheckoutError("time", "Collection time must be between 08:00 and 17:00 (13:00 on Saturdays).");
                    allGood = false;
                }
            }

            // Payment method must be chosen
            if (payment === "") {
                showCheckoutError("payment", "Please choose a payment method.");
                allGood = false;
            }

            // Notes are optional but cannot be longer than 100 characters
            if (notes.length > 100) {
                showCheckoutError("notes", "Your notes must be 100 characters or less.");
                allGood = false;
            }

            // Stop here if anything is wrong
            if (allGood === false) {
                return;
            }

            // Build the order confirmation from the cart
            var cart = getCart();
            var orderTotal = 0;
            var orderNumber = "RB" + Math.floor(1000 + Math.random() * 9000);
            var rows = "";

            for (var i = 0; i < cart.length; i++) {
                var lineTotal = cart[i].price * cart[i].quantity;
                orderTotal += lineTotal;
                rows += "<tr><td>" + cart[i].quantity + " x " + cart[i].name + "</td><td>R" + lineTotal + "</td></tr>";
            }

            var result = '<div class="result-box">';
            result += "<h3>Thank you, " + name + "! Your order is placed.</h3>";
            result += "<p><strong>Order number:</strong> " + orderNumber + "</p>";
            result += "<p><strong>Collection time:</strong> " + time + " at the cafeteria</p>";
            result += "<p><strong>Payment:</strong> " + payment + "</p>";
            result += "<table>" + rows;
            result += "<tr><td>Total</td><td>R" + orderTotal + "</td></tr></table>";
            result += "</div>";

            $("#order-confirmation").html(result);

            // Notes are added with .text() so anything typed is shown as plain text
            if (notes !== "") {
                $("#order-confirmation .result-box").append($("<p></p>").text("Notes: " + notes));
            }

            // Empty the cart, reset the form and go to the confirmation
            saveCart([]);
            updateCartCount();
            checkoutForm.reset();
            showCart();
            $("html, body").animate({ scrollTop: $("#order-confirmation").offset().top - 20 }, 400);
        });

        showCart();
    }
});