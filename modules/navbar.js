import { docx } from "./docx.js";

export class navbar {
    static async buildNavBar() {
        docx.loadCss("navbar");

        let navbar = docx.create("div", "navbar");

        let title = docx.createWith("h1", "navbar__title", document.title);
        navbar.appendChild(title);

        let pages = docx.create("div", "navbar__pages");
        this.buildNavPages(pages);
        navbar.appendChild(pages);

        let socials = docx.create("div", "navbar__socials");
        this.buildNavSocials(socials);
        navbar.appendChild(socials);

        docx.add(navbar);
        docx.add(docx.create("hr", "navbar__hr"));
    }

    static async buildNavPages(src) {
        let pages = await fetch("/data/pages.json").then(x => x.json());
        for (let key in pages) {
            src.innerHTML += `<a class="navbar__page" href="${pages[key]}">${key}</a>`;
        }
    }

    static async buildNavSocials(src) {
        let socials = await fetch("/data/socials.json").then(x => x.json());
        for (let key in socials) {
            src.innerHTML += `
            <a class="navbar__social" href="${socials[key]}" target="_blank">
                <img src="/res/${key}.svg" alt="${key} link icon" class="navbar__icon">
                <div class="navbar__social_accent"></div>
            </a>
            `
        }
    }
}

await navbar.buildNavBar();