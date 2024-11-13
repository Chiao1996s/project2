import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../features/contactSlice';
import { Icon } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditContactScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [updatedContact, setUpdatedContact] = useState(contact); // Initialize with contact data
  const dispatch = useDispatch();
  const groups = useSelector(state => state.contacts.groups);

  // Update `updatedContact` state when the passed `contact` prop changes
  useEffect(() => {
    setUpdatedContact(contact);
  }, [contact]);

  // Dispatch updated contact to Redux
  const handleSubmit = () => {
    dispatch(updateContact({ id: contact.id, updates: updatedContact }));
    navigation.goBack();
  };

  // Set up the header with dynamic title and Save button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${updatedContact.firstName} ${updatedContact.lastName}`,
      headerRight: () => (
        <Text
          style={{ color: 'white', fontSize: 18, marginRight: 15 }}
          onPress={handleSubmit}
        >
          Save
        </Text>
      ),
    });
  }, [navigation, updatedContact]);

  // Toggle group selection
  const toggleGroupSelection = (groupName) => {
    setUpdatedContact(prevContact => ({
      ...prevContact,
      groups: prevContact.groups.includes(groupName)
        ? prevContact.groups.filter(group => group !== groupName)
        : [...prevContact.groups, groupName]
    }));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={20}>
      <Text style={styles.iconTitle}>
        <Icon name="user" type="font-awesome" size={20} /> Basic Info
      </Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={updatedContact.firstName}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={updatedContact.lastName}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={updatedContact.company}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, company: text })}
      />

      <Text style={styles.iconTitle}>
        <Icon name="phone" type="font-awesome" size={20} /> Phone
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={updatedContact.phone}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, phone: text })}
      />

      <Text style={styles.iconTitle}>
        <Icon name="envelope" type="font-awesome" size={20} /> Email
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={updatedContact.email}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, email: text })}
      />

      <Text style={styles.iconTitle}>
        <Icon name="map-marker" type="font-awesome" size={20} /> Address
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Street 1"
        value={updatedContact.address.street1}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, address: { ...updatedContact.address, street1: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Street 2"
        value={updatedContact.address.street2}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, address: { ...updatedContact.address, street2: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={updatedContact.address.city}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, address: { ...updatedContact.address, city: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={updatedContact.address.state}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, address: { ...updatedContact.address, state: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP"
        value={updatedContact.address.zip}
        onChangeText={(text) => setUpdatedContact({ ...updatedContact, address: { ...updatedContact.address, zip: text } })}
      />

      <Text style={styles.iconTitle}>
        <Icon name="users" type="font-awesome" size={20} /> Groups
      </Text>
      <View style={styles.groupsContainer}>
        {groups.map(group => (
          <TouchableOpacity 
            key={group.id} 
            style={[
              styles.groupItem,
              updatedContact.groups.includes(group.name) && styles.groupItemSelected,
            ]}
            onPress={() => toggleGroupSelection(group.name)}
          >
            <Icon 
              name={updatedContact.groups.includes(group.name) ? "check-square" : "square-o"} 
              type="font-awesome" 
              size={20} 
              color="black" 
            />
            <Text style={styles.groupName}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  groupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f5',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  groupItemSelected: {
    backgroundColor: 'darkgrey',
    borderColor: 'black',
  },
  groupName: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
});

export default EditContactScreen;
