import sql from 'better-sqlite3'
import { resolve } from 'styled-jsx/css';

//established a connection with database by executing SQL as function.

const db = sql('meals.db');  //passing the name of  database here as a string to the function


export async function getMeals(){
     await new Promise((resolve) => setTimeout(resolve, 5000));
     return db.prepare('SELECT * FROM meals').all();   // we can work on this db object to perform actions on this dabase                                               // all is used here to run this statement/method                                                      //all is used if you are fetching data you want to get back all the rows that are                                                       // fetched by that statements                                                     // 
}                                              

