import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  /* ================= MAIN CONTAINERS ================= */

  containerHome: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdf5e6',
    justifyContent: 'center',
  },

  containerProfile: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdf5e6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= TITLES ================= */

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  /* ================= BUTTONS ================= */

  button: {
    backgroundColor: '#FF69B4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /* ================= INPUTS ================= */

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    width: '100%',
  },

  /* ================= MODAL ================= */

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },

  /* ================= NOTE CARD ================= */

noteCard: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 10,
  marginBottom: 12,
  width: '50%',        // 👈 keeps two cards per row
  minHeight: 100,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
  marginHorizontal: 2, // 👈 instead of marginLeft
},


  noteTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#000',
  },

  noteContent: {
    fontSize: 14,
    color: '#333',
  },

  deleteBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },

  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },

  /* ================= PROFILE ================= */

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },

  bio: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
});
