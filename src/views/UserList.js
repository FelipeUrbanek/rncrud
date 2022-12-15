import React, { useContext } from "react";
import { Alert, FlatList, View, StyleSheet } from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import { ListItem } from "@rneui/themed";
import UsersContext from "../context/UsersContext";

const UserList = (props) => {
  /* console.warn(Object.keys(props)); */

  const { state, dispatch } = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert("Excluir Usuario", "Deseja excluir usuario?", [
      {
        text: "Sim",
        onPress() {
          dispatch({
            type: "deleteUser",
            payload: user,
          });
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function getActionsRight(user) {
    return (
      <View style={style.viewRight}>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="white" />}
          title={"Editar"}
          titleStyle={{ color: "white" }}
          buttonStyle={style.buttonStyleBlue}
        />
      </View>
    );
  }

  function getActionsLeft(user) {
    return (
      <View style={style.viewRight}>
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="white" />}
          title={"Deletar"}
          titleStyle={{ color: "white" }}
          buttonStyle={style.buttonStyleRed}
        />
      </View>
    );
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem.Swipeable
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate("UserForm", user)}
        rightContent={getActionsRight(user)}
        leftContent={getActionsLeft(user)}
      >
        <Avatar
          source={{ uri: user.avatarUrl }}
          avatarStyle={{ borderRadius: 50, width: "100%", height: "100%" }}
        />
        <ListItem.Content style={{ marginLeft: 2 }}>
          <ListItem.Title style={style.textName}>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.job}</ListItem.Subtitle>
          <ListItem.Subtitle style={style.textName}>
            {user.email}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};

const style = StyleSheet.create({
  viewRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    borderColor: "red",
    alignItems: "center",
  },
  textName: {
    fontWeight: "bold",
  },
  buttonStyleRed: {
    minHeight: "100%",
    minWidth: "100%",
    backgroundColor: "red",
    color: "white",
    tileColor: "white",
  },
  buttonStyleBlue: {
    minHeight: "100%",
    minWidth: "100%",
    backgroundColor: "#1c86d8",
    color: "white",
    tileColor: "white",
  },
});

export default UserList;
