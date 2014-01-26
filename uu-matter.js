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

    this.className('uu-matter')
        .append(new Builder('div')
            .className('uu-fabricator'));
}
fus.extend(UUMatter, Builder);
