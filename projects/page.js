import { docx } from "/modules/docx.js";
import { gitx } from "/modules/gitx.js";

docx.loadCss("card");
docx.loadCss("project");

let root = docx.create("div", "panel");
let tempLayout = docx.create("div", "card-layout");
docx.add(root);

initLoading();

let params = new URLSearchParams(window.location.search);
let repo = params.get("repo");
let owner = params.get("owner");

if (repo && owner) {
    await showRepoDetails(repo, owner);
}
else {
    await loadRepoGrid();
}


function initLoading() {
    let card = docx.create("div", "card");
    let title = docx.createWith("p", "card__title", "Loading Repositories. . .");
    card.appendChild(title);
    tempLayout.appendChild(card);
    root.appendChild(tempLayout);
}

async function loadRepoGrid() {
    let layout = docx.create("div", "card-groups");
    let groups = await fetch("/data/projects.json").then(x => x.json());

    for (let name in groups) {
        let group = groups[name];
        let panel = docx.create("div", "card-group");
        layout.appendChild(panel);

        let html = await gitx.buildReposGrid(group.user, group.type, group.topic);
        let cards = docx.createWith("div", "card-layout", html);

        panel.appendChild(docx.createWith("h1", "card-group__title", name));
        panel.appendChild(docx.createWith("p", "card-group__desc", group.desc));
        panel.appendChild(cards);

    }

    tempLayout.remove();
    root.appendChild(layout);
}

async function showRepoDetails(proj, user) {
    let panel = docx.createWith("div", "proj", await gitx.getReadme(proj, user));
    root.appendChild(panel);
}