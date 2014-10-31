debugger;
$(function() {

  var store = new Store("settings");
  var github = store.get('github');

  if (github === null) {
    var url = "src/options_custom/index.html#github";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Redirect the current tab if one is found, otherwise create a new one
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, {url: url});
      } else {
        chrome.tabs.create({url: url});
      }
    });
    return;
  }

  var address = JSON.parse(github).repos.default;
  var templates = JSON.parse(github).templates;

  for (var key in templates) {
    var title =  encodeURIComponent('New ' + key);
    var body = encodeURIComponent(templates[key]);
    path = address.split('/');
    user = path[0];
    repo = path[1];

    href = 'https://github.com/' + address + '/issues/new?title=' + title + '&body=' + body;
    $('#repos').append('<li>' +
        '<a href="' + href + '">' + user + '/<strong>' + key + '</strong></a>' +
        '</li>');
  }
  $('#repos a').click(function(e) {
    e.preventDefault();
    var repoLocation = $(e.currentTarget).attr('href');
    // Attempt to fetch the instance of the currently-open tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Redirect the current tab if one is found, otherwise create a new one
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, {url: repoLocation});
      } else {
        chrome.tabs.create({url: repoLocation});
      }
    });
  });
});
