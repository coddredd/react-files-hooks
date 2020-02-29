module.exports = {
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc"]
  },
  "source": {
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs)"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "opts": {
    "destination": "./docs/",
    "encoding": "utf8",
    "recurse": true,
    "template": "node_modules/docdash"
  },
  "docdash": {
    "sectionOrder": [
      "Modules",
      "Classes",
      "Interfaces"
    ],
    "meta": {
      "title": "React Files Hooks",
      "description": "Open source React library for upload and download files that works in all browsers.",
      "keyword": "React hooks files upload download"
    },
    "menu": {
      "Project GitHub": {
        "href":"https://github.com/coddredd/react-download-hook.git",
        "target":"_blank",
        "class":"menu-item",
        "id":"website_link"
      },
    },
    "typedefs": true,
    "nameInOutputPath": true,
    "versionInOutputPath": true
  }
};