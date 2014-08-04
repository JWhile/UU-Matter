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
	this.blink_timeout = 0;
	this.best_score = new Builder('p')
		.className('uu-best');
	this.play_button = new Builder('a')
		.className('button')
		.event('click', function()
		{
			game.g.click_sound.play();
			game.play();
		});
	this.stop_button = new Builder('a')
		.className('button')
		.text(this.game.g.stop_button_text)
		.event('click', function()
		{
			game.g.click_sound.play();
			game.stop();
		});

	this.className('uu-menu')
		.append(new Builder('h1')
			.text('UU-Matter'))
		.append(this.best_score)
		.append(this.play_button)
		.append(this.stop_button)
		.append(new Builder('p')
			.className('uu-footer')
			.html(game.g.footer_text));
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
	if (this.game.party != null && this.game.party.score >= this.game.best_score)
		this.best_score.text('New best score: '+ this.game.party.score);
	else if (this.game.party != null && this.game.party.score > -1)
		this.best_score.text('Score: '+ this.game.party.score +' (Best: '+ this.game.best_score +')');
	else
		this.best_score.text('Best score: '+ this.game.best_score);
	if (this.game.party != null && this.game.party.paused)
	{
		this.play_button.text(this.game.g.pause_button_text);
		this.stop_button.css('display', 'block');

		var self = this;
		var state = true;

		clearTimeout(this.blink_timeout);
		this.blink_timeout = setInterval(function()
		{
			if (state)
				self.best_score.css('opacity', '0');
			else
				self.best_score.css('opacity', '1');
			state = !state;
		}, this.game.g.score_blink_interval);
	}
	else
	{
		this.play_button.text(this.game.g.play_button_text);
		this.stop_button.css('display', 'none');
		this.best_score.css('opacity', '1');
		clearTimeout(this.blink_timeout);
	}
};
fus.extend(MenuUI, Builder);

function GameUI(game)
{
	this.super('div');

	this.game = game;
	this.fabricator_timeout = 0;
	this.fibre_cable = new Builder('div')
		.className('fibre-cable')
		.insert(this);
	this.game_canvas = new GameCanvas(game)
		.insert(this);
	this.uu_fabricator = new Builder('div')
		.className('uu-fabricator')
		.insert(this);
	this.score_span = new Builder('span')
		.className('uu-counter')
		.insert(this);

	this.className('uu-game');
}
GameUI.prototype.run_fabricator = function()
{
	var self = this;

	this.uu_fabricator.className('uu-fabricator on');
	this.fibre_cable.className('fibre-cable on');
	clearTimeout(this.fabricator_timeout);
	this.fabricator_timeout = setTimeout(function()
	{
		self.uu_fabricator.className('uu-fabricator');
		self.fibre_cable.className('fibre-cable');
	}, 350);
};
GameUI.prototype.render = function()
{
	this.game_canvas.render();
};
GameUI.prototype.update = function()
{
	if (!this.game.party.playing || this.game.party.paused)
		this.score_span.css('display', 'none');
	else
		this.score_span.css('display', 'block');
	this.score_span.text('x '+ this.game.party.score);
};
fus.extend(GameUI, Builder);
