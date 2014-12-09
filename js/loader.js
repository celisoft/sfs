var loadText;
var progressText;

function preload_data()
{
  this.game.load.image('obstacle0', 'assets/gfx/maison1.png');
  this.game.load.image('obstacle1', 'assets/gfx/maison2.png');
  this.game.load.image('obstacle2', 'assets/gfx/lampadaire.png');
  this.game.load.image('obstacle3', 'assets/gfx/maison3.png');
  this.game.load.image('obstacle4', 'assets/gfx/maison4.png');
  this.game.load.image('obstacle5', 'assets/gfx/saping.png');
  this.game.load.image('obstacle6', 'assets/gfx/bonbon.png');

  this.game.load.image('flocon', 'assets/gfx/flocon.png');

  this.game.load.image('nuage0', 'assets/gfx/nuage1.png');
  this.game.load.image('nuage1', 'assets/gfx/nuage2.png');
  this.game.load.image('nuage2', 'assets/gfx/nuage3.png');

  this.game.load.spritesheet('cadeau0', 'assets/gfx/cadeau1.png', 115, 134, 2);
  this.game.load.spritesheet('cadeau1', 'assets/gfx/cadeau2.png', 115, 134, 2);
  this.game.load.spritesheet('cadeau2', 'assets/gfx/cadeau3.png', 115, 134, 2);

  this.game.load.spritesheet('spritesheet', 'assets/gfx/bigspritesheet.png', 768, 192, 4);
  this.game.load.spritesheet('playersheet', 'assets/gfx/spritesheet.png', 512, 134, 4);
  
  this.game.load.audio('music',['assets/sfx/noel.mp3','assets/sfx/noel.ogg']);
  this.game.load.audio('get_gift',['assets/sfx/get_gift.mp3', 'assets/sfx/get_gift.ogg']);

  this.game.load.start();
}

function loader_create()
{
  this.game.stage.backgroundColor='000046';
  this.game.load.onFileComplete.add(loaded_file,this);
  this.game.load.onLoadComplete.add(loading_finished,this);

  loadText=this.game.add.text(32, this.game.world.height-128,'',{fontSize:'36px',fill:'#ffffff'});

  navigator.mozL10n.ready(function() {
    loadText.text=navigator.mozL10n.get('loading-msg');
  });

  progressText=game.add.text(this.game.world.width-256, this.game.world.height-128,'',{fontSize:'36px',fill:'#ffffff'});
  preload_data();
}

function loaded_file(progress,cacheKey,success,totalLoaded,totalFiles)
{
  progressText.setText(totalLoaded + '/' + totalFiles);
}

function loading_finished()
{
  this.game.state.start('menu');
}
