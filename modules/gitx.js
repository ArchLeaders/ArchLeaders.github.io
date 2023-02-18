import { Octokit } from "https://cdn.skypack.dev/octokit";

let octokit = new Octokit();

export class gitx {
    static async loadReposFrom(username, type) {
        let repos = [];
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
        return repos;
    }

    static async buildReposGrid(username, type, topic) {
        let html = '';
        let repos = await this.loadReposFrom(username, type);
        repos.forEach(repo => {
            if (repo.name == `${username}.github.io` || repo.name == ".github" || repo.fork || !repo.topics.includes(topic)) {
                return;
            }

            html += this.buildRepoCardHtml(
                repo.name,
                repo.owner.login, type,
                repo.description ?? "None",
                repo.language ?? "None",
                repo.license?.name ?? "None"
            )
        });

        return html;
    }

    static buildRepoCardHtml(name, author, type, desc, lang, license) {
        return `
        <button class="card" onclick="window.location.search = '?proj=${name}&user=${author}&type=${type}'">
            <a class="card__title">${name}</a>
            <p class="card__desc">${desc}</p>
            <div class="card__info">
                <p class="card__language">${lang}</p>,
                <p class="card__license">${license}</p>
            </div>
        </button>`;
    }

    static getReadme(proj, user, type) {

    }
}