export class NavBuilder {
    static async BuildPages() {
        let src = document.getElementById("pages");
        let pages = await fetch("./data/pages.json").then(x => x.json());
        for (let key in pages) {
            src.innerHTML += `<a class="navbar__page" href="${pages[key]}">${key}</a>`;
        }
    }

    static async BuildSocials() {
        let src = document.getElementById("socials")
        let socials = await fetch("./data/socials.json").then(x => x.json());
        for (let key in socials) {
            src.innerHTML += `
            <a class="navbar__social" href="${socials[key]}">
                <img src="./res/${key}.svg" alt="${key} link icon" class="navbar__icon">
                <div class="navbar__social_accent"></div>
            </a>
            `
        }
    }
}