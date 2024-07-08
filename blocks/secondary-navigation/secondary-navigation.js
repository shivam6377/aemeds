import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [imageEl, imageAltTextEl, ...ctasEl] = block.children;
    const logoImage = imageEl?.querySelector('img')?.src;
    const alt = imageAltTextEl?.querySelector('img')?.alt || 'navbar';

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

    function setupNavButtons(navButtons) {
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    block.innerHTML = `
    <nav class="navbar">
        <div class="logo-container">
            <img src="${logoImage}" alt="${alt}">
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
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.querySelector('.navbar');
        if (currentScroll > lastScrollTop) {
            
            navbar.style.top = '0'; 
        } else {
            
            navbar.style.top = '-100px'; 
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}
