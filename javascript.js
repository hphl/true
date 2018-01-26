
$( document ).ready(function() {
  getUsers(); //creates the users from github
  var btn_load = createNode("button","btn btn-primary btn-load-users");
  btn_load.textContent = "Load More Users";
  append(document.getElementById("pagination"), btn_load);
  $(".btn-load-users").click(function(){
    getUsers($(this).attr("data-link"));
  });
});
/*function that gets the users from github and creates the layout*/
function getUsers(url){
  if(typeof url === 'undefined'){ //if there is no url in the parameter, it will set a default url
    url = 'https://api.github.com/users?since=0';
  }
  fetch(url,{
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(function(response) {
    var pagination_links = response.headers.get('Link').split(','),
        next_page = pagination_links[0].split(';');
    $(".btn-load-users").attr("data-link",next_page[0].replace(/<|>/g,''));
    return response.json(); // Transform the data into json
  })
  .then(function(data) {
    //console.log(data);
    data.forEach(createUserNode);//creates the layout of each user
  })
  .catch(function(error) {
    // If there is any error it will catch here
    console.log(error);
  });
}
/*creates a new html element*/
function createNode(element, classes){
  var new_element = document.createElement(element); //creates the element
  if(typeof classes !== 'undefined') //checks if there are classes in the parameters to assign in the element
    new_element.className = classes;
  return new_element;
}
/*appends an element to another element*/
function append(parent, element) {
    return parent.appendChild(element);
}
/*creates the layout of a user*/
function createUserNode(user){
  var user_img = createNode("img", "img-responsive"),
      user_github = createNode("a", "btn btn-primary"),
      user_repositories = createNode("a", "btn btn-default"),
      user_name = createNode("h3","text-center flex-text"),
      column = createNode("div", "col-xs-6 col-sm-4 col-md-3"),
      user_box = document.getElementById('users-box'),
      thumbnail_div = createNode("div","thumbnail"),
      caption_div = createNode("div","caption"),
      list_inline = createNode("ul","list-inline text-center"),
      li_elem_one = createNode("li"),
      li_elem_two = createNode("li");

      user_img.src = user.avatar_url;
      user_github.setAttribute("href", user.html_url);
      user_github.setAttribute("target","_blank");
      user_github.textContent = "Git Account";
      user_repositories.setAttribute("href",document.URL.substr(0,document.URL.lastIndexOf('/')) + '/repository.html?' + 'user=' + user.login + '&page=1&per_page=8');
      user_repositories.textContent = "Repositories";
      user_name.textContent = user.login;

      append(user_box,column);
      append(column,thumbnail_div);
      append(thumbnail_div,user_img);
      append(thumbnail_div,caption_div);
      append(caption_div,user_name);
      append(caption_div,list_inline);
      append(list_inline,li_elem_one);
      append(li_elem_one,user_github);
      append(list_inline,li_elem_two);
      append(li_elem_two,user_repositories);
}
function basicStructure(){
  
}
