import React from 'react';
import ReactDOM from 'react-dom';
import SVGInline from "react-svg-inline";



class Ghost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {position: {top: 300, left: 300}, direction: 'left'}
		// this.friend= props.friend;
	}

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		this.moveInterval = setInterval(this.move.bind(this), 100);
		this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), 500);
	}


	kill() {
		this.setState({position: {top: 0, left: 0}, direction: 'left'}); 
	}

	changeDirection() {
		var movement = Math.floor(Math.random() * 4) + 0;
		var arrayOfMovement = ['left', 'up', 'down', 'right'];

		this.setState({direction: arrayOfMovement[movement] });
	}

	move() {

		var currentLeft = this.state.position.left;
		var currentTop = this.state.position.top;

		if (this.state.direction === 'left') {
			this.setState({
				position: {top: currentTop, left: Math.max(currentLeft - this.props.velocity, 0) }
			});
		} else {
			if (this.state.direction  === 'up') {
				this.setState({
					position: {top: Math.max(currentTop - this.props.velocity, 0), left: currentLeft }
				});
			} else {
				if (this.state.direction  === 'right') {
					this.setState({
						position: {top: currentTop, left: Math.min(currentLeft + this.props.velocity, window.innerWidth - this.props.border - this.props.ghostSize) }
					});
				} else {
					this.setState({
						position: {top: Math.min(currentTop + this.props.velocity, window.innerHeight - this.props.ghostSize - this.props.border - this.props.topScoreBoard), left: currentLeft }
					});
				}
			}
		}
	}

render() {
		return (
			<div style = {this.state.position} className = {"ghost "+this.props.friend}>
				< img src={this.props.friend} className="friend" height="40px" width="40px" />
			</div>
		);
	}
}

Ghost.defaultProps = {
	velocity: 20,
	ghostSize: 60,
	border: 20,
	topScoreBoard: 100
};

export default Ghost;
