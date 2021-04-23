import React, { useCallback, useEffect, ReactNode, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createConnection, getRepository, Connection } from 'typeorm/browser';

import { Author } from './src/models/author';
import { Category } from './src/models/category';
import { Post } from './src/models/post';
import Database from "./src/services/database";
import AuthorsPage from "./src/pages/AuthorsPage";



const App: () => ReactNode = () => {
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    async function init() {
      await Database.Setup();
      setLoading(false);
    }
    init();
  }, [])


  return (loading ?
   <View><Text>Loading...</Text></View>
      : <AuthorsPage />
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
