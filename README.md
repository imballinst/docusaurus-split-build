# docusaurus-split-build

When using Docusaurus multi-docs instance (or multi-versions, or multi-languages), the build time can become significantly higher. This repository is a PoC of splitting the build so that the build can be done in parallel. The idea is:

1. When building, use environment variables to determine which docs to build.
   1. In our case, we are using `BUILD_MODE`.
   1. This `BUILD_MODE` is used to determine which docs instance to build. In the process, it's also used to determine some other things, such as `@docusaurus/plugin-content-pages` path, `@docusaurus/plugin-content-docs` array, `@docusaurus/plugin-content-blog`, navigation bar links, and `baseUrl`,
1. Example of cases:
   1. When `BUILD_MODE=main`, then we include the `docs-main`, blog, `src/pages/main`, and the navigation bar for the `main` doc instance.
   1. When `BUILD_MODE=arsenal`, then we include the `docs-arsenal`, blog, `src/pages/arsenal`, and the navigation bar for the `arsenal` doc instance.
1. Since they are built differently, then they also emit different sitemap.
   1. For `main` doc instance: https://imballinst.github.io/docusaurus-split-build/sitemap.xml.
   1. For `arsenal` doc instance: https://imballinst.github.io/docusaurus-split-build/arsenal/sitemap.xml.
   1. What this means, if we are using search, be it [local search](https://github.com/cmfcmf/docusaurus-search-local) or other existing tools for crawling, the crawling process will be localized only for that doc instance. This allows us to still be able to use a single repository for multiple documentations.

## Demo

https://imballinst.github.io/docusaurus-split-build/

## Future works

At the moment, the build is still done in sequential, but it should be pretty straightforward to split it into parallel builds and upload them separately into `gh-pages` branch.

What we need to tweak is as the following:

1. Split the publish action into 2: `publish-main.yaml` and `publish-arsenal.yaml`.
2. Instead of using `yarn build`, then use the more-specific-build-command, such as `yarn build:main` and `yarn build:arsenal`.
3. After the build, instead of using the `peaceiris/actions-gh-pages@v3` GitHub Action, we need to publish this manually. This is because with that GitHub Action, we are using [keep_files: boolean](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-keeping-existing-files-keep_files) which means, all folders in `gh-pages` are deleted, or there will be some leftover files from the previous build. To play around this, we can do it by either:
   1. For `main` build, remove all files and folders except for `arsenal` folder. As for `arsenal` build, it's easier. We can just remove the `arsenal` folder and add it back.
   2. For `main` build, move the `arsenal` folder out first. Then, remove all files and folders in the workspace, and copy the build result of `main`. For the `arsenal` build, it's the same as above.
