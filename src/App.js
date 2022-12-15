import React from "react";
import { StyleSheet, Text, View, Animated, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserList from "./views/UserList";
import UserForm from "./views/UserForm";
import { Button } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { UsersProvider } from "./context/UsersContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => {
              return {
                title: "Lista de usuarios",
                headerLeft: () => (
                  <Button
                    onPress={() =>
                      Alert.alert(
                        "Sobre",
                        "Desenvolvido por: \n\nFelipe Urbanek",
                        [
                          {
                            text: "Fechar",
                          },
                        ]
                      )
                    }
                    type="clear"
                    icon={<Icon name="info" size={25} color="white" />}
                  />
                ),

                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate("UserForm")}
                    type="clear"
                    icon={<Icon name="add" size={25} color="white" />}
                  />
                ),
              };
            }}
          />
          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{
              title: "Formulario de Usuarios",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: "#f4511e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default App;
