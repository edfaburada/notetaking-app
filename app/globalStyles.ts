import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Main container for pages
  containerHome: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdf5e6', // soft background for notes app
    justifyContent: 'center',
  },

  // Titles / headings
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  // Buttons
  button: {
    backgroundColor: '#FF69B4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },

  // Button text
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Text input for forms (login, register, notes)
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },

  // Modal container
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  // Modal content
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },

  // Note card (for NoteCard component)
  noteCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    width: '48%',
    minHeight: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
});
