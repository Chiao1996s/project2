import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, deleteGroup, updateGroup, fetchGroups, fetchContacts } from '../features/contactSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const GroupsScreen = ({ navigation, route }) => {
  const [groupName, setGroupName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editGroupName, setEditGroupName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();
  const groups = useSelector(state => state.contacts.groups);

  // Fetch groups and contacts when the component mounts
  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchContacts());
  }, [dispatch]);

  // Check if 'addGroupModal' is set, to open the modal for a new group
  useEffect(() => {
    if (route.params?.addGroupModal) {
      setIsEditMode(false);
      setModalVisible(true);
      setGroupName('');  // Clear any previous input
      navigation.setParams({ addGroupModal: false });  // Reset the parameter
    }
  }, [route.params?.addGroupModal]);

  const handleAddGroup = () => {
    if (groupName.trim()) {
      dispatch(addGroup(groupName.trim()));
      setGroupName('');
      setModalVisible(false);
    }
  };

  const handleEditGroup = (id, name) => {
    setEditId(id);
    setEditGroupName(name);
    setIsEditMode(true);
    setModalVisible(true);
  };

  const handleUpdateGroup = () => {
    if (editGroupName.trim()) {
      dispatch(updateGroup({ id: editId, name: editGroupName.trim() }));
      setEditId(null);
      setEditGroupName('');
      setIsEditMode(false);
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditGroupName('');
    setGroupName('');
    setIsEditMode(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Modal for adding or editing a group */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              placeholder={isEditMode ? "Edit Group Name" : "New Group Name"}
              value={isEditMode ? editGroupName : groupName}
              onChangeText={isEditMode ? setEditGroupName : setGroupName}
              style={styles.modalInput}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={handleCancel} />
              <Button title="Save" onPress={isEditMode ? handleUpdateGroup : handleAddGroup} />
            </View>
          </View>
        </View>
      </Modal>

      {/* List of Groups */}
      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <Text style={styles.groupText}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditGroup(item.id, item.name)}>
                <Icon name="pencil" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(deleteGroup(item.id))} style={{ marginLeft: 15 }}>
                <Icon name="trash" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <FooterNavigation navigation={navigation} activeTab="Groups" />
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
    backgroundColor: '#f8f9fa',
  },
  groupContainer: {
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
  groupText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 15,
    padding: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  footerItem: {
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default GroupsScreen;
