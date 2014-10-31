this.manifest = {
    "name": "8track",
    "icon": "wired8.png",
    "settings": [
        {
            "tab": i18n.get("github"),
            "group": i18n.get("repository"),
            "name": "github_urls",
            "type": "textarea",
            "label": i18n.get("url"),
            "text": i18n.get("repository-help")
        },
        {
          "tab": i18n.get("form"),
          "group": i18n.get("markdown"),
          "name": "markdown",
          "type": "listBox",
          "label": i18n.get("markdown-help"),
          "options":
            [{text:"hot", value: "Hot and yummy"}]
        },
        {
            "tab": i18n.get("form"),
            "group": i18n.get("markdown"),
            "name": "markdown",
            "type": "textarea",
            "text": i18n.get("markdown-help")
        }
    ],
    "alignment": [

    ]
};
