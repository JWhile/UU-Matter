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
		{'id': 4, 'chance': 0.15, 'min': 0, 'max': 13},
		{'id': 3, 'chance': 0.1, 'min': 7, 'max': 14},
		{'id': 2, 'chance': 0.05, 'min': 10, 'max': 15},
		{'id': 5, 'chance': 0.01, 'min': 15, 'max': 17},
		{'id': 6, 'chance': 0.02, 'min': 13, 'max': 16},
	];
	this.blocks_size = 32;
	this.canvas_size = 560;
	this.blocks_sprite_src = 'assets/img/background.png';
	this.iridium_background_style = 'url("assets/img/iridium.png")';
	this.iridium_chance = 0.05;
	this.score_storage_key = 'UUMatterBestScore';
	this.footer_text = 'Créé par <a href="https://github.com/JWhile" target="_blank">juloo</a> - pre2.0.0';
}
