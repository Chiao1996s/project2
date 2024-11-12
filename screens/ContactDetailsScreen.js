import { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from "../features/todoSlice";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function ContactDetailsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { item } = route.params;

  const [firstName, setFirstName] = useState(item?.firstName || '');
  const [lastName, setLastName] = useState(item?.lastName || '');
  const [company, setCompany] = useState(item?.company || '');
  const [phone, setPhone] = useState(item?.phone || '');
  const [email, setEmail] = useState(item?.email || '');
  const [street1, setStreet1] = useState(item?.address?.street1 || '');
  const [street2, setStreet2] = useState(item?.address?.street2 || '');
  const [city, setCity] = useState(item?.address?.city || '');
  const [state, setState] = useState(item?.address?.state || '');
  const [zip, setZip] = useState(item?.address?.zip || '');
  const [country, setCountry] = useState(item?.address?.country || '');

  const handleSave = () => {
    const newItem = {
      key: item.key !== -1 ? item.key : Date.now(),
      firstName,
      lastName,
      company,
      phone,
      email,
      address: { street1, street2, city, state, zip, country },
    };

    if (item.key === -1) {
      dispatch(addItem(newItem));
    } else {
      dispatch(updateItem(newItem));
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={handleSave} style={styles.headerSaveButton}>Save</Text>
      ),
      title: "Edit Contact",
    });
  }, [navigation, handleSave]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Basic Info</Text>
        <Icon name="user" type="font-awesome" color="black" />
      </View>

      <Input placeholder="First Name" value={firstName} onChangeText={setFirstName} label="First Name:" />
      <Input placeholder="Last Name" value={lastName} onChangeText={setLastName} label="Last Name:" />
      <Input placeholder="Company" value={company} onChangeText={setCompany} label="Company:" />

      <View style={styles.sectionHeader}>
        <Icon name="phone" type="font-awesome" color="black" style={styles.icon} />
        <Text style={styles.sectionText}>Phone</Text>
      </View>
      <Input placeholder="888-555-1212" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <View style={styles.sectionHeader}>
        <Icon name="envelope" type="font-awesome" color="black" style={styles.icon} />
        <Text style={styles.sectionText}>Email</Text>
      </View>
      <Input placeholder="person@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <View style={styles.sectionHeader}>
        <Icon name="address-card" type="font-awesome" color="black" style={styles.icon} />
        <Text style={styles.sectionText}>Address</Text>
      </View>
      <Input placeholder="Address line 1" value={street1} onChangeText={setStreet1} />
      <Input placeholder="Address line 2" value={street2} onChangeText={setStreet2} />
      <Input placeholder="City" value={city} onChangeText={setCity} />
      <Input placeholder="State" value={state} onChangeText={setState} />
      <Input placeholder="Postal Code" value={zip} onChangeText={setZip} keyboardType="numeric" />
      <Input placeholder="Country" value={country} onChangeText={setCountry} />

      <View style={styles.sectionHeader}>
        <Icon name="users" type="font-awesome" color="black" style={styles.icon} />
        <Text style={styles.sectionText}>Groups</Text>
      </View>
      <Input placeholder="Group names" />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  headerSaveButton: {
    color: 'darkblue',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default ContactDetailsScreen;
