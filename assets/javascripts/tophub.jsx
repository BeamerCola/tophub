//= require jquery/dist/jquery.js
//= require react/react.min.js
//= require react/react-dom.js
//= require_self
//= require_tree ./components

// Global reference to RepositoryList React Component
var repositoryList;

// Since top contributors require a separate API call, to speed
// up things implement and endless scroller
var scrollListener = function () {
  $(window).one("scroll", function () { //unbinds itself every time it fires
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
      repositoryList.query();
    }
    setTimeout(scrollListener, 200);
  });
};

// Github sends back unformated numbers (e.g. 123456)
// Javascript's toLocaleString() isn't cross browser, so here's
// a quick regex to solve it
function digit(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

$(document).ready(function() {
  repositoryList = ReactDOM.render(<RepositoryList />, $("#tophub")[0]);
  scrollListener();
})
