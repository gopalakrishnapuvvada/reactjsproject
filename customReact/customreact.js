function mainContainer(reactElement, container){
    /* document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.childen
    domElement.setAttribute('href',reactElement.props.href)
    domElement.setAttribute('target',reactElement.props.target)
    container.appendChild(domElement) */

    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.childen
    
    for (const prop in reactElement.prop) {
        domElement.setAttribute(prop, reactElement.props)
    }
    container.appendchild(domElement)
}


const reactElement = {
    type: 'a',
    props: {
        href:"https:google.com",
        target: '_blank'
    },
    childen: 'Click me to visit google website'
}



const mainContainer = document.querySelector('#root')

customRender(reactElement,mainContainer)