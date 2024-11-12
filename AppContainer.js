import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { Icon } from '@rneui/themed';

import HomeScreen from './screens/HomeScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';
import store from './app/store';

const Stack = createNativeStackNavigator();

function AppContainer() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ title: 'Contacts' }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
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
            options={{ title: 'Contact Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;
