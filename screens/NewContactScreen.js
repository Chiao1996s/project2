import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../features/contactSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const NewContactScreen = ({ navigation }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    },
    groups: []
  });

  const dispatch = useDispatch();
  const groups = useSelector(state => state.contacts.groups);

  // Save contact information and navigate back
  const handleSubmit = () => {
    dispatch(addContact(contact));
    navigation.goBack();
  };

  // Set up the Save button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSubmit}  // Trigger save function
          title="Save"
          color="white"
        />
      ),
    });
  }, [navigation, handleSubmit]);

  const toggleGroupSelection = (groupName) => {
    setContact(prevContact => ({
      ...prevContact,
      groups: prevContact.groups.includes(groupName)
        ? prevContact.groups.filter(group => group !== groupName)
        : [...prevContact.groups, groupName]
    }));
  };

  return (
    <View style={styles.outerContainer}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.iconTitle}><Icon name="person" size={20} /> Basic Info</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={contact.firstName}
          onChangeText={(text) => setContact({ ...contact, firstName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={contact.lastName}
          onChangeText={(text) => setContact({ ...contact, lastName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Company"
          value={contact.company}
          onChangeText={(text) => setContact({ ...contact, company: text })}
        />

        <Text style={styles.iconTitle}><Icon name="call" size={20} /> Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={contact.phone}
          onChangeText={(text) => setContact({ ...contact, phone: text })}
        />

        <Text style={styles.iconTitle}><Icon name="mail" size={20} /> Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={contact.email}
          onChangeText={(text) => setContact({ ...contact, email: text })}
        />

        <Text style={styles.iconTitle}><Icon name="location" size={20} /> Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street 1"
          value={contact.address.street1}
          onChangeText={(text) => setContact({ ...contact, address: { ...contact.address, street1: text } })}
        />
        <TextInput
          style={styles.input}
          placeholder="Street 2"
          value={contact.address.street2}
          onChangeText={(text) => setContact({ ...contact, address: { ...contact.address, street2: text } })}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={contact.address.city}
          onChangeText={(text) => setContact({ ...contact, address: { ...contact.address, city: text } })}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={contact.address.state}
          onChangeText={(text) => setContact({ ...contact, address: { ...contact.address, state: text } })}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP"
          value={contact.address.zip}
          onChangeText={(text) => setContact({ ...contact, address: { ...contact.address, zip: text } })}
        />

        <Text style={styles.iconTitle}><Icon name="people" size={20} /> Groups</Text>
        <View style={styles.groupsContainer}>
          {groups.map(group => (
            <TouchableOpacity 
              key={group.id} 
              style={[
                styles.groupItem, 
                contact.groups.includes(group.name) && styles.groupItemSelected
              ]}
              onPress={() => toggleGroupSelection(group.name)}
            >
              <Text style={styles.groupName}>{group.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  iconTitle: {
    fontSize: 16,
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
    backgroundColor: '#f0f0f5',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  groupItemSelected: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  groupName: {
    fontSize: 16,
    color: 'white',
  },
});

export default NewContactScreen;
