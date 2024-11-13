import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactInfoScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const groups = useSelector(state => state.contacts.groups.filter(group => contact.groups.includes(group.name)));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${contact.firstName} ${contact.lastName}`,
      headerRight: () => (
        <Text
          style={{ color: 'white', fontSize: 18, paddingRight: 15 }}
          onPress={() => navigation.navigate('EditContact', { contact })}
        >
          Edit
        </Text>
      ),
    });
  }, [navigation, contact]);

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{contact.firstName} {contact.lastName}</Text>
        {contact.company && <Text style={styles.detailCompany}>{contact.company}</Text>}
      </View>

      <View style={styles.detailRow}>
        <Icon name="call" size={20} color="#333" />
        <Text style={styles.detailText}>Phone: {contact.phone}</Text>
      </View>

      <View style={styles.detailRow}>
        <Icon name="mail" size={20} color="#333" />
        <Text style={styles.detailText}>Email: {contact.email}</Text>
      </View>

      <View style={styles.detailRow}>
        <Icon name="location" size={20} color="#333" />
        <Text style={styles.detailText}>
          Address: {contact.address.street1}, {contact.address.street2}, {contact.address.city}, {contact.address.state}, {contact.address.zip}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Icon name="people" size={20} color="#333" />
        <Text style={styles.detailText}>Groups: {groups.map(group => group.name).join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  detailCompany: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default ContactInfoScreen;
