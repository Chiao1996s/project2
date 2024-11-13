import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Secrets';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const contactsCollectionRef = collection(db, 'contacts');
const groupsCollectionRef = collection(db, 'groups');

// Fetch and manipulate data
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const snapshot = await getDocs(contactsCollectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const docRef = await addDoc(contactsCollectionRef, contact);
  return { id: docRef.id, ...contact };
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await deleteDoc(doc(db, 'contacts', id));
  return id;
});

export const updateContact = createAsyncThunk('contacts/updateContact', async ({ id, updates }) => {
  await updateDoc(doc(db, 'contacts', id), updates);
  return { id, updates };
});

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  const snapshot = await getDocs(groupsCollectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addGroup = createAsyncThunk('groups/addGroup', async (name) => {
  const docRef = await addDoc(groupsCollectionRef, { name });
  return { id: docRef.id, name };
});

export const updateGroup = createAsyncThunk('groups/updateGroup', async ({ id, name }) => {
  await updateDoc(doc(db, 'groups', id), { name });
  
  // Fetch contacts and update relevant group names in each contact's data
  const contactsSnapshot = await getDocs(contactsCollectionRef);
  const contactsToUpdate = contactsSnapshot.docs
    .filter(contactDoc => contactDoc.data().groups?.includes(id))
    .map(contactDoc => ({ id: contactDoc.id, ...contactDoc.data() }));

  // Update each contact in Firestore to reflect the new group name
  for (const contact of contactsToUpdate) {
    const updatedGroups = contact.groups.map(groupId => (groupId === id ? name : groupId));
    await updateDoc(doc(db, 'contacts', contact.id), { groups: updatedGroups });
  }
  
  return { id, name };
});

export const deleteGroup = createAsyncThunk('groups/deleteGroup', async (id) => {
  await deleteDoc(doc(db, 'groups', id));
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    groups: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Contacts
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        state.contacts[index] = { ...state.contacts[index], ...action.payload.updates };
      })

      // Groups
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        
        // Update the group name in the groups array
        const groupIndex = state.groups.findIndex(group => group.id === id);
        if (groupIndex !== -1) {
          state.groups[groupIndex] = { ...state.groups[groupIndex], name };
        }
        
        // Update the group name in each contact that has this group
        state.contacts = state.contacts.map(contact => {
          if (contact.groups && contact.groups.includes(id)) {
            const updatedGroups = contact.groups.map(groupId => 
              groupId === id ? name : groupId
            );
            return { ...contact, groups: updatedGroups };
          }
          return contact;
        });
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        const groupId = action.payload;
        
        // Remove the group from the groups array
        state.groups = state.groups.filter(group => group.id !== groupId);
        
        // Remove the group from each contact's groups array
        state.contacts = state.contacts.map(contact => {
          const updatedGroups = contact.groups.filter(group => group !== groupId);
          return { ...contact, groups: updatedGroups };
        });
      });
  }
});

export default contactsSlice.reducer;
