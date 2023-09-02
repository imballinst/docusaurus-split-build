// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const SITE_URL = process.env.SITE_URL || "https://imballinst.github.io";
const BUILD_MODE = process.env.BUILD_MODE || "main";

const BASE_URL = {
  main: "/docusaurus-split-build",
  arsenal: "/docusaurus-split-build/arsenal",
};
const SITE_ABSOLUTE_URL = SITE_URL.concat(BASE_URL[BUILD_MODE]);

const PLUGINS = {
  main: [
    "@docusaurus/plugin-content-docs",
    {
      sidebarPath: require.resolve("./sidebarsMain.js"),
      path: "docs/docs-main",
      routeBasePath: "main",
      // Please change this to your repo.
      // Remove this to remove the "edit this page" links.
      editUrl:
        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
    },
  ],
  arsenal: [
    "@docusaurus/plugin-content-docs",
    {
      sidebarPath: require.resolve("./sidebarsArsenal.js"),
      path: "docs/docs-arsenal",
      routeBasePath: "/",
      // Please change this to your repo.
      // Remove this to remove the "edit this page" links.
      editUrl:
        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
    },
  ],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "My Site",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: SITE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: BASE_URL[BUILD_MODE],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  customFields: {
    buildMode: BUILD_MODE,
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog:
          BUILD_MODE === "main"
            ? {
                showReadingTime: true,
                // Please change this to your repo.
                // Remove this to remove the "edit this page" links.
                editUrl:
                  "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
              }
            : false,
        pages: {
          path: BUILD_MODE === "main" ? "src/pages/main" : "src/pages/arsenal",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: BUILD_MODE === "main",
      },
    ],
    PLUGINS[BUILD_MODE],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "dropdown",
            position: "right",
            label: "Switch documentation",
            items: [
              {
                label: "Main",
                href: SITE_ABSOLUTE_URL,
              },
              {
                label: "Arsenal",
                href: `${SITE_ABSOLUTE_URL}/arsenal`,
              },
            ],
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
