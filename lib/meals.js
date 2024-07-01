const sql = require('better-sqlite3');
const db = sql('meals.db');

import fs, { createWriteStream } from 'node:fs';

import slugify from 'slugify';
import xss from 'xss';

export async function getMeals() {

    // async will return promise to wait for
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new error('failed to fetch meals');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    // we donot use asunc cause we do not want to wait
    return db.prepare('SELECT * FROM meals WHERE slug = ? ').get(slug)
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    // store image to public folder
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}


