import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../features/contactSlice';
import { Icon } from '@rneui/themed'; // Import Icon from @rneui/themed

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const groups = useSelector(state => state.contacts.groups);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('All Contacts');
  const [showGroupsDropdown, setShowGroupsDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    filterContacts();
  }, [contacts, selectedGroup]);

  const filterContacts = () => {
    if (selectedGroup === 'All Contacts') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => contact.groups.includes(selectedGroup));
      setFilteredContacts(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowGroupsDropdown(true)} style={styles.allContactsWrapper}>
          <Icon name="people" size={20} color="black" />
          <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{selectedGroup}</Text>
          <Icon name="filter-list" size={20} color="black" />
        </TouchableOpacity>
        <Icon
          name="add"
          size={25}
          color="black"
          onPress={() => navigation.navigate('AddContact')}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showGroupsDropdown}
        onRequestClose={() => setShowGroupsDropdown(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[
                styles.groupOption,
                selectedGroup === 'All Contacts' && styles.groupOptionSelected
              ]}
              onPress={() => {
                setSelectedGroup('All Contacts');
                setShowGroupsDropdown(false);
              }}
            >
              <Text style={styles.groupOptionText}>All Contacts</Text>
            </TouchableOpacity>
            {groups.map(group => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.groupOption,
                  selectedGroup === group.name && styles.groupOptionSelected
                ]}
                onPress={() => {
                  setSelectedGroup(group.name);
                  setShowGroupsDropdown(false);
                }}
              >
                <Text style={styles.groupOptionText}>{group.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ContactInfoScreen', { contact: item })}>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>{item.firstName} {item.lastName}</Text>
              <View style={styles.actions}>
                <Icon
                  name="pencil"
                  type="font-awesome"
                  size={24}
                  color="black"
                  onPress={() => navigation.navigate('EditContact', { contact: item })}
                />
                <Icon
                  name="trash"
                  type="font-awesome"
                  size={24}
                  color="black"
                  onPress={() => dispatch(deleteContact(item.id))}
                  style={{ marginLeft: 15 }} // Add spacing between icons
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <FooterNavigation navigation={navigation} activeTab="Contacts" />
    </View>
  );
};

const FooterNavigation = ({ navigation, activeTab }) => (
  <View style={styles.footer}>
    <TouchableOpacity
      style={styles.footerItem}
      onPress={() => navigation.navigate('Contacts')}
    >
      <Icon name="list" type="ionicon" size={30} color={activeTab === 'Contacts' ? 'black' : 'lightgrey'} />
      <Text style={{ color: activeTab === 'Contacts' ? 'black' : 'lightgrey' }}>Contacts</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.footerItem}
      onPress={() => navigation.navigate('Groups')}
    >
      <Icon name="people" type="ionicon" size={30} color={activeTab === 'Groups' ? 'black' : 'lightgrey'} />
      <Text style={{ color: activeTab === 'Groups' ? 'black' : 'lightgrey' }}>Groups</Text>
    </TouchableOpacity>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light grey background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  allContactsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333', // Darker text color for readability
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0', // Subtle border color for footer
    backgroundColor: '#ffffff',
  },
  footerItem: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay for modal background
  },
  modalView: {
    width: 320,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  groupOption: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'grey', 
  },
  groupOptionSelected: {
    backgroundColor: 'black', 
  },
  groupOptionText: {
    fontSize: 16,
    color: 'white', 
  }
});


export default HomeScreen;
