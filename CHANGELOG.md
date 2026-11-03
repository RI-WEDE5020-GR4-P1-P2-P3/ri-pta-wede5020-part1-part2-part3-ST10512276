## Changelog

### 12-08-2026
-Created project folder and file structure
-Added empty HTML file for all six pages

### 13-08-2026
-Expanded README with full project overview,pages,technology and structure
-Added semantic HTML structure (header, nav, main, footer) to index.html
-Added Home page content
-Added semantic structure to about.html and content
-Added semantic structure to feedback.html and content
-Added semantic structure to contact.html and content
-Added semantic structure to menu.html and content

### 14-08-2026
-Added semantic structure to gallery.html and content
-Added CSS styling
-Committed All the changes

### 15-09-2026
-Added missing sitemap diagram to docs folder
-Fixed oversized images appearance on Home,About Us and Contact page by adding image sizing rules to style.css
-Added the embedded Google Map on contact.html
-Corrected Typos

### 16-09-2026
-Converted heading and paragraph font sizes from em to rem for predictable, non-compounding sizing

### 17-09-2026
-Added responsive breakpoints for tablet (1024px) and mobile (600px): Gallery grid steps 3 → 2 → 1 columns, Menu grid steps 2 → 1 column, nav stacks vertically on mobile

### 18-09-2026
-Converted menu item image sizing from fixed px to em
-Added srcset and sizes attributes to the Home page hero image for responsive image loading
-Added Responsive Testing section to README with desktop/tablet/mobile screenshots (docs/screenshots/)

## 27-10-2026
-Fixed all typos
-Added the Rosebank International Cafeteria Logo to the header 
-Added header-top, header-text and site-logo rules to style.css so the logo sits on the top left
-Changed the Navigation Bar into a Menu Bar on mobile phones.
-Fixed the responsive rules in style.css by adding the 1024px and 600px media queries
-Improved the Feedback form by adding a label, id and name to the comment box and making the name field required
-Added the form-box class to the Feedback form so the fields fit on small screens
-Fixed the Embedded Google Map on the Contact page so it fits all screens

## 28-10-2026
- Added an accordion FAQ section to the About Us page using jQuery.
- Created js/script.js and linked jQuery on the About Us page.
- Added a Get Directions button under the Google Map on the Contact page
- Added hover transitions to the navigation links and zoom effects to the menu and gallery images
- Added a fade-in animation to the page sections using CSS keyframes
- Added a Back to Top button with jQuery fadeIn, fadeOut and animate on all pages
- Linked jQuery and script.js on all pages
- Added an Open or Closed message on the Home page using JavaScript Date and createElement
- Added Menu filter buttons using data attributes, querySelectorAll and classList
- Added status and filter button styles to style.css
- Changed the logo link to the Home page on all pages
- Added a lightbox to the Gallery page that shows the clicked image in a larger view using jQuery
- Added lightbox styles to style.css
- Added a Close option using a click or the Escape key
- Added a Popular Meals section to the Home page that is loaded dynamically with JavaScript using an array of meals and a for loop
- Added Popular Meals card styles to style.css
- Added a search box to the Menu page that filters meals as the visitor types
- Added a Sort by dropdown to sort meals by price or name
- Combined the category buttons, search and sort so they work together
- Added a no results message and menu tools styles

## 29-10-2026
- Added SEO keyword research with Google screenshots to the README and used the keywords in the page text
- Added a unique title tag and meta description to every page
- Checked the heading structure (one H1 per page) and changed the Popular Meals names to H3
- Renamed images with spaces or unclear names to descriptive file names and updated the paths in the HTML and JavaScript files
- Improved the alt text on the Home, About Us, Contact and Gallery images
- Added internal links inside the page text and styled them with the text-link class
- Tested the website at phone and tablet sizes and ran Lighthouse on the Home page (Performance 73, Accessibility 94, Best Practices 100, SEO 100)
- Added the SEO sections to the README

## 30-10-2026
- Added social media links (Facebook, Instagram and Share on WhatsApp) to the footer of all 6 pages
- Used placeholder links for Facebook and Instagram because the cafeteria has no official accounts
- Added the social-links styles to style.css so the footer links are white and easy to read
- Added JavaScript that makes the WhatsApp link share the page the visitor is on
- Added Open Graph tags to the head of every page so shared links show a title, description and picture
- Added Local SEO structured data (schema.org) to the contact page with the name, phone number, email, location and opening hours
- Wrote a backlink plan in the README because backlinks cannot be built in code
- Added the SEO Off-Page section and updated the  README

## 31-10-2026
- Created a robots.txt file in the main folder that allows crawlers and hides the docs folder
- Created a sitemap.xml file that lists all 6 pages
- Used placeholder website addresses in robots.txt and sitemap.xml until the website is hosted
- Added loading="lazy" to the images on the Menu and Gallery pages and to the Popular Meals images in script.js
- Added a Content Security Policy and a referrer policy to the head of all 6 pages
- Added maxlength to the name and comment fields on the feedback page
- Tested all pages to make sure the menu, accordion, lightbox, filters and map still work
- Added the SEO Additional Requests section and 4 new references to the README

## 02-11-2026
- Added a Send Us a Message form to the contact page with name, email, phone number, message type and message fields
- Added JavaScript validation with error messages under each field and a live character counter for the message
- Compiled the validated form information into an email addressed to the cafeteria using a mailto link
- Added the error-message, success-message, char-count and invalid styles to style.css
- Changed form-action in the security tag on the contact page to allow mailto links
- Added the Form Functionality and Validation section and updated README
- Created enquiry.html with a catering enquiry form (name, email, phone, event date, number of people, meal package and notes)
- Added an ENQUIRY link to the navigation of all 7 pages
- Created data/packages.json to store the package prices and the group discount
- Added JavaScript validation with error messages for every field on the enquiry form
- Added AJAX (jQuery) that reads the prices and shows the cost and availability without reloading the page
- Added the result-box styles to style.css
- Added the Enquiry Form section and updated README

- Added a CART link with an item counter to the navigation of all 6 pages
- Added ADD TO CART buttons to every meal on the Menu page using JavaScript
- Saved the cart in the browser with localStorage so it stays between pages
- Added the add-button and menu-info styles to style.css
- Changed the menu search so it only searches the meal name and price and ignores the button text
- Created cart.html that shows the meals in the cart, the quantities, the line totals and the overall total
- Added buttons to increase, decrease and remove meals and to clear the cart
- Added the cart table, quantity button, remove button and cart total styles to style.css
- Added JavaScript that builds the cart table from localStorage and updates the cart counter
- Added a noindex tag to cart.html and added cart.html to the Disallow list in robots.txt
- Added the CART link to the navigation of all 8 pages
- Added the Shopping Cart Page section
- - Added a checkout form to cart.html with name, phone number, collection time, payment method and notes fields
- Removed the PROCEED TO CHECKOUT button, because checkout now happens on the cart page
- Added JavaScript validation with error messages, including a check of the collection time against the opening hours
- Added an order confirmation with an order number, the meals and the total, and emptied the cart after the order
- Added the Checkout and Order Placement section
- Added the E-Commerce Features section and updated README

- Pushed the website files to a GitHub repository
- Deployed the website on Netlify and connected it to the GitHub repository
- Replaced the example.com addresses in robots.txt and sitemap.xml with the live address
- Added enquiry.html to sitemap.xml and excluded cart.html from the sitemap
- Changed the og:image links to the full live address
- Added the live website link and the GitHub link to the README
- Added the Deployment and Submission section and 2 new references to the README
- Tested every page on the live website to make sure the images, forms, cart and menu features work