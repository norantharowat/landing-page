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


let checkViewPort = new IntersectionObserver(function(entries){
    if (entries[0].isIntersecting === true)
        
        {
            AddActiveClass(entries[0].target.getAttribute('id'));
        }
    
        else{
    
            RemoveAllActiveClass();
        }
}, {threshold : [0.5]});


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

document.addEventListener('DOMContentLoaded', addSectionsToNavBar());
// Add class 'active' to section when near top of viewport

function AddActiveClass(CurrentSectionId){
    let nav_links = document.querySelectorAll(".menu__link");
    nav_links.forEach((nav_link)=>{
        if(nav_link.getAttribute('href') == `#${CurrentSectionId}`) {
            nav_link.classList.add("active");
        }
    });

}

function RemoveAllActiveClass(){
    let nav_links = document.querySelectorAll(".menu__link");
    nav_links.forEach((nav_link)=>{
        nav_link.classList.remove("active");
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


for(section of sections){

    checkViewPort.observe(section);

}