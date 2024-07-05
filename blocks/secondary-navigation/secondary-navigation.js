import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const block = block.querySelector('.secondary-navigation.block');
    const [imageSection, ...ctaSections] = block.children;

    const imageSrc = imageSection.querySelector('img')?.src;
    const imageAlt = imageSection.querySelector('img')?.alt || 'Widget';

    const ctaElements = ctaSections.map(section => {
        const linkElement = section.querySelector('.button-container a');
        const link = linkElement?.href || '#';
        const linkText = linkElement?.textContent?.trim() || '';
        const linkTitle = linkElement?.title || '';

        return `
            <li>
                <a href="${link}" title="${linkTitle}" class="button">${linkText}</a>
            </li>
        `;
    }).join('');

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
