export class Document {
    static LoadCss(name) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = `/styles/${name}.css`;

        document.head.appendChild(link);
    }

    static Add(element) {
        document.getElementById('root').appendChild(element);
    }

    static Create(tag, cls) {
        let element = document.createElement(tag);
        element.classList.add(cls);
        return element;
    }

    static CreateWith(tag, cls, html) {
        let element = document.createElement(tag);
        element.classList.add(cls);
        element.innerHTML = html;
        return element;
    }
}