
$( document ).ready(function() {
  createNextButton("Next Page");
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
    var next_page_num = getUrlParameter("page",nextPageURL(response.headers.get('Link'))); /*gets the next page number from the next page url*/
    var base_url = document.URL.substring(0,document.URL.indexOf('?')+1); /*gets the current base url*/
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
/*creates the repos layout*/
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
