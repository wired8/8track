window.addEvent("domready", function () {

  var settings = new FancySettings("8track", "wired8.png");
  var store = new Store("settings");

  var github = store.get('github');
  var template_options = [ { text: "New", value: "New"} ];
  if (github !== undefined) {
    templates = JSON.parse(github).templates;
    for (var key in templates) {
      template_options.push( { text: key, value: key } );
    }
  }
  var repo_options = [ { text: "New", value: "New"} ];
  if (github !== undefined) {
    repos = JSON.parse(github).repos;
    for (var key in repos) {
      if (key !== 'default') {
        repo_options.push({ text: key, value: key });
      }
    }
  }

  this.repos = settings.create({
    "tab": i18n.get("github"),
    "group": i18n.get("repository"),
    "name": "repos",
    "type": "select",
    "label": i18n.get("repository-help"),
    "options": repo_options,
    "id": "repos"
  });

  this.repos.element.addEvent("change", (function (event) {
    var s = store.get("github");
    var github = {};
    if (s !== undefined) {
      github = JSON.parse(s);
    }
    var id = event.target.selectedOptions[0].value;

    if (id === 'New') {
      reponame.set('value', '');
      default_repo.checked = false;
    } else {
      reponame.set('value', id);
      default_repo.checked = github.repos.default === id ? true : false;
    }

  }).bind(this));

  settings.create({
    "tab": i18n.get("github"),
    "group": i18n.get("repository"),
    "name": "repo-name",
    "type": "text",
    "event": false,
    "text": i18n.get("repo-name"),
    "id": "reponame"
  });

  this.templates = settings.create({
    "tab": i18n.get("form"),
    "group": i18n.get("markdown"),
    "name": "templates",
    "type": "select",
    "label": i18n.get("template"),
    "options": template_options,
    "id": "templates"
  });

  this.templates.element.addEvent("change", (function (event) {
    var s = store.get("github");
    var github = {};
    if (s !== undefined) {
      github = JSON.parse(s);
    }
    var id = event.target.selectedOptions[0].value;

    if (id === 'New') {
      templatename.set('value', '');
      markdown.set('value', '');
    } else {
      templatename.set('value', id);
      markdown.set('value', github.templates[id]);
    }
  }).bind(this));

  settings.create({
    "tab": i18n.get("github"),
    "group": i18n.get("repository"),
    "name": "default_repo",
    "type": "checkbox",
    "label": i18n.get("default"),
    "text": i18n.get("repository-help"),
    "id": "default_repo"
  });

  settings.create({
    "tab": i18n.get("form"),
    "group": i18n.get("markdown"),
    "name": "template-name",
    "type": "text",
    "event": false,
    "text": i18n.get("template-name"),
    "id": "templatename"
  });

 settings.create({
    "tab": i18n.get("form"),
    "group": i18n.get("markdown"),
    "name": "markdown",
    "type": "textarea",
    "event": false,
    "text": i18n.get("markdown-help"),
    "id": "markdown"
  });

  var save_template = settings.create({
    "tab": i18n.get("form"),
    "group": i18n.get("markdown"),
    "name": "saveTemplate",
    "type": "button",
    "event": false,
    "text": i18n.get("save")
  });

  save_template.addEvent("action", (function (e) {
    var s = store.get("github");
    var github = {};
    if (s !== undefined) {
      github = JSON.parse(s);
    }
    var md = markdown.value;
    var name = templatename.value;

    $('templates').getElements('option').filter(function(opt,idx){
      return (opt.get('value') == name) ? true : false;
    }).dispose();

    var option = document.createElement("option");
    option.text = name;
    option.value = name;
    this.templates.element.add(option);
    this.templates.element.selectedIndex = this.templates.element.options.length-1;

    if (github.templates === undefined) {
      github.templates = {};
    }

    github.templates[name] = md;

    store.set("github", JSON.stringify(github));

  }).bind(this));

  var remove_template = settings.create({
    "tab": i18n.get("form"),
    "group": i18n.get("markdown"),
    "name": "removeTemplate",
    "type": "button",
    "event": false,
    "text": i18n.get("remove")
  });

  remove_template.addEvent("action", (function (e) {
    var name = templatename.value;
    var s = store.get("github");
    var github = {};
    if (s !== undefined) {
      github = JSON.parse(s);
    }

    delete github.templates[name];
    store.set("github", JSON.stringify(github));

    $('templates').getElements('option').filter(function(opt,idx){
      return (opt.get('value') == name) ? true : false;
    }).dispose();

    templatename.set('value', '');
    markdown.set('value', '');

  }).bind(this));


  var save_repo = settings.create({
    "tab": i18n.get("github"),
    "group": i18n.get("repository"),
    "name": "saveRepo",
    "type": "button",
    "event": false,
    "text": i18n.get("save")
  });

  save_repo.addEvent("action", (function (e) {
    var s = store.get("github");
    var github = {};
    if (s !== undefined) {
      github = JSON.parse(s);
    }
    var name = reponame.value;
    var is_default = default_repo.checked ? true : false;

    $('repos').getElements('option').filter(function(opt,idx){
      return (opt.get('value') == name) ? true : false;
    }).dispose();

    var option = document.createElement("option");
    option.text = name;
    option.value = name;
    this.repos.element.add(option);
    this.repos.element.selectedIndex = this.repos.element.options.length-1;

    if (github.repos === undefined) {
      github.repos = {};
    }

    github.repos[name] = {
      name: name
    };

    if (is_default) {
      github.repos.default = name;
    }

    store.set("github", JSON.stringify(github));

  }).bind(this));

  var remove_repo = settings.create({
    "tab": i18n.get("github"),
    "group": i18n.get("repository"),
    "name": "removeRepo",
    "type": "button",
    "event": false,
    "text": i18n.get("remove")
  });

  remove_repo.addEvent("action", (function (e) {
    var name = reponame.value;
    var s = store.get("github");
    var github = {};
    if (s !== undefined) {
      github = JSON.parse(s);
    }

    delete github.repos[name];
    store.set("github", JSON.stringify(github));

    $('repos').getElements('option').filter(function(opt,idx){
      return (opt.get('value') == name) ? true : false;
    }).dispose();

    reponame.set('value', '');

  }).bind(this));


});
