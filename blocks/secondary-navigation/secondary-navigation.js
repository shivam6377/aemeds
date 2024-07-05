import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
    const [imageSection, ...ctaSections] = block.children;

    // Get image source and alt text
    const imageSrc = imageSection.querySelector('img')?.src;
    const imageAlt = imageSection.querySelector('img')?.alt || 'navbar';

    // Generate cta elements
    const ctaElements = ctaSections
        .map((element)  => {
            const [ ctaTextEl, linkEl] = element.children;
            const ctaText = ctaTextEl?.textContent?.trim() || '';
            const link = linkEl?.querySelector('.button-container a')?.href;

            element.innerHTML = ` 
                <li>
                    <a href="${link}" class="button">${ctaText}</a>
                </li>
            `;
            return element.innerHTML;
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
