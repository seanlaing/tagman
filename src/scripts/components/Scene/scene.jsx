import React from 'react';
import ReactDOM from 'react-dom';
import {useSwipeable, Swipeable} from 'react-swipeable'

import Pacman from '../Pacman/pacman.jsx';
import Ghost from '../Ghost/ghost.jsx';
import Food from '../Food/food.jsx';

import tbt from '../../../assets/images/tbt.png';
import liv from '../../../assets/images/liv.png';
import bri from '../../../assets/images/bri.png';
import feetch from '../../../assets/images/feetch.png';
import mazur from '../../../assets/images/mazur.png';
import slocum from '../../../assets/images/slocum.png';
import wordferri from '../../../assets/images/wordferri.png';
import squeege from '../../../assets/images/squeege.png';
import ace from '../../../assets/images/ace.png';
import kenny from '../../../assets/images/kenny.png';
import squirrel from '../../../assets/images/squirrel.png';
import smash from '../../../assets/images/smash.png';

class Scene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		pacman:tbt,
		ghosts:[liv,bri,feetch,mazur,slocum,wordferri,squeege,ace,kenny,squirrel,smash]
	}
}
	
	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		this.crashed = false;
		this.intervalCrash = setInterval(this.lookForCrash.bind(this), 100);
		this.intervalFood = setInterval(this.lookForEat.bind(this), 100);
	}
	

	lookForCrash() {
		let pacman1;
		if (this.refs.pacman.state) {
			pacman1 = this.refs.pacman.state
		}
	//	console.log("pacman", pacman1);
		
		var pacmanX = pacman1.position.left;
		var pacmanY = pacman1.position.top;
		var pacmanLastX = pacman1.position.left + this.refs.pacman.props.pacmanSize;
		var pacmanLastY = pacman1.position.top + this.refs.pacman.props.pacmanSize;

		for (var i = 0; i <= this.state.ghosts.length; i++) {
			var currentGhost = this.refs['friend' + i];
			var currentGhostX = currentGhost.state.position.left;
			var currentGhostY = currentGhost.state.position.top;
			var currentGhostLastX = currentGhost.state.position.left + currentGhost.props.ghostSize;
			var currentGhostLastY = currentGhost.state.position.top + currentGhost.props.ghostSize;

			if ((pacmanX >= currentGhostX && pacmanX <= currentGhostLastX) || (pacmanLastX >= currentGhostX && pacmanLastX <= currentGhostLastX)) {
				if ((pacmanY >= currentGhostY && pacmanY <= currentGhostLastY) || (pacmanLastY >= currentGhostY && pacmanLastY <= currentGhostLastY)) {

					const temp = this.state.ghosts;
					const pacmantemp = this.state.pacman;
					temp.splice(i,1, pacmantemp);
					this.setState({
						pacman:currentGhost.props.friend,
						ghosts:temp
					});
					currentGhost.kill();
					console.log("cg props" , currentGhost.props.friend , "cg state" , currentGhost.state.friend );
					this.props.increase();
				}
			}
		}
	}

	lookForEat() {
		var pacmanX = this.refs.pacman.state.position.left;
		var pacmanY = this.refs.pacman.state.position.top;
		var pacmanLastX = this.refs.pacman.state.position.left + this.refs.pacman.props.pacmanSize / 2;
		var pacmanLastY = this.refs.pacman.state.position.top + this.refs.pacman.props.pacmanSize / 2;

		for (var i = 1; i <= this.amountOfFood; i++) {
			var currentFood = this.refs['food' + i];
			var currentFoodX = currentFood.state.position.left;
			var currentFoodY = currentFood.state.position.top;
			var currentFoodLastX = currentFood.state.position.left + currentFood.props.foodSize / 2;
			var currentFoodLastY = currentFood.state.position.top + currentFood.props.foodSize / 2;

			if ((pacmanX >= currentFoodX && pacmanX <= currentFoodLastX) || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
				if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY) || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
					if (!currentFood.state.hidden) {
						currentFood.ate();
					}
				}
			}

			if (this.crashed) {
				clearInterval(this.intervalFood);
			}
		}
	}

	render() {
		var foods = [];
		this.amountOfFood = ((window.innerWidth - this.props.border - this.props.foodSize ) * (window. innerHeight - this.props.border - this.props.topScoreBoard)) / (this.props.foodSize * this.props.foodSize);
		var currentTop = 0;
		var currentLeft = 0;
		for (var i = 0; i < this.amountOfFood; i++) {
			if (currentLeft + this.props.foodSize >= window.innerWidth  - this.props.border) {
				currentTop += this.props.foodSize;
				currentLeft = 0;
			}

			if (currentTop + this.props.foodSize >= (window. innerHeight - this.props.border - this.props.topScoreBoard)) {
				break;
			}

			var position = {left: currentLeft, top: currentTop};
			currentLeft = currentLeft + this.props.foodSize;
		    foods.push(<Food ref={ 'food' + i } position = {position} key = {i} />);
		}
		const ghosts = this.state.ghosts.map((ghost, index) => {
			return <Ghost key={index} friend={ghost} ref={`friend${index}`}></Ghost>
		})
		return (
			<Swipeable onSwipedLeft={(eventData) => eventHandler} className="scene">
				{foods}
				<Pacman friend={this.state.pacman} ref="pacman"></Pacman>
				{ghosts}
			</Swipeable>
		);
	}
}

Scene.defaultProps = {
	foodSize: 60,
	border: 20,
	topScoreBoard: 100
};

export default Scene;
