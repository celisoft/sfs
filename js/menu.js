/*
	Display the menu (no preload required)
*/

function menu_create()
{
	//Display a title and the press space bar invitation
	var title = this.game.add.text(this.game.world.centerX, this.game.world.height/4, "Santa's Flappy Sled", {fontSize: '38px', fill: '#FFFFFF'});
	title.anchor.set(0.5);
	var action = this.game.add.text(this.game.world.centerX, 2*this.game.world.height/3, '', {fontSize: '24px', fill: '#FFFFFF'});
	action.anchor.set(0.5);
  	var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'spritesheet');
	player.anchor.set(0.5);
	player.animations.add('right',[0,1,2],6,true);
  	player.animations.play ('right');

	navigator.mozL10n.ready(function() {
  		action.text = navigator.mozL10n.get('touch-invitation-msg');
	});
	
	//Catch click / touch
	this.game.input.onDown.add(start, this);
}

function start()
{
	this.game.state.start('play');
}
