import fs from "node:fs"
import sql from 'better-sqlite3'
import { resolve } from 'styled-jsx/css';
import slugify from 'slugify';
import xss from 'xss';
import { error } from "node:console";
//established a connection with database by executing SQL as function.

const db = sql('meals.db');  //passing the name of  database here as a string to the function


export async function getMeals(){
     await new Promise((resolve) => setTimeout(resolve, 5000));
     // throw new Error('Loading meals failed')
     return db.prepare('SELECT * FROM meals').all();   // we can work on this db object to perform actions on this dabase                                               // all is used here to run this statement/method                                                      //all is used if you are fetching data you want to get back all the rows that are                                                       // fetched by that statements                                                     // 
}       

export function getMeal(slug){
     return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal){
     console.log("image", meal.image)
     // console.log("name", meal.image.fileName);   
     meal.slug = slugify(meal.title, {lower: true});
     meal.instructions = xss(meal.instructions);
     // const extension = meal.image;
     const extension = meal.image.name.split('.').pop();
     const fileName = `${meal.slug}.${extension}`;
     const stream = fs.createWriteStream(`public/images/${fileName}`);
     const bufferedImage = await meal.image.arrayBuffer();
     stream.write(Buffer.from(bufferedImage), () => {
          if(error){
               throw new Error('Saving Image Failed!');
          }
     })
     meal.image = `/images/${fileName}`;
     db.prepare(`
          INSERT INTO meals
               (title, summary,  instructions, creator, creator_email, image, slug)
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

