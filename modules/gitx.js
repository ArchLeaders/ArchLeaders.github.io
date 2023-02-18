import { Octokit } from "https://cdn.skypack.dev/octokit";

let octokit = new Octokit();
let cache = {}

export class gitx {
    static async loadReposFrom(name, type) {
        if (cache[name] != null) {
            return cache[name];
        }

        let repos = [];
        let user = await octokit.request("GET /{_type}/{username}", {
            _type: type,
            username: name
        }).then(x => x.data);

        let page = 1;
        while (repos.length < user.public_repos) {
            let _repos = await octokit.request("GET /{_type}/{username}/repos", {
                _type: type,
                username: name,
                type: 'public',
                per_page: user.public_repos > (100 * page) ? 100 : user.public_repos - (100 * (page - 1)),
                page: page
            }).then(x => x.data);

            repos = repos.concat(_repos);
            page++;
        }

        console.log(`Received ${repos.length} repositories from 'GET /${type}/${name}/repos'`)
        cache[name] = repos;
        return repos;
    }

    static async buildReposGrid(name, type, topic) {
        let html = '';
        let repos = await this.loadReposFrom(name, type);
        repos.forEach(repo => {
            if (repo.name == `${name}.github.io` || repo.name == ".github" || repo.fork || !repo.topics.includes(topic)) {
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