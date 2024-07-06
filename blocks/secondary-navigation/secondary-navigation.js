import { moveInstrumentation } from '../../scripts/scripts.js';
export default function decorate(block) {
    const [imageEl, imageAltTextEl, ...ctasEl] = block.children;
    const imageSrc = imageEl?.querySelector('img')?.src;
    const alt = imageAltTextEl?.querySelector('img')?.alt || 'navbar';
    const ctaElements = ctasEl.map((element) => {
        const [ ctaTextEl, linkEl] = element.children;
        
        const ctaText = ctaTextEl?.textContent?.trim() || '';
        const link = linkEl?.querySelector('.button-container a')?.href;
        

        element.innerHTML = `
       
            <a href="${link}" class="user__account--link">
               
                <p>${ctaText}</p>
       
        `;
        moveInstrumentation(element, element.firstElementChild);
        return element.innerHTML;
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
 
}