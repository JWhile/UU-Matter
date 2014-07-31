/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * ui.js
 */

function MenuUI(game)
{
	this.super('div');

	this.game = game;
	this.bestScore = new Builder('p')
		.className('uu-best');

	this.className('uu-menu')
		.append(new Builder('h1')
			.text('UU-Matter'))
		.append(this.bestScore)
		.append(new Builder('a')
			.className('button')
			.text('Jouer')
			.event('click', function()
			{
				game.start();
			}))
		.append(new Builder('p')
			.className('uu-footer')
			.html('Créé par <a href="https://github.com/JWhile" target="_blank">juloo</a> - pre2.0.0'));
}
MenuUI.prototype.show = function()
{
	this.css('display', 'block');
};
MenuUI.prototype.hide = function()
{
	this.css('display', 'none');
};
MenuUI.prototype.update = function()
{
	if (this.game.score >= this.game.bestScore)
		this.bestScore.text('New best score: '+ this.game.bestScore);
	else if (this.game.score > -1)
		this.bestScore.text('Score: '+ this.game.score +' (Best: '+ this.game.bestScore +')');
	else
		this.bestScore.text('Best score: '+ this.game.bestScore);
};
fus.extend(MenuUI, Builder);

function GameUI(game)
{
	this.super('div');

	this.game = game;
	this.scoreSpan = new Builder('span')
		.className('uu-counter')
		.insert(this);
	this.uuFabricator = new Builder('div')
		.className('uu-fabricator')
		.insert(this);
	this.background = new Background()
		.insert(this);

	this.className('uu-matter');
	this.background.generate();
}
GameUI.prototype.runFrabricator = function()
{
	var self = this;

	this.uuFabricator.className('uu-fabricator on');
	setTimeout(function()
	{
		self.uuFabricator.className('uu-fabricator');
	}, 350);
};
GameUI.prototype.update = function()
{
	var size = this.game.life * 3 +'px';

	this.css('boxShadow', '0 0 '+ Math.max(this.game.life * 6, 4) +'px #322,'
			+ size +' 0 0 #911,'
			+'0 '+ size +' 0 #911,'
			+'-'+ size +' 0 0 #911,'
			+'0 -'+ size +' 0 #911,'
			+'inset 0 0 '+ Math.max((20 - this.game.life) * 8, 0) +'px #700');
};
fus.extend(GameUI, Canvas);
