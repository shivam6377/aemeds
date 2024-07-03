function createOffersHTML(component) {
  let title = component.querySelector('[data-aue-prop="component_title"]');
  let description = component.querySelector('[data-aue-prop="component_description"]');
  let a = component.querySelector('[data-aue-prop="component_linkText"]');
  let target=component.querySelector('[data-aue-prop="component_linkTarget"]');
  let btnIcon = component.querySelector('[data-aue-prop="component_linkIcon"]');

  if (a) {
    a.classList.remove("button");
    a.classList.add("btn--link", "btn--link-primary");
    if(target){
      a.setAttribute('target', target.innerText);
    }
    a.innerHTML = `${a.innerText} <span>${
      btnIcon ? `${btnIcon.outerHTML}` : ""
    }</span>`;
    //console.log("anchor tag innerHTML", a.innerHTML);
  }

  const componentHTML = `
  <div class="immersive__content heading-content">
  ${title ? `${title.outerHTML}` : ""}
  ${description ? `<p>${description.innerText}</p>` : ""}
      <div class="immersive__action-btn">
          ${a ? a.outerHTML : ""}
      </div>
  </div>
`;

  return componentHTML;
}

function createPrimaryOffer(teaser) {
  let title = teaser.querySelector('[data-aue-prop="offer_Title"]');
  let description = teaser.querySelector('[data-aue-prop="offer_Description"]');
  let a = teaser.querySelector('[data-aue-prop="offer_linkText"]');
  let bckImg = teaser.querySelector('[data-aue-prop="offer_BckImg"]');
  let target=teaser.querySelector('[data-aue-prop="offer_linkTarget"]');

  if (a) {
    a.classList.add("button", "primary__btn");
    if(target){
      a.setAttribute('target', target.innerText);
    }
  }

  const leftContainer = document.createElement('div');
  leftContainer.classList.add('left-container');

  Array.from(teaser.attributes).forEach(attr => {
    leftContainer.setAttribute(attr.name, attr.value);
});


leftContainer.innerHTML = `
   <picture>
      <source srcset=" ${bckImg ? `${bckImg.src}` : ""}" media="(min-width: 1024px)">
      ${bckImg ? `${bckImg.outerHTML}` : ""}
   </picture>
   <div class="light-teaser buyers-guide-teaser">
      <div class="teaser__card teaser-grey">
         <div class="teaser__content">
            <div class="teaser__info left-img-over-text">
               <div class="teaser__title">
                  ${title? `${title.outerHTML}` : ""}
               </div>
               <div class="teaser__description">
                  ${description? `<p>${description.innerText}</p>`: ""}
               </div>
            </div>
            <div class="teaser__action-btn">
               ${a ? a.outerHTML : ""}
            </div>
         </div>
      </div>
   </div>
`;



  return leftContainer.outerHTML;
}

function createSecondaryOffer(teaser) {
  let title = teaser.querySelector('[data-aue-prop="offer_Title"]');
  let description = teaser.querySelector('[data-aue-prop="offer_Description"]');
  let a = teaser.querySelector('[data-aue-prop="offer_linkText"]');
  let bckImg = teaser.querySelector('[data-aue-prop="offer_BckImg"]');
  let bckMobImg = teaser.querySelector('[data-aue-prop="offer_Mobile_BckImg"]');
  let target =teaser.querySelector('[data-aue-prop="offer_linkTarget"]');


  if (a) {
    a.classList.add("button", "primary__btn");
    if(target){
      a.setAttribute('target', target.innerText);
    }
    
  }

  const secCardContainer = document.createElement('div');
  secCardContainer.classList.add('right-container__card-1');

  Array.from(teaser.attributes).forEach(attr => {
    secCardContainer.setAttribute(attr.name, attr.value);
});

  secCardContainer.innerHTML = `
                        <picture class="image-container">
                            <source media="(min-width: 769px)" srcset="${bckImg ? `${bckImg.src}` : ""}" >
                            <source media="(max-width: 768px)" srcset="${bckMobImg ? `${bckMobImg.src}` : ""}" >
                             ${bckImg ? `${bckImg.outerHTML}` : ""}
                              
                        </picture>
                        <div class="right-container__content">
                            <div class="immersive__content img-over-text">
                               <div class="teaser__title">${title? `${title.outerHTML}` : ""}</div>
                               
                                ${description? `<p>${description.innerText}</p>`: ""}
                                <div class="immersive__action">
                                 ${a ? a.outerHTML : ""}
                                 </div>
                            </div>
                        </div>
                    `;


  return secCardContainer.outerHTML;
}

function createGeneralOffer(teaser, textClass) {
  let title = teaser.querySelector('[data-aue-prop="offer_Title"]');
  let description = teaser.querySelector('[data-aue-prop="offer_Description"]');
  let a = teaser.querySelector('[data-aue-prop="offer_linkText"]');
  let btnIcon = teaser.querySelector('[data-aue-prop="component_linkIcon"]');
  let target=teaser.querySelector('[data-aue-prop="offer_linkTarget"]');
  console.log("General Title:", title);

  if (a) {
    a.classList.add("button", "primary__btn");
    if(target){
      a.setAttribute('target', target.innerText);
    }
  }

  const genCardContainer = document.createElement('div');
  genCardContainer.classList.add('right-container__card-2');

  Array.from(teaser.attributes).forEach(attr => {
    genCardContainer.setAttribute(attr.name, attr.value);
  });

  genCardContainer.innerHTML=`<div class="light-teaser buyers-guide-teaser">
                                <div class="teaser__card ${textClass? textClass: ''}">
                                    <div class="teaser__content">
                                        <div class="teaser__info">
                                            <div class="teaser__title">
                                                 ${title? `${title.outerHTML}` : ""}
                                            </div>
                                            <div class="teaser__description">
                                                 ${description? `<p>${description.innerText}</p>`: ""}
                                            </div>
                                        </div>
                                        <div class="teaser__actions">
                                          ${a ? a.outerHTML : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>`;





  return genCardContainer.outerHTML;
}

export default function decorate(block) {
  const [component, card1, card2, card3, card4] = block.children;

  // console.log("Component: ", component.outerHTML);
  //console.log("Card 1: ", card1.outerHTML);
  // console.log("Card 3: ", card3.outerHTML);

  const componentHTML = component? createOffersHTML(component) : "";
  const primaryCard = (card1)? createPrimaryOffer(card1): ""; 
  const secondaryCard= (card2)? createSecondaryOffer(card2): "";
  const generalCard1= (card3)? createGeneralOffer(card3, 'teaser-light'): "";
  const generalCard2= (card4)? createGeneralOffer(card4, 'teaser-dark'): "";
 
  
  
 
  

  block.innerHTML = `
  <section class="deals-offers-container">
        <div class="immersive__wrapper-light">
            ${componentHTML}
            <div class="sub-container">
                ${primaryCard}
                <div class="right-container">
                    ${secondaryCard}
                    <div class="right-container-subcontainer ">
                        ${generalCard1}
                        ${generalCard2}
                    </div>
                </div>
            </div>
        </div>              
    </section>
  `;
}
