import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

function GroupListItem({ item, navigation, onEdit, onDelete }) {
  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={styles.listItemTextContainer}
        onPress={() => navigation.navigate("GroupDetails", { item })}
      >
        <Text style={styles.listItemText}>{item.name}</Text>
      </TouchableOpacity>
      <Icon
        name="pencil"
        type="font-awesome"
        onPress={onEdit}
        style={{ marginRight: 10 }}
      />
      <Icon
        name="trash"
        type="font-awesome"
        color="black"
        onPress={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemTextContainer: {
    flex: 1,
  },
  listItemText: {
    fontSize: 18,
  },
});

export default GroupListItem;
