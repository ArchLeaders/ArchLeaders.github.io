import { Octokit, App } from "https://cdn.skypack.dev/octokit";


export class SiteBuilder {
    static async BuildRepoList() {
        let octokit = new Octokit();
        let request = await octokit.request("GET /users/{username}/repos", {
            username: "ArchLeaders",
            type: "forks",
            per_page: 40,
            sort: "pushed"
        });

        let repos = request.data;
        let ul = document.getElementById("github-repos");
        repos.forEach(repo => {
            if (repo.fork) {
                return;
            }

            ul.innerHTML += SiteBuilder.BuildCardHtml(
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
        <div class="card" onclick="location.href='${http}'">
            <a class="card__title">${title}</a>
            <p class="card__desc">${desc}</p>
            <div class="card__info">
                <p class="card__language">${lang}</p>,
                <p class="card__license">${license}</p>
            </div>
        </div>
        `
    }

    static async BuildYouTubeList() {

    }

    static async BuildModList() {

    }
}