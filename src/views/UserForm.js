import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import UsersContext from "../context/UsersContext";
import ax from "axios";
const UserForm = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const { dispatch } = useContext(UsersContext);

  return (
    <View style={style.form}>
      <Text> Nome :</Text>
      <TextInput
        style={style.input}
        onChangeText={(name) => setUser({ ...user, name })}
        placeholder="Informe o seu nome"
        padding={5}
        value={user.name}
      />
      <Text> E-mail :</Text>
      <TextInput
        style={style.input}
        onChangeText={(email) => setUser({ ...user, email })}
        placeholder="Informe o seu e-mail"
        padding={5}
        value={user.email}
      />
      <Text> Adicione a Url de seu Avatar</Text>
      <TextInput
        style={style.input}
        onChangeText={(avatarUrl) => setUser({ ...user, avatarUrl })}
        placeholder="Informe a url do seu Avatar"
        padding={5}
        value={user.avatarUrl}
      />

      <Button
        title={"Salvar"}
        onPress={() => {
          dispatch({
            type: user.id ? "updateUser" : "createUser",
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: "#c2c2c2",
    borderWidth: 1,
    marginBottom: 16,
  },
});

export default UserForm;
