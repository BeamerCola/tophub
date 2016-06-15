// A repository card
// Upon mounting it fetches contributors and updates itself to render the
// top contributor
//
// TODO: Move contributor to it's own component so it can handle any API calls
//
var Repository = React.createClass({
  getInitialState: function() {
    return { data: {}, contributors: [] };
  },
  queryContributors: function() {
    var _this = this;
    $.get('https://api.github.com/repos/' + this.props.data.full_name + '/contributors')
      .done(function(data) {
        _this.setState({ contributors: data });
      })
  },
  componentDidMount: function() {
    this.queryContributors();
  },
  render: function() {
    var topContributor = {};
    if (this.state.contributors.length > 0) {
      topContributor = this.state.contributors[0];
    }
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="card card-repository">
          <div className="card-block">
            <h4><a href="{this.props.data.html_url}">{this.props.data.name}</a></h4>
            <small className="text-muted">
              <p className="card-repository-meta-repo text-success">
                <i className="fa fa-code-fork"></i> {this.props.data.full_name}
              </p>
              <ul className="list-inline card-repository-meta">
                <li className="list-inline-item card-repository-meta-user text-primary">
                  <UserLink user={this.props.data.owner} />
                </li>
                <li className="list-inline-item card-repository-meta-stars text-warning">
                  <i className="fa fa-star"></i> {digit(this.props.data.stargazers_count)}
                </li>
              </ul>
            </small>
          </div>
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <small>
                <div className="pull-xs-right text-muted">Top Contributor</div>
                <div className="pull-xs-left">
                  <UserLink user={topContributor} />
                </div>
                <div className="clearfix"></div>
              </small>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
