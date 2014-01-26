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
// function start():void
UUMatter.prototype.start = function()
{
    var self = this;

    var loop = function()
    {
        if(self.gaming)
        {
            newFrame(loop);
        }

        self.update();
    };

    newFrame(loop);
};
// function update():void
UUMatter.prototype.update = function()
{
    for(var i = 0, uu; i < this.uus.length; ++i)
    {
        uu = this.uus[i];

        uu.update();

        if(uu.collide(564))
        {
            uu.explode();

            this.damage(2);
        }
    }
};
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
    var uu = new UU();

    var pos = (564 - 32) / 2;
    uu.setPos(pos, pos);

    this.uus.push(uu.insert(this));
};
fus.extend(UUMatter, Builder);

// class UU extends Builder
function UU()
{
    this.super('span');

    this.x = 0; // :int
    this.y = 0; // :int

    this.className('uu');
}
// function update():void
UU.prototype.update = function()
{
};
// function explode():void
UU.prototype.explode = function()
{
    this.remove();
    var self = this;

    setTimeout()
};
// function collide(int size):boolean
UU.prototype.collide = function(size)
{
    size -= 32;

    return (this.x < 0 || this.x > size || this.y < 0 || this.y > size);
};
// function setPos(int x, int y):void
UU.prototype.setPos = function(x, y)
{
    this.x = x;
    this.y = y;

    this.css('top', this.x +'px')
        .css('left', this.y +'px');
};
fus.extend(UU, Builder);
