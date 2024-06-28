// Utility function to create elements with class
function createElementWithClass(tagName, classNames) {
  const element = document.createElement(tagName);
  if (classNames) {
    classNames.split(' ').forEach(className => element.classList.add(className));
  }
  return element;
}

// Function to create and append CTA element with SVG image
function createCTAElement(ctaText, ctaUrl) {
  const ctaLink = createElementWithClass('a', 'btn--link btn--link-primary');
  ctaLink.href = ctaUrl || '#';
  
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
  const description = extractElementFromBlock(cardBlock, '[data-aue-prop="offer_Description"]');
  const teaserDescription = createElementWithClass('div', 'teaser__description');
  
  if (description) teaserDescription.appendChild(description.cloneNode(true));
  
  const teaserActions = createElementWithClass('div', 'teaser__actions');
  const a1 = extractElementFromBlock(cardBlock, '[data-aue-prop="offer_linkText"]');
  if (a1) {
    a1.classList.add('button', 'primary__btn');
    teaserActions.appendChild(a1.cloneNode(true));
  }

  if (h) teaserTitle.appendChild(h.cloneNode(true));
  teaserInfo.appendChild(teaserTitle);
  teaserInfo.appendChild(teaserDescription);
  teaserContent.appendChild(teaserInfo);
  teaserContent.appendChild(teaserActions);
  teaserCard.appendChild(teaserContent);
  teaserContainer.appendChild(teaserCard);

  return teaserContainer;
}

// Function to extract children of block
function extractBlockChildren(block) {
  const [component, card1, card2, card3, card4] = block.children;
  return { component, card1, card2, card3, card4 };
}

function extractElementFromBlock(block, selector) {
  return block.querySelector(selector);
}

// Function to build the HTML structure
function buildStructure(block) {
  const blockChildren = extractBlockChildren(block);
  
  const section = createElementWithClass('section', 'deals-offers-container');
  const wrapper = createElementWithClass('div', 'immersive__wrapper-light');
  const contentDiv = createElementWithClass('div', 'immersive__content');
  const actionDiv = createElementWithClass('div', 'immersive__action-btn');

  const titleElement = extractElementFromBlock(blockChildren.component, '[data-aue-prop="component_title"]');
  if (titleElement) contentDiv.appendChild(titleElement.cloneNode(true));
  
  const descriptionElement = extractElementFromBlock(blockChildren.component, '[data-aue-prop="component_description"]');
  if (descriptionElement) contentDiv.appendChild(descriptionElement.cloneNode(true));
  
  const ctaElement = extractElementFromBlock(blockChildren.component, '[data-aue-prop="component_linkText"]');
  if (ctaElement) {
    const ctaClone = ctaElement.cloneNode(true);
    const span = document.createElement("span");
    const img = document.createElement("img");
    img.src = "/content/dam/vishal_eds/north_east.svg"; // Replace with your SVG image path
    span.appendChild(img.cloneNode(true));
    ctaClone.appendChild(span);
    ctaClone.classList.remove("button");
    ctaClone.classList.add("btn--link", "btn--link-primary");
    actionDiv.appendChild(ctaClone);
  }

  const subContainer = createElementWithClass('div', 'sub-container');
  const leftContainer = createElementWithClass('div', 'left-container');
  const leftContainerImage = extractElementFromBlock(blockChildren.card1, '[data-aue-prop="offer_BckImg"]');
  if (leftContainerImage) leftContainer.appendChild(leftContainerImage.cloneNode(true));
  
  const rightContainer = createElementWithClass('div', 'right-container');

  const rightCard1 = createElementWithClass('div', 'right-container__card-1');
  const img1 = extractElementFromBlock(blockChildren.card2, '[data-aue-prop="offer_BckImg"]');
  const content1 = createElementWithClass('div', 'right-container__content');
  const innerContent1 = createElementWithClass('div', 'immersive__content');
  
  const card2Title = extractElementFromBlock(blockChildren.card2, '[data-aue-prop="offer_Title"]');
  if (card2Title) innerContent1.appendChild(card2Title.cloneNode(true));
  
  const description = extractElementFromBlock(blockChildren.card2, '[data-aue-prop="offer_Description"]');
  if (description) innerContent1.appendChild(description.cloneNode(true));
  
  const action1 = createElementWithClass('div', 'immersive__action');
  const a1 = extractElementFromBlock(blockChildren.card2, '[data-aue-prop="offer_linkText"]');
  if (a1) {
    a1.classList.add('button', 'primary__btn');
    action1.appendChild(a1.cloneNode(true));
  }

  innerContent1.appendChild(action1);
  content1.appendChild(innerContent1);
  const picture = document.createElement("picture");
  if (img1) picture.appendChild(img1.cloneNode(true));
  rightCard1.appendChild(picture);
  rightCard1.appendChild(content1);
  
  const rightSubContainer = createElementWithClass('div', 'right-container-subcontainer');

  const rightCard2 = createElementWithClass('div', 'right-container__card-2');
  const teaserCard2 = createTeaserCard(blockChildren.card3, 'teaser-light');
  rightCard2.appendChild(teaserCard2);

  const rightCard3 = createElementWithClass('div', 'right-container__card-3');
  const teaserCard3 = createTeaserCard(blockChildren.card4, 'teaser-dark');
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
  block.appendChild(generatedHTML);
}
