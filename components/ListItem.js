
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import {deleteItem} from "./features/todoSlice";

function ListItem({ item, navigation }) {
  return (
    <View style={styles.listItemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ContactDetails", { item })}
      >
        <Text>{item.fullName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '1%',
  },
  li1: {
    flex: 0.8, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '3%'
  },
  li2: {
    flex: 0.2,
    backgroundColor: 'white'
  },
  listItemText: {
    fontSize: 24
  },
});

export default ListItem;