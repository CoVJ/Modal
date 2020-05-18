// Añadir un objeto de atributos a un elemento 
// const addAttributes = (element, Obj_of_attributes)
const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr,attrObj[attr])
  }
};

// Crear elementos con atributos e hijo
// const createCustomElement = (tag_html,attributes,children_array)
const createCustomElement = (element,attributes,children) => {
  let customElement = document.createElement(element);
  if (children !== undefined) children.forEach(el => {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement,attributes);
  return customElement;
};

/* Creating modal */
const printModal = content => {
// inner container
const modalContentEl = createCustomElement('div',	{
      id: 'modal-content',
      class: 'modal-content'
      }, [content]);

// major container (overlay)
const modalContainerEl = createCustomElement( 'div', {
      id: 'modal-container',
      class: 'modal-container'
      }, [modalContentEl]); 

// print modal
document.body.appendChild(modalContainerEl);

//remove modal, DOESN'T take parameters, only take it out of  DOM
const removeModal = () => document.body.removeChild(modalContainerEl);

// e => capture info about the executed element, click outside of content
modalContainerEl.addEventListener('click', e => {
  // Garantee a click was made inside de container, outside content
  if (e.target === modalContainerEl) removeModal();
})
}

// Posible mistake:
// document.getElementbyId('show-modal').addEventListener('click'"', printModal(' ..'));
// printModal es una funcion, no un parametro!
document.getElementById('show-modal').addEventListener('click', () => {
printModal('<h1> Hey man </h1>');
});

/*Another way: 

document.getElementById('show-modal').addEventListener('click', myFunction);

function myFunction() {
  printModal('<h1> Hey man </h1>');
}
*/