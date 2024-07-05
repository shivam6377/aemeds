import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const navBlock = block.querySelector('.secondary-navigation.block');
    const [imageSection, ...ctaSections] = navBlock.children;

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
        <div class="widget">
            <div class="widget__icon">
                <img src="${imageSrc}" alt="${imageAlt}" class="icon"/>
            </div>
            <div class="widget__links">
                <ul>
                    ${ctaElements}
                </ul>
            </div>
        </div>
    `;

    // Add hover logic with JavaScript
    const widgetElement = block.querySelector('.widget');
    const widgetLinksElement = block.querySelector('.widget__links');

    widgetElement.addEventListener('mouseenter', () => {
        widgetLinksElement.style.display = 'block';
    });

    widgetElement.addEventListener('mouseleave', () => {
        widgetLinksElement.style.display = 'none';
    });

    // Initially hide the widget links
    widgetLinksElement.style.display = 'none';
}
