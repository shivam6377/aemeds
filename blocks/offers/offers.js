// Utility function to create elements with class
function createElementWithClass(tagName, classNames) {
  const element = document.createElement(tagName);
  if (classNames) {
      var classNamesArray = classNames.split(' ');
      classNamesArray.forEach(function(className) {
          element.classList.add(className); 
      });  
    
  }
  return element;
}

// Function to create and append CTA element with SVG image
function createCTAElement(ctaText, ctaUrl) {
  const ctaLink = createElementWithClass('a', 'btn--link btn--link-primary');
  ctaLink.setAttribute('href', ctaUrl || '#');

  const span = document.createElement('span');
  const img = document.createElement('img');
  img.src = '/content/dam/vishal_eds/north_east.svg'; // Replace with your SVG image path
  span.appendChild(img);

  ctaLink.textContent = ctaText || 'View More';
  ctaLink.appendChild(span);

  return ctaLink;
}

// Function to create teaser card with title, description, and action
function createTeaserCard(cardBlock, teaserClass) {
  

  const teaserContainer = createElementWithClass('div', 'light-teaser buyers-guide-teaser');
  const teaserCard = createElementWithClass('div', `teaser__card ${teaserClass}`);
  const teaserContent = createElementWithClass('div', 'teaser__content');
  const teaserInfo = createElementWithClass('div', 'teaser__info');
  const teaserTitle = createElementWithClass('div', 'teaser__title');
  
  const h = extractElementFromBlock(cardBlock, '[data-aue-prop="offer_Title"]');
 
  //const h3 = document.createElement('h3');
 // h3.textContent = title || '';

 const description = extractElementFromBlock(cardBlock, '[data-aue-prop="offer_Description"]');


  const teaserDescription = createElementWithClass('div', 'teaser__description');
  if(description) teaserDescription.appendChild(description.cloneNode(true));
 // teaserDescription.innerHTML = `<p>${description || ''}</p>`;

  const teaserActions = createElementWithClass('div', 'teaser__actions');
  const a1=extractElementFromBlock(cardBlock, '[data-aue-prop="offer_linkText"]');
 // const actionLink = document.createElement('a');
 // actionLink.setAttribute('href', actionUrl || '#');
 //actionLink.setAttribute('title', actionUrl || '#');
  a1.classList.add('button', 'primary__btn');
 // actionLink.setAttribute('target', '_blank');
 // actionLink.textContent = actionText || 'Know More';

  if(h) teaserTitle.appendChild(h.cloneNode(true));
  teaserInfo.appendChild(teaserTitle);
 
  if(a1) teaserActions.appendChild(a1.cloneNode(true));
  teaserInfo.appendChild(teaserDescription)
  teaserContent.appendChild(teaserInfo);
  teaserContent.appendChild(teaserActions);
  teaserCard.appendChild(teaserContent);
  teaserContainer.appendChild(teaserCard);

  return teaserContainer;
}

//Function to extract children of block
function extractBlockChildren(block){

  const [component, card1, card2, card3, card4] = block.children;
  return {
    component,
    card1,
    card2,
    card3,
    card4
  }
}

function extractElementFromBlock(block, selector){
  return block.querySelector(selector);
}




