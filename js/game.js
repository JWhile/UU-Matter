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

	this.g = new Globals();
	this.best_score = localStorage && parseInt(localStorage.getItem(this.g.score_storage_key)) || 0;
	this.party = null;

	this.className('uu-matter');

	this.layout = new Builder('div')
		.className('layout');
	this.cache = new Builder('div')
		.css('display', 'none')
		.insert(this.layout);
	this.background = new Background(this)
		.insert(this);
	this.menu_ui = new MenuUI(this)
		.insert(this.layout);
	this.game_ui = new GameUI(this)
		.insert(this.layout);

	var self = this;

	this.menu_ui.update();
	this.layout.insert(this);
	this.background.set_size(window.innerWidth, window.innerHeight);
	this.background.generate();
	window.addEventListener('resize', function()
	{
		self.background.set_size(window.innerWidth, window.innerHeight);
		self.background.generate();
	}, false);
}
UUMatterGame.prototype.play = function()
{
	if (this.party != null && this.party.paused)
		this.party.start();
	else
	{
		if (this.party != null)
			this.background.generate();
		this.party = new Party(this);
		this.party.start();
	}
};
UUMatterGame.prototype.stop = function()
{
	if (this.party != null)
		this.party.stop();
};
UUMatterGame.prototype.set_best_score = function(score)
{
	this.best_score = score;
	if (localStorage)
		localStorage.setItem(this.g.score_storage_key, this.best_score);
};
fus.extend(UUMatterGame, Builder);
