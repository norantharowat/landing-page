/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
 */

let navigation_bar_list = document.querySelector("#navbar__list"); //selecting the ul inside the nav element 
const sections = document.querySelectorAll("section"); // selecting all section elements which returns a node list

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to check if an element in the view port


let isInViewport = function (elem) {

	var distance = elem.getBoundingClientRect();
	
    if (distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth))
    
          {
        return true;
    } else {
        return false ;
    }
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

document.addEventListener('DOMContentLoaded', addSectionsToNavBar());

// Add class 'active' class to hyper-links and 'your-active-class' to sections when near top of viewport

function AddActiveClass(CurrentSection){
    let nav_links = document.querySelectorAll(".menu__link");
    nav_links.forEach((nav_link)=>{
        if(nav_link.getAttribute('href') == `#${CurrentSection.getAttribute("id")}`) {
            nav_link.classList.add("active");

        }
    });
    CurrentSection.classList.add("your-active-class");

}

// remove the active classes
function RemoveAllActiveClass(){
    let nav_links = document.querySelectorAll(".menu__link");
    nav_links.forEach((nav_link)=>{
        nav_link.classList.remove("active");
    });
    sections.forEach((section)=>{
        
        section.classList.remove("your-active-class");
    });

}
// Scroll to anchor ID using scrollTO event

function scrollToClickedSection(){
    let nav_links = document.querySelectorAll(".menu__link");

    nav_links.forEach((nav_link) => {
        nav_link.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(nav_link.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
       
        });
    });

}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

function addSectionsToNavBar(){

    for (section of sections){
        let sectionName = section.getAttribute("data-nav");
        let sectionId = section.getAttribute("id");
        let li = document.createElement("li");
        li.classList.add("navbar_list_item") ;
        li.innerHTML = `<a href ="#${sectionId}" class="menu__link">${sectionName}</a>  `;
        navigation_bar_list.appendChild(li);
    }

}

// Scroll to section on link click


scrollToClickedSection();
// Set sections as active



window.addEventListener('scroll', function (event) {
    sections.forEach((element)=>{
        
        // console.log(element);
        if (isInViewport(element)) {
            RemoveAllActiveClass();

            AddActiveClass(element);
            
        } else if(window.scrollY==0) {
            RemoveAllActiveClass();

            
        }
        
    }, false);
});