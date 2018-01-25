$( document ).ready(function() {
  var user_name = getUrlParameter('user');
  var curl = 'https://api.github.com/users/' + user_name +'/repos?page=1&per_page=8';
  var btn_next = createNode("a","btn btn-primary btn-next");
  btn_next.setAttribute("href",curl);
  btn_next.textContent = "Next Page";
  append(document.getElementById("pagination"), btn_next);
  getRepositories(curl);
});
function getRepositories(url){
  fetch(url,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
  })
  .then(function(response) {
    console.log(response);
    var pagination_links = response.headers.get('Link').split(',');
    var next_page = pagination_links[0].split(';');
    console.log(next_page);
    $("#pagination .btn-next").attr("href",next_page[0].replace(/<|>/g,''));
    return response.json(); // Transform the data into json
  })
  .then(function(data) {
    //console.log(data);
    data.forEach(createRepoNode);
  })
  .catch(function(error) {
    // If there is any error it will catch here
    console.log(error);
  });
}
function createNode(element, classes){
  var new_element = document.createElement(element);
  if(typeof classes !== 'undefined')
    new_element.className = classes;
  return new_element;
}
function append(parent, el) {
    return parent.appendChild(el);
}
function getUrlParameter(param) {
    var pageURL = decodeURIComponent(window.location.search.substring(1)),
        URLVariables = pageURL.split('&'),
        parameterName;

    for (var i = 0; i < URLVariables.length; i++) {
        parameterName = URLVariables[i].split('=');

        if (parameterName[0] === param) {
            return parameterName[1] === undefined ? true : parameterName[1];
        }
    }
}
function createRepoNode(repo){
  var repo_github = createNode("a", "btn btn-primary"),
      repo_name = createNode("p"),
      repo_description = createNode("p"),
      repo_forks = createNode("p"),
      repo_issues = createNode("p");
      repo_open_issues = createNode("p");
      column = createNode("div", "col-sm-3"),
      repo_box = document.getElementById('repositories-box'),
      thumbnail_div = createNode("div","thumbnail"),
      caption_div = createNode("div","caption");
      repo_github.setAttribute("href", repo.html_url);
      repo_github.setAttribute("target","_blank");
      repo_github.textContent = "Github";
      repo_name.textContent = repo.name;
      repo_description.textContent = repo.description;
      repo_forks.textContent = repo.forks_count;
      repo_issues.textContent = repo.open_issues;
      repo_open_issues.textContent = repo.open_issues;
      append(repo_box,column);
      append(column,thumbnail_div);
      append(thumbnail_div,caption_div);
      append(caption_div,repo_github);
      append(caption_div,repo_name);
      append(caption_div,repo_description);
      append(caption_div,repo_forks);
      append(caption_div,repo_issues);
      append(caption_div,repo_open_issues);
}
