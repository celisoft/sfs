var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,'gameDiv');
game.state.add('load',{create:loader_create});
game.state.add('menu',{create:menu_create});
game.state.add('play',{preload: play_preload, create:play_create, update:play_update});
game.state.start('load');