// Function to build the HTML structure
function buildStructure(block) {

  const blockChilren = extractBlockChildren(block);
  console.log("BlockChilren:", blockChilren);
  
 
  const section = createElementWithClass('section', 'deals-offers-container');
  const wrapper = createElementWithClass('div', 'immersive__wrapper-light');
  const contentDiv = createElementWithClass('div', 'immersive__content');
  const actionDiv = createElementWithClass('div', 'immersive__action-btn');

  // Add main content
  //const h2 = document.createElement('h2');
  //h2.textContent = 'Exciting offers and deals for you!';

  //const p = document.createElement('p');
  //p.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet.';

  const titleElement = extractElementFromBlock(blockChilren.component, '[data-aue-prop="component_title"]' );
  if (titleElement) {
  contentDiv.appendChild(titleElement.cloneNode(true));
  }
  
  
  const descriptionElement = extractElementFromBlock(blockChilren.component, '[data-aue-prop="component_description"]' );
  if (descriptionElement) {
  contentDiv.appendChild(descriptionElement.cloneNode(true));
  } 



  // Add CTA button
  // const ctaElement = createCTAElement('View More', '#');
  // actionDiv.appendChild(ctaElement);

  // Append CTA directly from block.children[0]
  const ctaElement =  extractElementFromBlock(blockChilren.component, '[data-aue-prop="component_linkText"]');
  if (ctaElement) {
    const ctaClone = ctaElement;

    // Append SVG image
    const span = document.createElement("span");
    const img = document.createElement("img");
    img.src = "/content/dam/vishal_eds/north_east.svg"; // Replace with your SVG image path
    span.appendChild(img.cloneNode(true));
    ctaClone.appendChild(span);
    ctaClone.classList.remove("button");
    ctaClone.classList.add("btn--link", "btn--link-primary"); // Add your CSS classes
    actionDiv.appendChild(ctaClone.cloneNode(true));
  }

  // Create sub-container
  const subContainer = createElementWithClass('div', 'sub-container');
  const leftContainer = createElementWithClass('div', 'left-container');
  
  // const leftImg = document.createElement('img');
  // leftImg.setAttribute('src', '/content/dam/vishal_eds/desktop-left-img.png');
  // leftImg.setAttribute('alt', 'mobile img');
  // leftContainer.appendChild(leftImg);
  const leftContainerImage = extractElementFromBlock(blockChilren.card1, '[data-aue-prop="offer_BckImg"]');
  if (leftContainerImage) {
    leftContainer.appendChild(leftContainerImage.cloneNode(true));
  } 
  

  const rightContainer = createElementWithClass('div', 'right-container');

  // Right container card 1
  const rightCard1 = createElementWithClass('div', 'right-container__card-1');
  const img1 = extractElementFromBlock(blockChilren.card2, '[data-aue-prop="offer_BckImg"]');
  // const img1 = document.createElement('img');
  // img1.setAttribute('src', '/content/dam/vishal_eds/mobile-image.png');
  // img1.setAttribute('alt', 'mobile img');
  
  const content1 = createElementWithClass('div', 'right-container__content');
  const innerContent1 = createElementWithClass('div', 'immersive__content');

  const card2Title = extractElementFromBlock(blockChilren.card2, '[data-aue-prop="offer_Title"]');
  // const strong = document.createElement('strong');
  // strong.textContent = 'Lorem Ipsum';
  if(card2Title) innerContent1.appendChild(card2Title.cloneNode(true));
  

  const description = extractElementFromBlock(blockChilren.card2, '[data-aue-prop="offer_Description"]');
  // const p1 = document.createElement('p');
  // p1.textContent = 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet lorem ipsum.';
  if(description) innerContent1.appendChild(description.cloneNode(true));
  
  const action1 = createElementWithClass('div', 'immersive__action');
  const a1= extractElementFromBlock(blockChilren.card2, '[data-aue-prop="offer_linkText"]');
  // const a1 = document.createElement('a');
  // a1.setAttribute('href', '#');
  // a1.setAttribute('title', '#');
  a1.classList.add('button', 'primary__btn');
  //a1.setAttribute('target', '_self');
  //a1.textContent = 'Get Exchange';

  if(a1) action1.appendChild(a1.cloneNode(true));
  innerContent1.appendChild(action1);
  content1.appendChild(innerContent1);
  const picture = document.createElement("picture");
  if(img1){
    
    picture.appendChild(img1.cloneNode(true));
    
  }
  rightCard1.appendChild(picture);
 
  rightCard1.appendChild(content1);
  
  // Right container sub-container
  const rightSubContainer = createElementWithClass('div', 'right-container-subcontainer');

  // Right container card 2
  const rightCard2 = createElementWithClass('div', 'right-container__card-2');
  const teaserCard2 = createTeaserCard(blockChilren.card3, 'teaser-light');
  rightCard2.appendChild(teaserCard2);

  // Right container card 3
  const rightCard3 = createElementWithClass('div', 'right-container__card-3');
  const teaserCard3 = createTeaserCard(blockChilren.card4, 'teaser-dark');
  rightCard3.appendChild(teaserCard3);

  rightSubContainer.appendChild(rightCard2);
  rightSubContainer.appendChild(rightCard3);

  rightContainer.appendChild(rightCard1);
  rightContainer.appendChild(rightSubContainer);

  subContainer.appendChild(leftContainer);
  subContainer.appendChild(rightContainer);

  wrapper.appendChild(contentDiv);
  wrapper.appendChild(actionDiv);
  wrapper.appendChild(subContainer);

  section.appendChild(wrapper);

  return section;
}

// Main decorate function that orchestrates element extraction and structure building
export default function decorate(block) {
  
  const generatedHTML = buildStructure(block);
  // Append the generated HTML structure to the block
  block.appendChild(generatedHTML);

  
}