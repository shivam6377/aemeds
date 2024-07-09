import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [logoEl, linkEl, ...ctasEl] = block.children;
    const logoText = logoEl?.textContent?.trim() || '';
    const logoLink = linkEl?.querySelector('a')?.href || '';

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
            button.addEventListener('click', function () {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

  

    block.innerHTML = `
    <nav class="navbar">
    <a href="${logoLink}" class="logo-container">
    <p>${logoText}</p>
</a>
        <div class="buttons-container">
            ${ctaElements}
        </div>
    </nav>
    `;

    const navbarbuttons = block.querySelectorAll('.nav-button');
    setupNavButtons(navbarbuttons);

    const navbar = block.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add("sticky");
            navbar.classList.remove("hidden");
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up
            navbar.classList.remove("sticky");
            navbar.classList.add("hidden");
        }

        lastScrollTop = scrollTop;
    });
}
