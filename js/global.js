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
		{'id': 2, 'chance': 0.05, 'min': 5, 'max': 7},
		{'id': 5, 'chance': 0.05, 'min': 7, 'max': 8},
		{'id': 6, 'chance': 0.05, 'min': 8, 'max': 8},
	];
	this.max_life = 20
	this.blocks_size = 64;
	this.canvas_size = 560;
	this.blocks_sprite_src = 'assets/img/background.png';
	this.uu_image_src = 'assets/img/uu-matter.png';
	this.iridium_image_src = 'assets/img/iridium.png';
	this.uu_size = 32;
	this.iridium_background_style = 'url("assets/img/iridium.png")';
	this.iridium_chance = 0.05;
	this.score_storage_key = 'UUMatterBestScore';
	this.footer_text = 'Créé par <a href="https://github.com/JWhile" target="_blank">juloo</a> - pre2.0.0';
}
