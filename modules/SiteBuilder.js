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
            if (!repo.fork) {
                ul.innerHTML += SiteBuilder.BuildCardHtml(
                    repo.name,
                    repo.html_url,
                    repo.description,
                    repo.created_at,
                    repo.language,
                    repo.license.name
                )
            }
        });
    }

    static BuildCardHtml(title, http, desc, date, lang, license) {
        let parsedDate = Date.parse(date).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        return `
        <div class="card">
            <a class="card__title" target="_blank" href="${http}">${title}</a>
            <p class="card__desc">${desc}</p>
            <hr class="class_seperator">
            <div class="card__info">
                <p class="card__language">${lang}</p>,
                <p class="card__license">${license}</p>
            </div>
        </div>
        `
    }

    static async BuildGameBananaList() {

    }

    static async BuildSocialList() {

    }
}