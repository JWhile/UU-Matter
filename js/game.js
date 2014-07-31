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

	this.uus = [];
	this.best_score = localStorage && parseInt(localStorage.getItem('UUMatterBestScore')) || 0;
	this.life = 0;
	this.score = -1;
	this.to_spawn = 0;
	this.playing = false;

	this.className('layout');

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
	this.life = 20;
	this.to_spawn = 1;
	this.playing = true;

	if (score > -1)
		this.game_ui.background.generate();
	this.set_score(0);
	this.game_ui.update();

	var self = this;

	for(var i = 0; i < this.uus.length; ++i)
		this.uus[i].remove();

	var loop = function()
	{
		if(self.playing)
		{
			newFrame(loop);

			var now = Date.now();
			var diff = now - lastSecond;

			if(self.to_spawn >= 1 && diff > (900 / self.to_spawn))
			{
				--self.to_spawn;
				self.spawn_uu();
			}
			if(diff >= 1000)
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
	for(var i = 0, uu; i < this.uus.length; ++i)
	{
		uu = this.uus[i];
		if(uu.removed)
		{
			this.uus.splice(i, 1);
			this.to_spawn += 1 / (this.score + 1) + (this.score / 500) + 0.97;
			--i;
		}
		else
		{
			uu.update();
			if(!uu.exploded && uu.collide(564))
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
	this.game_ui.update();
};
UUMatterGame.prototype.set_best_score = function(score)
{
	this.best_score = score;
	if(localStorage)
		localStorage.setItem('UUMatterBestScore', this.best_score);
};
UUMatterGame.prototype.damage = function(damage)
{
	if(damage >= this.life)
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
	var uu = (Math.random() <= 0.05)? new IridiumEntity(this) : new UUEntity(this);
	var pos = (564 - 32) / 2;

	uu.setPos(pos, pos);
	this.uus.push(uu.insert(this.game_ui));
	this.game_ui.run_fabricator();
};
fus.extend(UUMatterGame, Builder);
