import React, { useCallback, useEffect, ReactNode, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createConnection, getRepository, Connection } from 'typeorm/browser';

import { Author } from './src/models/author';
import { Category } from './src/models/category';
import { Post } from './src/models/post';

const AuthorTile = ({name, birthdate}: {name: string; birthdate: string;}) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{birthdate}</Text>
    </View>
  );
};

const App: () => ReactNode = () => {
  const [defaultConnection, setConnection] = useState<Connection | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);

  const setupConnection = useCallback(async () => {
    try {
      const connection = await createConnection({
        type: 'react-native',
        database: 'test',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [Author, Category, Post],
      });
      setConnection(connection);
      getAuthors();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAuthors = useCallback(async () => {
    const authorRepository = getRepository(Author);
    let result = await authorRepository.find();
    if (result.length === 0) {
      const newAuthor = new Author();
      newAuthor.birthdate = '10-03-1940';
      newAuthor.name = 'Chuck Norris';
      await authorRepository.save(newAuthor);
      result = await authorRepository.find();
      console.log('Created!')
    }
    console.log('Authors List ===> ', result);
    setAuthors(result);
  }, []);

  useEffect(() => {
    if (!defaultConnection) {
      setupConnection();
    } else {
      getAuthors();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My List of Authors</Text>
      {authors.map((author) => (
        <AuthorTile key={author.id.toString()} name={author.name} birthdate={author.birthdate} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 16, color: 'black' },
});

export default App;
