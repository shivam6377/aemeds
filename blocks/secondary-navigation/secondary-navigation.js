import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const navWrapper = block.querySelector('.secondary-navigation-wrapper');
    const navBlock = navWrapper?.querySelector('.secondary-navigation');

    // Extract image element
    const imageEl = navBlock?.querySelector('picture img');
    const imageSrc = imageEl?.src || '';
    const imageAlt = imageEl?.alt || 'Widget';

    // Extract call to action elements
    const ctaElements = Array.from(navBlock?.children || []).slice(1);
    const ctasHTML = ctaElements.map((element) => {
        const textEl = element.querySelector('p');
        const linkEl = element.querySelector('.button-container a');
        
        const ctaText = textEl?.textContent?.trim() || '';
        const link = linkEl?.href || '#';

        return `
        <div>
            <div><p>${ctaText}</p></div>
            <div><p class="button-container"><a href="${link}" title="${ctaText}" class="button">${ctaText}</a></p></div>
        </div>
        `;
    }).join('');

    // Construct the new HTML structure
    block.innerHTML = `
    <div class="secondary-navigation-container">
        <div class="secondary-navigation-wrapper">
            <div class="secondary-navigation block" data-block-name="secondary-navigation" data-block-status="loaded">
                <div>
                    <div>
                        <picture>
                            ${imageEl.outerHTML}
                        </picture>
                    </div>
                </div>
                ${ctasHTML}
            </div>
        </div>
    </div>
    `;

    // Optionally add moveInstrumentation if needed
    moveInstrumentation(block, block.querySelector('.secondary-navigation'));
}
