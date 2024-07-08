import { moveInstrumentation } from '../../scripts/scripts.js';
export default function decorate(block) {
    console.log(block);
    const [imageEl, altTextEl, ...ctasEl] = block.children;

    // Ensure you have the correct selectors for your structure
    const picture = imageEl?.querySelector('picture');
    if (picture) {
        const img = picture.querySelector('img');
        img.removeAttribute('width');
        img.removeAttribute('height');
        const alt = altTextEl?.textContent?.trim() || 'image';
        img.setAttribute('alt', alt);
    }

    const ctaElements = ctasEl.map((element, index) => {
        const [ctaTextEl, linkEl] = element.children;
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;

        const newButton = document.createElement('a');
        newButton.href = link;
        newButton.innerHTML = `<p>${ctaText}</p>`;

        if (index === 0) {
            newButton.classList.add('nav-button', 'active');
        } else {
            newButton.classList.add('nav-button');
        }

        element.innerHTML = '';
        element.appendChild(newButton);

        moveInstrumentation(element, newButton);

        return element.innerHTML;
    }).join('');

    block.innerHTML = `
    <nav class="navbar">
        <div class="logo-container">
            ${imageEl.innerHTML} 
        </div>
        <div class="buttons-container">
            ${ctaElements}
        </div>
    </nav>
    `;

    const navbarbuttons = block.querySelectorAll('.nav-button');
    setupNavButtons(navbarbuttons);
    block.addEventListener("DOMContentLoaded", function() {
        const subHeader = block.querySelector(".navbar");
        const component2 = block.querySelector(".secondary-navigation block");
 
        const subHeaderOriginalTop = subHeader.offsetTop;
        let lastScrollTop = 0;
    
        window.addEventListener("scroll", function() {
            const scrollTop = window.pageYOffset || block.documentElement.scrollTop;
            const component2Top = component2.offsetTop;
            const component2Bottom = component2Top + component2.offsetHeight;
    
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                if (scrollTop >= component2Top) {
                    subHeader.classList.remove("sticky");
                }
            } else {
                // Scrolling up
                if (scrollTop >= component2Top && scrollTop < component2Bottom) {
                    subHeader.classList.add("sticky");
                } else {
                    subHeader.classList.remove("sticky");
                }
            }
    
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    });
   
}
