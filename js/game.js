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
	this.bestScore = localStorage && parseInt(localStorage.getItem('UUMatterBestScore')) || 0;
	this.life = 0;
	this.score = -1;
	this.toSpawn = 0;
	this.playing = false;
	this.fps = new FPS();

	this.menuUI = new MenuUI(this)
		.insert(this);
	this.gameUI = new GameUI(this)
		.insert(this);

	this.setScore(0);
}
UUMatterGame.prototype.start = function()
{
	this.menuUI.hide();

	this.uus = [];
	this.setScore(0);
	this.life = 20;
	this.damage(0);
	this.toSpawn = 1;
	this.playing = true;

	var self = this;

	for(var i = 0; i < this.uus.length; ++i)
		this.uus[i].remove();

	var lastSecond = Date.now();

	var loop = function()
	{
		if(self.playing)
		{
			newFrame(loop);
			self.fps.next();

			var now = Date.now();
			var diff = now - lastSecond;

			if(self.toSpawn >= 1 && diff > (900 / self.toSpawn))
			{
				--self.toSpawn;
				self.spawnUU();
			}
			if(diff >= 1000)
			{
				lastSecond = now;
				self.gameUI.fpsSpan.text(self.fps.getFps() +' fps');
			}
			self.update();
		}
	};
	newFrame(loop);
	this.spawnUU();
	this.gameUI.fpsSpan.css('display', 'block');
};
UUMatterGame.prototype.stop = function()
{
	this.playing = false;
	this.menuUI.bestScore.css('color', '#911');
	if(this.score > this.bestScore)
		this.setBestScore(this.score);
	this.menuUI.update();
	this.menuUI.show();
	this.gameUI.fpsSpan.css('display', 'none');
};
UUMatterGame.prototype.update = function()
{
	for(var i = 0, uu; i < this.uus.length; ++i)
	{
		uu = this.uus[i];
		if(uu.removed)
		{
			this.uus.splice(i, 1);
			this.toSpawn += 1 / (this.score + 1) + (this.score / 500) + 0.97;
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
UUMatterGame.prototype.setScore = function(score)
{
	this.score = score;
	this.gameUI.scoreSpan.css('display', (this.score === 0)? 'none' : 'block').text('x '+ this.score);
};
UUMatterGame.prototype.setBestScore = function(score)
{
	this.bestScore = score;
	if(localStorage)
		localStorage.setItem('UUMatterBestScore', this.bestScore);
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

	var size = this.life * 3 +'px';

	this.css('boxShadow', '0 0 '+ Math.max(this.life * 6, 4) +'px #322,'+ size +' 0 0 #911,0 '+ size +' 0 #911,-'+ size +' 0 0 #911,0 -'+ size +' 0 #911,inset 0 0 '+ Math.max((20 - this.life) * 8, 0) +'px #700')
};
UUMatterGame.prototype.spawnUU = function()
{
	var uu = (Math.random() <= 0.05)? new IridiumEntity(this) : new UUEntity(this);
	var pos = (564 - 32) / 2;

	uu.setPos(pos, pos);
	this.uus.push(uu.insert(this));

	var self = this;

	this.gameUI.uuFabricator.className('uu-fabricator on');
	setTimeout(function()
	{
		self.gameUI.uuFabricator.className('uu-fabricator');
	}, 350);
};
fus.extend(UUMatterGame, Builder);
