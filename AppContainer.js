import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContactInfoScreen from './screens/ContactInfoScreen';
import EditContactScreen from './screens/EditContactScreen';
import GroupsScreen from './screens/GroupScreen';
import HomeScreen from './screens/HomeScreen';
import NewContactScreen from './screens/NewContactScreen';

import { firebaseConfig } from './Secrets';
import { initializeApp } from 'firebase/app';

import Icon from 'react-native-vector-icons/Ionicons';

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contacts">
        <Stack.Screen
          name="Contacts"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white', fontSize: 20 }}>All Contacts</Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AddContact"
          component={NewContactScreen}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerTitle: 'New Contact',
            headerBackTitleStyle: { color: 'white' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="EditContact"
          component={EditContactScreen}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerTitle: 'Edit Contact',
            headerBackTitleStyle: { color: 'white' },
            headerTintColor: 'white',

          }}
        />
        <Stack.Screen
          name="Groups"
          component={GroupsScreen}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerTitle: 'Groups',
            headerTintColor: 'white',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Groups', { addGroupModal: true })}>
                <Icon name="add" size={25} color="white" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen
          name="ContactInfoScreen"
          component={ContactInfoScreen}
          options={{
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerBackTitleStyle: { color: 'white' },
            headerTintColor: 'white',

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
