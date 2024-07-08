import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    console.log(block);
    const [logoImageEl, logoImageAltEl, ...ctasEl] = block.children;
    const logoImage = logoImageEl?.querySelector('img')?.src;
    const logoImageAlt = logoImageAltEl?.textContent?.trim() || 'navbar';

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
        <picture>
            <img src="${logoImage}" alt="${logoImageAlt}">
        </picture>
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
            
            navbar.style.top = '0'; 
        } else {
            
            navbar.style.top = '-100px'; 
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}
