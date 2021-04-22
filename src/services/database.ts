import { createConnection, Connection } from 'typeorm/browser';

import { Author } from "../models/author";
import { Category } from "../models/category";
import { Post } from "../models/post";

export default class Database {
  static instance: Connection;

  public static async Setup() {
    try {
      if(!this.instance) {
        this.instance = await createConnection({
          type: 'react-native',
          database: 'test',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [Author, Category, Post],
        });

      }

      return this.instance;

    } catch(err) {
      console.log('OCORREU UM ERRO: ', err);
    }

  }


}
