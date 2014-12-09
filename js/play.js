var obstacles;
var clouds;
var gifts;
var score = 0;
var scoreText;
var music, snd_get_gift;
var lastIdx, posX = 0;
var lastCloudId, lastGiftId = 0;;
var isCloudRequired = false;

function play_preload()
{
	if(obstacles)
	{
	}
}

function play_create()
{
  snd_get_gift = this.game.add.audio('get_gift');
  music = this.game.add.audio('music');
  music.play('', 0, 1, true);
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  obstacles = this.game.add.group();
  obstacles.enableBody = true;
  generateGroundObstacles();

  clouds = this.game.add.group();
  clouds.enableBody = true;

  gifts = this.game.add.group();
  gifts.enableBody = true;

  flocons = this.game.add.group();
  flocons.enableBody = true;

  player = this.game.add.sprite(32, this.game.world.height/4, 'playersheet');
  this.game.physics.arcade.enable(player);
  player.scale.setTo(0.5, 0.5);
  player.body.gravity.y=400;
  player.body.collideWorldBounds=true;
  player.animations.add('right',[0,1,2],5,true);
  player.animations.play ('right');

  scoreText=this.game.add.text(this.game.world.width-90,16,'0', {fontSize:'32px',fill:'#ffffff'});

  this.game.time.events.loop(1500, createFallingFlocons, this);
  this.game.time.events.loop(1500, createGroundObstacle, this);
  this.game.time.events.loop(4000, createCloudOrGift, this);
  this.game.input.onDown.add(jump, this);
}

function createFallingFlocons()
{
  	for(var obsIdx=0; obsIdx<5; obsIdx++)
  	{
		var floX = getRandom(this.game.world.width, 0);
		var flocon = flocons.create(floX, -16, 'flocon');
		flocon.body.gravity.y=80+getRandom(20, 0);
		flocon.body.velocity.x=-50;
		flocon.scale.setTo(0.5,0.5);
		flocon.checkWorldBounds = true;
		flocon.outOfBoundsKill = true;
	}

}

function generateGroundObstacles()
{
  	for(var obsIdx=0; obsIdx<6; obsIdx++)
  	{
        	//Only have 6 ground obstacles
		var idx = getRandom(7, lastIdx);
		var obs_id = 'obstacle' + idx;
		posX += 16 + addGroundObstacle(obs_id, posX, obsIdx);
		lastIdx = idx;
  	}
}

function createGroundObstacle()
{
	if(obstacles.length<10 && obstacles.getFirstDead())
	{
		var idx = getRandom(7, lastIdx);
		var obs_id = 'obstacle' + idx;
		addGroundObstacle(obs_id, posX, -1);
		lastIdx = idx;
	}
}

function createCloudOrGift()
{
	if(isCloudRequired)
	{
		var idx = getRandom(3, lastCloudId);
		var cloud_id = 'nuage' + idx;
		addCloud(cloud_id);
		isCloudRequired = false;
		lastCloudId = idx;
	}
	else
	{
		var idx = getRandom(3, lastGiftId);
		var gift_id = 'cadeau' + idx;
		addGift(gift_id);
		isCloudRequired = true;
		lastGiftId = idx;
	}
}

function addGift(pSpriteId)
{
	if(gifts.length<3)
	{
		var gift = gifts.create(gifts.length-1, 138, pSpriteId);
		var gift_height = getRandom(3*this.game.world.height/4, 0);
		gift.reset(this.game.world.width, gift_height);
		gift.body.velocity.x=-290 + getRandom(10, 0);
		gift.scale.setTo(0.5,0.5);
		gift.animations.add('boing',[0,1],4,true);
  		gift.animations.play ('boing');
		gift.checkWorldBounds = true;
		gift.outOfBoundsKill = true;
	}
	else
	{
		var lostGift = gifts.getFirstDead();
		if(lostGift != null)
		{
			var gift_height = getRandom(3*this.game.world.height/4, lostGift.position.y);
			lostGift.reset(this.game.world.width, gift_height);
			lostGift.body.velocity.x=-290 + getRandom(10, 0);
			lostGift.scale.setTo(0.5,0.5);
			lostGift.animations.add('boing',[0,1],4,true);
  			lostGift.animations.play ('boing');
			lostGift.checkWorldBounds = true;
			lostGift.outOfBoundsKill = true;
		}
	}
}


function addCloud(pSpriteId)
{
	if(clouds.length<5)
	{
		var cloud = clouds.create(clouds.length-1, 138, pSpriteId);
		var cloud_height = getRandom(3*this.game.world.height/4, 0);
		cloud.reset(this.game.world.width, cloud_height);
		cloud.body.velocity.x=-290 + getRandom(10, 0);
		cloud.checkWorldBounds = true;
		cloud.outOfBoundsKill = true;
	}
	else
	{
		var lostCloud = clouds.getFirstDead();
		if(lostCloud != null)
		{
			var cloud_height = getRandom(3*this.game.world.height/4, lostCloud.position.y);
			lostCloud.reset(this.game.world.width, cloud_height);
			lostCloud.body.velocity.x=-290 + getRandom(10, 0);
			lostCloud.checkWorldBounds = true;
			lostCloud.outOfBoundsKill = true;
		}
	}
}

function addGroundObstacle(pSpriteId, pPosX, pId)
{
	var obs;
	if(pId >= 0)
	{	
		obs = obstacles.create(pId, this.game.world.height, pSpriteId);
		obs.position.x = pPosX;
		obs.position.y = this.game.world.height-(obs.height*3/4);	
	}
	else
	{
		obs = obstacles.getFirstDead();	
		obs.reset(this.game.world.width, this.game.world.height-(obs.height*3/4));
	}
	
	obs.scale.setTo(0.75, 0.75);
	obs.body.velocity.x = -280;
	obs.checkWorldBounds = true;
	obs.outOfBoundsKill = true;
	return obs.width;
}

function getRandom(pMax, pIgnore)
{
	var randValue = Math.floor(Math.random()*pMax);
	while(randValue == pIgnore)
	{
		randValue = Math.floor(Math.random()*pMax);
	}
	return randValue;
}

//Called when player collapse with something
function loose(player, obstacles)
{
	score = 0;
	lastIdx = 0;
	lastCloudId = 0;
	lastGiftId = 0;
	posX = 0;

	player.kill();

	obstacles.destroy();
	clouds.destroy();
	gifts.destroy();

	this.game.sound.remove(music);
	this.game.state.start('menu');
}

function jump()
{
      	player.body.velocity.y = -180;
}

function get_a_gift(player, gift)
{
	snd_get_gift.play(); 
	gift.kill();
	score += 1;
	scoreText.text = score;
	
}

//Update function
function play_update()
{
	this.game.physics.arcade.overlap(player, obstacles, loose, null, this);
	this.game.physics.arcade.overlap(player, clouds, loose, null, this);
	this.game.physics.arcade.overlap(player, gifts, get_a_gift, null, this);
}
