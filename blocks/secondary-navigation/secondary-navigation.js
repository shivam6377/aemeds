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
            ${imageEl.innerHTML} <!-- Keep the original content of 'imageEl' -->
        </div>
        <div class="buttons-container">
            ${ctaElements}
        </div>
    </nav>
    `;

    const navbarbuttons = block.querySelectorAll('.nav-button');
    setupNavButtons(navbarbuttons);

    // Hide sub-navigation on scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || block.documentElement.scrollTop;
        const navbar = block.querySelector('.navbar');
        if (currentScroll > lastScrollTop) {
            navbar.style.top = '0px'; 
        } else {
            navbar.style.top = '-210px'; 
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}
