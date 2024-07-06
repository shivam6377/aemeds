import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    // Extract the logo and buttons container
    const [logoContainerEl, buttonsContainerEl] = block.children;

    // Logo processing

    const imageSrc =logoContainerEl.querySelector('img')?.src;
    const imageAlt = logoContainerEl.querySelector('img')?.alt || '';

    // Button processing
    const buttonElements = buttonsContainerEl?.querySelectorAll('.nav-button') || [];
    const buttonsHTML = Array.from(buttonElements).map((button) => {
        const href = button?.href || '#';
        const buttonText = button?.textContent?.trim() || '';
        const isActive = button.classList.contains('active') ? 'active' : '';

        return `
        <a href="${href}" class="nav-button ${isActive}">
            ${buttonText}
        </a>
        `;
    }).join('');

    // Construct the new HTML structure
    block.innerHTML = `
    <nav class="navbar">
        <div class="logo-container">
        <img src="${imageSrc}" alt="${imageAlt}"/>
        </div>
        <div class="buttons-container">
            ${buttonsHTML}
        </div>
    </nav>
    `;

    // Optionally add moveInstrumentation if needed
    moveInstrumentation(block, block.querySelector('.navbar'));
}
