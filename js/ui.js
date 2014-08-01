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
	this.best_score = new Builder('p')
		.className('uu-best');

	this.className('uu-menu')
		.append(new Builder('h1')
			.text('UU-Matter'))
		.append(this.best_score)
		.append(new Builder('a')
			.className('button')
			.text('Jouer')
			.event('click', function()
			{
				game.start();
			}))
		.append(new Builder('p')
			.className('uu-footer')
			.html(game.global.footer_text));
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
	if (this.game.score >= this.game.best_score)
		this.best_score.text('New best score: '+ this.game.best_score);
	else if (this.game.score > -1)
		this.best_score.text('Score: '+ this.game.score +' (Best: '+ this.game.best_score +')');
	else
		this.best_score.text('Best score: '+ this.game.best_score);
};
fus.extend(MenuUI, Builder);

function GameUI(game)
{
	this.super('div');

	this.game = game;
	this.fabricator_timeout = 0;
	this.background = new Background(game)
		.insert(this);
	this.uu_fabricator = new Builder('div')
		.className('uu-fabricator')
		.insert(this);
	this.score_span = new Builder('span')
		.className('uu-counter')
		.insert(this);
	this.game_canvas = new Canvas(game)
		.insert(this);

	this.className('uu-matter');
	this.background.generate();
}
GameUI.prototype.run_fabricator = function()
{
	var self = this;

	this.uu_fabricator.className('uu-fabricator on');
	clearTimeout(this.fabricator_timeout);
	this.fabricator_timeout = setTimeout(function()
	{
		self.uu_fabricator.className('uu-fabricator');
	}, 350);
};
GameUI.prototype.update = function()
{
	this.score_span.text('x '+ this.game.score)
	var size = this.game.life * 3 +'px';
	this.background.render();
};
fus.extend(GameUI, Builder);
