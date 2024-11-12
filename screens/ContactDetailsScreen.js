import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from "../features/todoSlice";

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

  const handleSave = () => {
    const newItem = {
      key: item.key !== -1 ? item.key : Date.now(),
      firstName,
      lastName,
      company,
      phone,
      email,
      address: { street1, street2, city, state, zip },
    };
  
    if (item.key === -1) {
      dispatch(addItem(newItem));
    } else {
      dispatch(updateItem(newItem));
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Input placeholder='First Name' value={firstName} onChangeText={setFirstName} />
      <Input placeholder='Last Name' value={lastName} onChangeText={setLastName} />
      <Input placeholder='Company' value={company} onChangeText={setCompany} />
      <Input placeholder='Phone' value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Input placeholder='Email' value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input placeholder='Street 1' value={street1} onChangeText={setStreet1} />
      <Input placeholder='Street 2' value={street2} onChangeText={setStreet2} />
      <Input placeholder='City' value={city} onChangeText={setCity} />
      <Input placeholder='State' value={state} onChangeText={setState} />
      <Input placeholder='Zip Code' value={zip} onChangeText={setZip} keyboardType="numeric" />
      <Button title='Save' onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ContactDetailsScreen;
