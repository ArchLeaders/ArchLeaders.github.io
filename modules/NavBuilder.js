import { Document } from "./Document.js";

export class NavBuilder {
    static async BuildNavBar() {
        Document.LoadCss("navbar");

        let navbar = Document.Create("div", "navbar");
        Document.Add(navbar);

        let title = Document.CreateWith("h1", "navbar__title", document.title);
        navbar.appendChild(title);

        let pages = Document.Create("div", "navbar__pages");
        this.BuildNavPages(pages);
        navbar.appendChild(pages);

        let socials = Document.Create("div", "navbar__socials");
        this.BuildNavSocials(socials);
        navbar.appendChild(socials);

        Document.Add(
            Document.Create("hr", "navbar__hr")
        )
    }

    static async BuildNavPages(src) {
        let pages = await fetch("/data/pages.json").then(x => x.json());
        for (let key in pages) {
            src.innerHTML += `<a class="navbar__page" href="${pages[key]}">${key}</a>`;
        }
    }

    static async BuildNavSocials(src) {
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