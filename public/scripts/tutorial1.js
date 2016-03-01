


var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{marked(this.props.children.toString())}
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
				Hello, world I am a CommentForm.
				<form><input type="text"></input></form>
			</div>
		);
	}
});

//var data = [
  //{id: 1, author: "Pete Hunt", text: "This is one comment"},
  //{id: 2, author: "Jordan Walke", text: "This is *another* comment"}
//];

var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		console.log('CommentBox.loadCommentsFromServer...');
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
	getInitialState: function() {
		console.log('CommentBox.getInitialState...');
		return {data: []};
	},
	componentDidMount: function() {
		console.log('CommentBox.componentDidMount...');
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  	},
	render: function() {
		console.log('CommentBox.render...');
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm />
			</div>
		);
	}
});

//ReactDOM.render(
//	<CommentBox data={data}/>,
//	document.getElementById('content')
//);
console.log('ReactDOM.render...');
ReactDOM.render(
	<CommentBox url="/api/comments" pollInterval={2000} />,
	document.getElementById('content')
);