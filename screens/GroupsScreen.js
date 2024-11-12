import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, TextInput, StyleSheet } from 'react-native';
import { Icon, Button, Text } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, updateGroup, deleteGroup } from '../features/groupSlice';
import GroupListItem from '../components/GroupListItem';

function GroupsScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups?.value || []);

  console.log('Groups from Redux:', groups); // Add this to verify groups list

  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [editGroup, setEditGroup] = useState(null);

  useEffect(() => {
    if (route.params?.openModal) {
      setModalVisible(true);
      navigation.setParams({ openModal: false });
    }
  }, [route.params?.openModal]);

  const openModal = (group = null) => {
    setEditGroup(group);
    setNewGroupName(group ? group.name : '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNewGroupName('');
    setEditGroup(null);
  };

  const handleSaveGroup = () => {
    if (editGroup) {
      dispatch(updateGroup({ ...editGroup, name: newGroupName }));
    } else {
      dispatch(addGroup({ id: Date.now().toString(), name: newGroupName }));
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <GroupListItem
            item={item}
            navigation={navigation}
            onEdit={() => openModal(item)}
            onDelete={() => dispatch(deleteGroup(item))}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="New group name"
              value={newGroupName}
              onChangeText={setNewGroupName}
            />
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={closeModal} />
              <Button title="Save" onPress={handleSaveGroup} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 40,
    borderRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GroupsScreen;
