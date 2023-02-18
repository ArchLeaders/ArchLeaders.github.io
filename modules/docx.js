export class docx {
    static loadCss(name) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = `/styles/${name}.css`;

        document.head.appendChild(link);
    }

    static add(element) {
        document.getElementById('root').appendChild(element);
    }

    static create(tag, cls) {
        let element = document.createElement(tag);
        element.classList.add(cls);
        return element;
    }

    static createWith(tag, cls, html) {
        let element = document.createElement(tag);
        element.classList.add(cls);
        element.innerHTML = html;
        return element;
    }
}