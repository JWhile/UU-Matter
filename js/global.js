/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * global.js
 */

function Globals()
{
	this.rare_blocks = [
		{'id': 4, 'chance': 0.15, 'min': 0, 'max': 3},
		{'id': 3, 'chance': 0.1, 'min': 2, 'max': 6},
		{'id': 2, 'chance': 0.04, 'min': 5, 'max': 7},
		{'id': 6, 'chance': 0.04, 'min': 8, 'max': 8},
		{'id': 5, 'chance': 0.02, 'min': 7, 'max': 8}
	];
	this.max_life = 10;
	this.iridium_heal = 1;
	this.canvas_size = 560;
	this.entity_image = {
		0: new ImageLoader('assets/img/uu-matter.png'),
		1: new ImageLoader('assets/img/iridium.png')
	};
	this.explosion_duration = 370;
	this.explosion_sprite = new Sprite('assets/img/explosion.png', 32, 32, 10);
	this.blocks_size = 64;
	this.background_image = new ImageLoader('assets/img/background.png');
	this.uu_size = 32;
	this.iridium_chance = 0.05;
	this.score_storage_key = 'UUMatterBestScore';
	this.score_blink_interval = 750;
	this.play_button_text = 'Jouer';
	this.pause_button_text = 'Reprendre';
	this.stop_button_text = 'Stop';
	this.footer_text = 'By <a href="https://github.com/JWhile" target="_blank">juloo</a> - v2.0.2';
}
