import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

import HomeScreen from './screens/HomeScreen';
import GroupsScreen from './screens/GroupsScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';
import ContactInfo from './screens/ContactInfo';

import store from './app/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ContactsStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'All Contacts',
          headerRight: () => (
            <Icon
              name="plus"
              type="font-awesome"
              color="darkblue"
              onPress={() =>
                navigation.navigate('ContactDetails', { item: { key: -1 } })
              }
              style={{ marginRight: 15 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{ title: 'Edit Contact' }}
      />
      <Stack.Screen
        name="ContactInfo"
        component={ContactInfo}
        options={{ title: 'Contact Info' }}
      />
    </Stack.Navigator>
  );
}

function GroupsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupsHome" // Use a unique name for the Groups screen in the Stack.Navigator
        component={GroupsScreen}
        options={({ navigation }) => ({
          title: 'Groups',
          headerRight: () => (
            <Icon
              name="plus"
              type="font-awesome"
              color="darkblue"
              onPress={() => navigation.setParams({ openModal: true })}
              style={{ marginRight: 15 }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function AppContainer() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Contacts">
          <Tab.Screen
            name="Contacts"
            component={ContactsStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="address-book" type="font-awesome" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Groups" // Use this name for the Groups tab in the Tab.Navigator
            component={GroupsStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="users" type="font-awesome" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;
