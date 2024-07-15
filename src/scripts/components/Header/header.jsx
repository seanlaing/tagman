import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {points: 0, playing: true, timer:30};
	}

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		const countDown = setInterval(() =>{
			this.setState({
				timer: this.state.timer-1
			}) 
		},1000);
	}
	componentDidUpdate(){
		if ((this.state.timer<1)||(this.state.points>10)){
			window.alert("Timer finished")
			clearInterval(countDown);
		}
	}
	componentWillUnmount() {
		clearInterval(countDown);
	}

	increase() {
		if (this.state.playing) {
			var currentPoints = this.state.points + 1;
			this.setState({points: currentPoints});
		}
	}

	gameOver() {
		this.setState({playing:false, points: 'GAME OVER'});
	}

	render() {
		return (
			<div className="header">
				<span className="left title">TAGMAN</span>
				<span className="right score">TAGS: <span className="points">{this.state.points}</span></span>
				<span className="middle timer">TIMER: <span className="timer">{this.state.timer}</span></span>
			</div>
		);
	}
}

Header.defaultProps = {

};

export default Header;
