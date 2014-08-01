/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * game.js
 */

function UUMatterGame()
{
	this.super('div');

	this.global = new Globals();

	this.uus = [];
	this.best_score = localStorage && parseInt(localStorage.getItem(this.global.score_storage_key)) || 0;
	this.life = 0;
	this.score = -1;
	this.to_spawn = 0;
	this.playing = false;

	this.className('layout');

	this.cache = new Builder('div')
		.css('display', 'none')
		.insert(this);
	this.menu_ui = new MenuUI(this)
		.insert(this);
	this.game_ui = new GameUI(this)
		.insert(this);

	this.menu_ui.update();
}
UUMatterGame.prototype.start = function()
{
	this.menu_ui.hide();

	this.uus = [];
	this.life = this.global.max_life;
	this.to_spawn = 1;
	this.playing = true;

	if (this.score > -1)
		this.game_ui.background.generate();
	this.set_score(0);
	this.game_ui.update();

	var self = this;

	for (var i = 0; i < this.uus.length; ++i)
		this.uus[i].remove();

	var last_second = Date.now();

	var loop = function()
	{
		if(self.playing)
		{
			newFrame(loop);

			var now = Date.now();
			var diff = now - last_second;

			if (self.to_spawn >= 1 && diff > (900 / self.to_spawn))
			{
				--self.to_spawn;
				self.spawn_uu();
			}
			if (diff >= 1000)
			{
				lastSecond = now;
			}
			self.update();
		}
	};
	newFrame(loop);
	this.spawn_uu();
};
UUMatterGame.prototype.stop = function()
{
	this.playing = false;
	this.menu_ui.best_score.css('color', '#911');
	if(this.score > this.best_score)
		this.set_best_score(this.score);
	this.menu_ui.update();
	this.menu_ui.show();
};
UUMatterGame.prototype.update = function()
{
	for (var i = 0, uu; i < this.uus.length; ++i)
	{
		uu = this.uus[i];
		if (uu.removed)
		{
			this.uus.splice(i, 1);
			this.to_spawn += 1 / (this.score + 1) + (this.score / 500) + 0.97;
			--i;
		}
		else if (!uu.exploded)
		{
			uu.update();
			if (uu.collide(this.global.canvas_size))
			{
				uu.explode();
				this.damage(2);
			}
		}
	}
};
UUMatterGame.prototype.set_score = function(score)
{
	this.score = score;
	this.game_ui.update_score();
};
UUMatterGame.prototype.set_best_score = function(score)
{
	this.best_score = score;
	if (localStorage)
		localStorage.setItem(this.global.score_storage_key, this.best_score);
};
UUMatterGame.prototype.damage = function(damage)
{
	if (damage >= this.life)
	{
		this.life = 0;
		this.stop();
	}
	else
		this.life -= damage;
	this.game_ui.update();
};
UUMatterGame.prototype.spawn_uu = function()
{
	var uu = (Math.random() <= this.global.iridium_chance)? new IridiumEntity(this) : new UUEntity(this);
	var pos = (this.global.canvas_size - 32) / 2;

	uu.setPos(pos, pos);
	this.uus.push(uu.insert(this.game_ui));
	this.game_ui.run_fabricator();
};
fus.extend(UUMatterGame, Builder);
