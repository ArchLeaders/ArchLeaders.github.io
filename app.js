import { PageBuilder } from "./modules/PageBuilder.js";
import { NavBuilder } from "./modules/NavBuilder.js";

await PageBuilder.BuildRepoList();
await NavBuilder.BuildPages();
await NavBuilder.BuildSocials();