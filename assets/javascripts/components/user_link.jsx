var UserLink = React.createClass({
  render: function() {
    var url = "http://github.com/" + this.props.user.login;
    return (
      <span className="user-link">
        <i><a href={url}><img src={this.props.user.avatar_url} className="img-circle" width="16" height="16" align="center" /></a></i>&nbsp;
        <a href={url}>{this.props.user.login}</a>
      </span>
    )
  }
});
