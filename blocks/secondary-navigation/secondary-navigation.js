import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [imageSection, ...ctaSections] = block.children;

    // Get image source and alt text
    const imageSrc = imageSection.querySelector('img')?.src;
    const imageAlt = imageSection.querySelector('img')?.alt || 'navbar';

    // Generate cta elements
    const ctaElements = ctaSections
        .filter(section => section.querySelector('.button-container a')) // Filter out sections without .button-container a
        .map(section => {
            const linkElement = section.querySelector('.button-container a');
            const link = linkElement.href || '#';
            const linkText = linkElement.textContent?.trim() || '';
            const linkTitle = linkElement.title || '';

            return `
                <li>
                    <a href="${link}" title="${linkTitle}" class="button">${linkText}</a>
                </li>
            `;
        })
        .join('');

    // Construct the navbar HTML
    block.innerHTML = `
        <nav class="navbar">
            <div class="logo-container">
                <img src="${imageSrc}" alt="${imageAlt}"/>
            </div>
            <div class="buttons-container">
                <ul>
                    ${ctaElements}
                </ul>
            </div>
        </nav>
    `;
}
