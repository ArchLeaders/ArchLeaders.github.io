export class PageBuilder {
    static async BuildRepoList() {
        let repos = await fetch("https://api.github.com/users/ArchLeaders/repos?type=forks&per_page=40&sort=pushed").then(x => x.json());
        let ul = document.getElementById("github-repos");
        repos.forEach(repo => {
            if (repo.fork) {
                return;
            }

            ul.innerHTML += this.BuildCardHtml(
                repo.name,
                repo.html_url,
                repo.description ?? "None",
                repo.language ?? "None",
                repo.license?.name ?? "None"
            )
        });
    }

    static BuildCardHtml(title, http, desc, lang, license) {
        return `
        <button class="card" onclick="location.href='${http}'">
            <a class="card__title">${title}</a>
            <p class="card__desc">${desc}</p>
            <div class="card__info">
                <p class="card__language">${lang}</p>,
                <p class="card__license">${license}</p>
            </div>
        </button>
        `
    }

    static async BuildYouTubeList() {

    }

    static async BuildModList() {

    }
}