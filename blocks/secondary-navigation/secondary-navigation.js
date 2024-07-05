import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [imageSection, ...ctaSections] = block.children;

    const imageSrc = imageSection.querySelector('img')?.src;
    const imageAlt = imageSection.querySelector('img')?.alt || '';

    const ctaElements = ctaSections.map(section => {
        const linkElement = section.querySelector('.button-container a');
        const link = linkElement?.href || '#';
        const linkText = linkElement?.dataset.ctaLinkText?.trim() || '';
        const linkTitle = linkElement?.title || '';

        return `
            <a href="${link}" title="${linkTitle}" class="button">${linkText}</a>
        `;
    }).join('');

    block.innerHTML = `
        <nav class="navbar">
            <div class="logo-container">
                <img src="${imageSrc}" alt="${imageAlt}"/>
            </div>
            <div class="buttons-container">
                ${ctaElements}
            </div>
        </nav>
    `;
}
