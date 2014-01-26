/**
 * UU-Matter <https://github.com/JWhile/UU-Matter>
 *
 * Copyright (c) 2014 juloo
 *
 * uu-matter.js
 */

// class UUMatter extends Builder
function UUMatter()
{
    this.super('div');

    this.uus = []; // :Array<UU>

    this.life = 20; // :int

    this.className('uu-matter')
        .append(new Builder('div')
            .className('uu-fabricator'));

    this.damage(0);
}
// function damage(int damage):void
UUMatter.prototype.damage = function(damage)
{
    if(damage > this.life)
    {
        this.life = 0;
    }
    else
    {
        this.life -= damage;
    }

    this.css('outline-width', this.life * 2 +'px');
};
// function spawnUU():void
UUMatter.prototype.spawnUU = function()
{
    var pos = (564 - 32) / 2;

    this.uus.push(new UU()
            .css('top', pos +'px')
            .css('left', pos +'px')
            .insert(this));
};
fus.extend(UUMatter, Builder);

// class UU extends Builder
function UU()
{
    this.super('span');

    this.className('uu');
}
fus.extend(UU, Builder);
