import React, { useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';

function ContactInfo({ route, navigation }) {
  const { item } = route.params;
  const contact = useSelector((state) => state.todos.value.find((contact) => contact.key === item.key));

  // Update the screen title and add an Edit button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${contact.firstName} ${contact.lastName}`,
      headerRight: () => (
        <Icon
          name="edit"
          type="font-awesome"
          color="darkblue"
          onPress={() => navigation.navigate('ContactDetails', { item: contact })}
          style={{ marginRight: 15 }}
        />
      ),
    });
  }, [navigation, contact]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{`${contact.firstName} ${contact.lastName}`}</Text>
      <Text style={styles.company}>{contact.company}</Text>
      
      <View style={styles.infoSection}>
        <Icon name="phone" type="font-awesome" color="#333" size={24} />
        <Text style={styles.value}>{contact.phone}</Text>
      </View>

      <View style={styles.infoSection}>
        <Icon name="envelope" type="font-awesome" color="#333" size={24} />
        <Text style={styles.value}>{contact.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <Icon name="map-marker" type="font-awesome" color="#333" size={24} />
        <Text style={styles.value}>
          {`${contact.address?.street1}, ${contact.address?.city}, ${contact.address?.state}`}
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Icon name="users" type="font-awesome" color="#333" size={24} />
        <Text style={styles.value}>{contact.groups}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  company: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    width: 80,
  },
  value: {
    marginLeft: 8,
  },
});

export default ContactInfo;
