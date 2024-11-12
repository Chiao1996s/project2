import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { deleteItem } from "../features/todoSlice";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const listItems = useSelector((state) => state.todos.value);

  return (
    <View style={styles.container}>
      <FlatList
        data={listItems}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              style={styles.listItemTextContainer}
              onPress={() =>
                navigation.navigate('ContactInfo', { item })
              }
            >
              <Text style={styles.listItemText}>{`${item.firstName} ${item.lastName}`}</Text>
            </TouchableOpacity>
            <Icon
              name="pencil"
              type="font-awesome"
              onPress={() =>
                navigation.navigate('ContactDetails', { item })
              }
              style={{ marginRight: 10 }}
            />
            <Icon
              name="trash"
              type="font-awesome"
              color="black"
              onPress={() => dispatch(deleteItem(item))}
            />
          </View>
        )}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  listItemTextContainer: {
    flex: 1,
  },
  listItemText: {
    fontSize: 18,
  },
});

export default HomeScreen;
