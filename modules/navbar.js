import { docx } from "./docx.js";

export class navbar {
    static async buildNavBar() {
        docx.loadCss("navbar");

        let navbar = docx.Create("div", "navbar");
        docx.add(navbar);

        let title = docx.CreateWith("h1", "navbar__title", document.title);
        navbar.appendChild(title);

        let pages = docx.Create("div", "navbar__pages");
        this.buildNavPages(pages);
        navbar.appendChild(pages);

        let socials = docx.Create("div", "navbar__socials");
        this.buildNavSocials(socials);
        navbar.appendChild(socials);

        docx.add(
            docx.Create("hr", "navbar__hr")
        )
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