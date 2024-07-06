import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [imageEl, imageAltTextEl, ...ctasEl] = block.children;
    const imageSrc = imageEl?.querySelector('img')?.src;
    const alt = imageAltTextEl?.querySelector('img')?.alt || 'navbar';

    const ctaElements = ctasEl.map((element) => {
        const [ctaTextEl, linkEl] = element.children;
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;
        const isActive = linkEl?.querySelector('.button-container a')?.classList.contains('active') ? 'active' : '';

        return `
            <a href="${link}" class="nav-button ${isActive}">
                <p>${ctaText}</p>
            </a>
        `;
    }).join('');

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

    // Move instrumentation for the updated structure
    moveInstrumentation(block, block.querySelector('.navbar'));
}
