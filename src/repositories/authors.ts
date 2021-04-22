import { Author } from "../models/author";
import { getRepository } from "typeorm";

export async function getAuthors() {
  const authorRepository = getRepository(Author);
  let result = await authorRepository.find();
  if (result.length === 0) {
    const newAuthor = new Author();
    newAuthor.birthdate = '10-03-1940';
    newAuthor.name = 'Chuck Norris';
    await authorRepository.save(newAuthor);
    result = await authorRepository.find();
  }

  return result;
}
