function createLogoHTML(component) {
    const logoImg = component.querySelector('[data-aue-prop="grand_vitara_logo"]');
    const logoAltText = component.querySelector('[data-aue-prop="grand_vitara_logoalt"]');
    
    if (!logoImg || !logoAltText) return '';
  
    return `
      <div>
        <div>
          <picture><img src="${logoImg.src}" data-aue-prop="grand_vitara_logo" data-aue-label="Grand Vitara Logo" data-aue-type="media"></picture>
          <p data-aue-prop="grand_vitara_logoalt" data-aue-label="Grand Vitara Alt Text" data-aue-type="text">${logoAltText.innerText}</p>
        </div>
      </div>
    `;
  }
  
  function createCtaButtonHTML(component) {
    const ctaLinkText = component.querySelector('[data-aue-prop="ctaLinkText"]');
  
    if (!ctaLinkText) return '';
  
    return `
      <div>
        <p class="button-container">
          <a href="#" data-aue-prop="ctaLinkText" data-aue-label="CTA Text" data-aue-type="text" title="${ctaLinkText.title}" class="button">${ctaLinkText.innerText}</a>
        </p>
      </div>
    `;
  }
  
  export default function decorate(block) {
    const [logoComponent, cta1, cta2, cta3, cta4, cta5] = block.children;
  
    const logoHTML = logoComponent ? createLogoHTML(logoComponent) : '';
    const cta1HTML = cta1 ? createCtaButtonHTML(cta1) : '';
    const cta2HTML = cta2 ? createCtaButtonHTML(cta2) : '';
    const cta3HTML = cta3 ? createCtaButtonHTML(cta3) : '';
    const cta4HTML = cta4 ? createCtaButtonHTML(cta4) : '';
    const cta5HTML = cta5 ? createCtaButtonHTML(cta5) : '';
  
    block.innerHTML = `
      <div class="secondary-navigation-wrapper">
        <div class="secondary-navigation block" data-block-name="secondary-navigation" data-block-status="loaded">
          ${logoHTML}
          ${cta1HTML}
          ${cta2HTML}
          ${cta3HTML}
          ${cta4HTML}
          ${cta5HTML}
        </div>
      </div>
    `;
  }
  