var STORAGE_KEY = 'store.settings.github_urls';
var MARKDOWN_KEY = 'store.settings.markdown';

$(function() {
  if (localStorage[STORAGE_KEY] === undefined) {
    localStorage[STORAGE_KEY] = '';
  }

  var githubRepos = $.trim(localStorage[STORAGE_KEY]).replace(/\"/g, '').replace(/\\n/g, "\n").split("\n");
  var markdown = encodeURIComponent(localStorage[MARKDOWN_KEY].replace(/\"/g, '').replace(/\\n/g, "\n"));
  var title = encodeURIComponent('New Issue');

  for (var i = 0, path, user, repo, href; i < githubRepos.length; i++) {
    path = githubRepos[i].split('/');
    user = path[0];
    repo = path[1];
    href = 'https://github.com/' + path[0] + '/' + path[1] + '/issues/new?title=' + title + '&body=' + markdown;
    $('#repos').append('<li>' +
        '<a href="' + href + '">' + user + '/<strong>' + repo + '</strong></a>' +
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
