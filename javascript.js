
$( document ).ready(function() {

});
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
/*returns the parameter value from a url*/
function getUrlParameter(param, page_url) {
    if(typeof page_url === 'undefined'){
      page_url = decodeURIComponent(window.location.search.substring(1)); //default url, that is the current url
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
/*creates the next page button*/
function createNextButton(text){
  var btn_next = createNode("a","btn btn-primary btn-next");
  btn_next.textContent = text;
  append(document.getElementById("pagination"), btn_next);
}
/**/
function nextPageURL(link){
  var pagination_links = link.split(','); /*returns something like: Array [ "<https://api.github.com/user/1/repos?page=2&per_page=8>; rel=\"next\"",
                                                                  " <https://api.github.com/user/1/repos?page=8&per_page=8>; rel=\"last\"" ] */
  if(pagination_links.length > 2){
    var next_page = pagination_links[1].split(';'); /*the url is in the first part before the ";"*/
  }else{
    var next_page = pagination_links[0].split(';'); /*the url is in the first part before the ";"*/
  }
  return next_page[0].replace(/<|>/g,''); /*removes the "<" and ">" characters*/
}
/**/
function basicStructure(){

}
