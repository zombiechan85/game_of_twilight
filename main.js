enchant();

var SCREEN_WIDTH = 320;
var SCREEN_HEIGHT = 240;

var STAGE_OFFSET = 45;
var CHARACTER_OFFSET_Y = 20;
var CHARACTER_STEP_Y = 45;

var TEXT_AREA_HEIGHT = 60;

var PLAYER_AVATAR_CODE = "1:3:0:2009:2109:27540"
var PLAYER_WIDTH = 64;
var PLAYER_HEIGHT = 64;

var BG01_IMAGE = 'avatarBg1.png';
var BG03_IMAGE = 'avatarBg2.png';
var BG02_IMAGE = 'avatarBg3.png';
var TEXT_AREA_IMAGE = 'images/text_area.png';
var ASSETS = [BG01_IMAGE, BG02_IMAGE, BG03_IMAGE, TEXT_AREA_IMAGE];

var game = null;
var player = null;
var scroll_flag = null;

var serif = [
"ぎょう虫が脳まで達しました。",
"あはんうふん！",
"ぬっころしてやんよ！"
];

var FONT_SET = "12px 'Consolas', 'Monaco', 'MS ゴシック', 'Roman'";

var Player = Class.create(Avatar,{
	initialize: function(){
		Avatar.call(this,PLAYER_AVATAR_CODE);
		this.moveTo(0, 10);
		this.action = "run";
	},
	onenterframe: function(){
		var game = Game.instance;
			if(game.input.right){
				this.action = "run";
				this.x += 5;
				scroll_flag += 2;
				this.right();
			}
			else if(game.input.left){
				this.action = "run";
				this.x -= 5;
				scroll_flag -= 2;
				this.left();
			}
			else if(game.input.up){
				var say = caption(0);
				this.action = "attack";
				game.rootScene.addChild(say);
			}
			else{
				this.action = "stop";
			}
	},
});

var caption = function(text_no){
	var say = new Label(serif[text_no]);
	say.font = FONT_SET;
	say.moveTo(10, (10 + SCREEN_HEIGHT - TEXT_AREA_HEIGHT));
	say.color = 'white';
	
	say.onenterframe = function(){
		//opacity = 透過度
		this.opacity -= 0.01;
		if (this.opacity <= 0){
			this.parentNode.removeChild(this);
		}
	};
	return say;
};




window.onload = function(){
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	game.preload(ASSETS);
	
	game.onload = function(){
		var scene = game.rootScene;
		scene.backgroundColor = "#cff";
		
		var stage = new Group();
		stage.y = STAGE_OFFSET;
		scene.addChild(stage);
		
		var bg = new AvatarBG(1);
		stage.addChild(bg);
		
		player = new Player();
		stage.addChild(player);

		var t_area = new Sprite(320,60);
		t_area.image = game.assets[TEXT_AREA_IMAGE];
		t_area.moveTo(0, (SCREEN_HEIGHT - TEXT_AREA_HEIGHT));
		scene.addChild(t_area);
		
		var hoge = caption(1);
		scene.addChild(hoge);
		
		scene.onenterframe = function(){
			bg.scroll(scroll_flag);
		};
	};
	game.start();
};










