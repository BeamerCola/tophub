// Large grid of repository components.
// Handles it's own querying, you may call `.query()` if you'd like to fetch
// the next set manually
//
var RepositoryList = React.createClass({
  getInitialState: function() {
    return { data: [], page: 1, per_page: 15, loading: false };
  },
  componentDidMount: function() {
    this.query();
  },
  query: function() {
    // Return if endless scrolling hasn't loaded yet
    if (this.state.loading) { return; }

    var _this = this;
    var url = 'https://api.github.com/search/repositories?q=stars:>=0&sort=stars&order=desc&page=' + this.state.page + '&per_page=' + this.state.per_page;
    this.setState({ loading: true })
    $.get(url)
      .done(function(data) {
        _this.setState({
          data: $.merge(_this.state.data, data.items), // Append new items
          page: _this.state.page + 1,                  // Increment Page
          loading: false                               // Stop blocking
        })
      })
  },
  render: function() {
    var repositories = $.map(this.state.data, function(repository) {
      return (
        <Repository data={repository} />
      );
    });

    return (
      <div className="repository-list row">
        {repositories}
      </div>
    )
  }
});
