
$( document ).ready(function() {
  var btn_next = createNode("a","btn btn-primary btn-next");
  btn_next.textContent = "Next Page";
  append(document.getElementById("pagination"), btn_next);
  getRepositories();
});
/*creates the repositories to display*/
function getRepositories(){
  var user_name = getUrlParameter('user'),
      current_page = getUrlParameter("page"),
      per_page = getUrlParameter("per_page"),
      url = 'https://api.github.com/users/' + user_name +'/repos?page=' + current_page + '&per_page=' + per_page;
  fetch(url,{
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(function(response) {
    var pagination_links = response.headers.get('Link').split(',');
    var next_page = pagination_links[0].split(';');
    next_page = next_page[0].replace(/<|>/g,'');
    var next_page_num = getUrlParameter("page",next_page);
    var base_url = document.URL.substring(0,document.URL.indexOf('?')+1);
    $(".btn-next").attr("href",base_url +'&user=' + user_name + '&page=' + next_page_num + '&per_page=' +  per_page);
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
function getUrlParameter(param, page_url) {
    if(typeof page_url === 'undefined'){
      page_url = decodeURIComponent(window.location.search.substring(1));
    }else{
      page_url = page_url.substring(page_url.indexOf('?') + 1);
    }
    var url_variables = page_url.split('&'),
        parameter_name;
    for (var i = 0; i < url_variables.length; i++) {
        parameter_name = url_variables[i].split('=');
        if (parameter_name[0] === param) {
            return parameter_name[1] === undefined ? true : parameter_name[1];
        }
    }
}
function createRepoNode(repo){
  var repo_github = createNode("a", "btn btn-primary center-block"),
      repo_name = createNode("h3","text-center ellipsis"),
      repo_description = createNode("p","flex-text"),
      repo_forks = createNode("li","list-group-item"),
      repo_open_issues = createNode("li","list-group-item");
      column = createNode("div", "col-xs-6 col-sm-4 col-md-3"),
      repo_box = document.getElementById('repositories-box'),
      thumbnail_div = createNode("div","thumbnail"),
      caption_div = createNode("div","caption"),
      badge_forks = createNode("span","badge"),
      badge_open_issues = createNode("span","badge"),
      list_group = createNode("ul", "list-group");
      repo_github.setAttribute("href", repo.html_url);
      repo_github.setAttribute("target","_blank");
      repo_github.textContent = "Github";
      repo_name.textContent = repo.name;
      repo_description.textContent = repo.description;
      repo_forks.textContent = "Forks ";
      badge_forks.textContent = repo.forks_count;
      repo_open_issues.textContent = "Open Issues ";
      badge_open_issues.textContent = repo.open_issues;
      append(repo_box,column);
      append(column,thumbnail_div);
      append(thumbnail_div,caption_div);
      append(caption_div,repo_name);
      append(caption_div,repo_description);
      append(caption_div,list_group);
      append(list_group,repo_open_issues);
      append(repo_open_issues,badge_open_issues);
      append(list_group,repo_forks);
      append(repo_forks,badge_forks);
      append(caption_div,repo_github);
}
