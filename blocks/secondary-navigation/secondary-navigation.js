function createLogoHTML(component) {
    const logoImg = component.querySelector('[data-aue-prop="grand_vitara_logo"]');
    const logoAltText = component.querySelector('[data-aue-prop="grand_vitara_logoalt"]');
    
    if (!logoImg || !logoAltText) return '';
  
    return `
      <div>
        <div>
          <picture><img src="${logoImg.src}" data-aue-prop="grand_vitara_logo" data-aue-label="Grand Vitara Logo" data-aue-type="media"></picture>
          <p data-aue-prop="grand_vitara_logoalt" data-aue-label="Grand Vitara Alt Text" data-aue-type="text">${logoAltText.innerText}</p></div>
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
    const [logoComponent, ...ctaComponents] = block.children;
  
    const logoHTML = logoComponent ? createLogoHTML(logoComponent) : '';
    const ctaHTMLArray = ctaComponents.map(component => createCtaButtonHTML(component)).join('');
  
    block.innerHTML = `
      <div class="secondary-navigation-wrapper">
        <div data-aue-resource="urn:aemconnection:/content/xwalk-shivam/test-page-/jcr:content/root/section/block" data-aue-type="container" data-aue-behavior="component" data-aue-model="secondary-navigation" data-aue-label="Secondary Navigation" data-aue-filter="secondary-navigation" class="secondary-navigation block" data-block-name="secondary-navigation" data-block-status="loaded">
          ${logoHTML}
          ${ctaHTMLArray}
        </div>
      </div>
    `;
  }
  