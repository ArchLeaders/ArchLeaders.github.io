import { Octokit, App } from "https://cdn.skypack.dev/octokit";

let octokit = new Octokit();
let repos = [];

export class PageBuilder {

    static async LoadRepos(username, type) {
        let user = await octokit.request("GET /{_type}/{username}", {
            _type: type,
            username: username
        }).then(x => x.data);

        let page = 1;
        while (repos.length < user.public_repos) {
            let _repos = await octokit.request("GET /{_type}/{username}/repos", {
                _type: type,
                username: username,
                type: 'public',
                per_page: user.public_repos > (100 * page) ? 100 : user.public_repos - (100 * (page - 1)),
                page: page
            }).then(x => x.data);

            repos = repos.concat(_repos);
            page++;
        }

        console.log(`Received ${repos.length} repositories from 'GET /${type}/${username}/repos'`)
    }

    static async BuildProjectsPage(topic) {
        await this.LoadRepos("ArchLeaders", 'users');

        let elements = '';
        repos.forEach(repo => {
            if (repo.fork || !repo.topics.includes(topic)) {
                return;
            }

            elements += this.BuildCardHtml(
                repo.name,
                repo.html_url,
                repo.description ?? "None",
                repo.language ?? "None",
                repo.license?.name ?? "None"
            )
        });

        document.getElementById("github-repos").innerHTML = elements;
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