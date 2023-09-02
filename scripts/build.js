const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

execSync("yarn build:arsenal", { stdio: "inherit" });
execSync("yarn build:main", { stdio: "inherit" });

// Move into the same `build` folder.
const PATH_OF_MAIN_BUILD = path.join(process.cwd(), "output/main");
const PATH_OF_ARSENAL_BUILD = path.join(process.cwd(), "output/arsenal");

const PATH_OF_PUBLISH = path.join(process.cwd(), "build");

fs.renameSync(PATH_OF_MAIN_BUILD, PATH_OF_PUBLISH);
fs.renameSync(PATH_OF_ARSENAL_BUILD, path.join(PATH_OF_PUBLISH, "arsenal"));
