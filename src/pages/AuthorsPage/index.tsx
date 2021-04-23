import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Author } from "../../models/author";
import { getRepository } from "typeorm/browser";
import { getAuthors } from "../../repositories/authors";


const AuthorTile = ({name, birthdate}: {name: string; birthdate: string;}) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{birthdate}</Text>
    </View>
  );
};

function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    async function init() {
      const result = await getAuthors();
      setAuthors(result);
    }

    init();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>My List of Authors</Text>
      {authors.map((author) => (
        <AuthorTile key={author.id.toString()} name={author.name} birthdate={author.birthdate} />
      ))}
    </View>  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 16, color: 'black' },
});

export default AuthorsPage;
