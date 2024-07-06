import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [imageEl, imageAltTextEl, ...ctasEl] = block.children;
    const imageSrc = imageEl?.querySelector('img')?.src;
    const alt = imageAltTextEl?.querySelector('img')?.alt || 'navbar';

    const ctaElements = ctasEl.map((element, index) => {
        const [ctaTextEl, linkEl] = element.children;
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;

        // Create new button element
        const newButton = document.createElement('a');
        newButton.href = link;
        newButton.innerHTML = `<p>${ctaText}</p>`;

        // Add classes based on index (assuming first button should be active)
        if (index === 0) {
            newButton.classList.add('nav-button', 'active');
        } else {
            newButton.classList.add('nav-button');
        }

        // Clear existing content and add newButton
        element.innerHTML = '';
        element.appendChild(newButton);

        // Move instrumentation
        moveInstrumentation(element, newButton);

        return element.innerHTML;
    }).join('');
    function setupNavButtons(navButtons) {
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
    
                // Add active class to the clicked button
                button.classList.add('active');
            });
        });
    }
    
    block.innerHTML = `
    <nav class="navbar">
        <div class="logo-container">
            <img src="${imageSrc}" alt="${alt}">
        </div>
        <div class="buttons-container">
            ${ctaElements}
        </div>
    </nav>
    `;
    const navbarbuttons = block.querySelectorAll('.nav-button');
    setupNavButtons(navbarbuttons);
}
