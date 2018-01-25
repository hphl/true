$( document ).ready(function() {
  var curl = 'https://api.github.com/users?since=0';
  var btn_load = createNode("button","btn btn-primary btn-load-users");
  btn_load.setAttribute("data-link",curl);
  btn_load.textContent = "Load More Users";
  append(document.getElementById("pagination"), btn_load);
  getUsers(curl);
  $(".btn-load-users").click(function(){
    getUsers($(this).attr("data-link"));
  });
});
function getUsers(url){
  fetch(url,{
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
  })
  .then(function(response) {
    var pagination_links = response.headers.get('Link').split(',');
    var next_page = pagination_links[0].split(';');
    $("#pagination .btn-load-users").attr("data-link",next_page[0].replace(/<|>/g,''));
    return response.json(); // Transform the data into json
  })
  .then(function(data) {
    //console.log(data);
    data.forEach(createUserNode);
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
function createUserNode(user){
  var user_img = createNode("img", "img-responsive"),
      user_github = createNode("a", "btn btn-primary"),
      user_repositories = createNode("a", "btn btn-default pull-right"),
      user_name = createNode("h3"),
      column = createNode("div", "col-sm-3"),
      user_box = document.getElementById('users-box'),
      thumbnail_div = createNode("div","thumbnail"),
      caption_div = createNode("div","caption");
      user_img.src = user.avatar_url;
      user_github.setAttribute("href", user.html_url);
      user_github.setAttribute("target","_blank");
      user_github.textContent = "Git Account";
      user_repositories.setAttribute("href",document.URL.substr(0,document.URL.lastIndexOf('/')) + '/repository.html?' + "user=" + user.login);
      user_repositories.textContent = "Repositories";
      user_name.textContent = user.login;
      append(user_box,column);
      append(column,thumbnail_div);
      append(thumbnail_div,user_img);
      append(thumbnail_div,caption_div);
      append(caption_div,user_name);
      append(caption_div,user_github);
      append(caption_div,user_repositories);
}
