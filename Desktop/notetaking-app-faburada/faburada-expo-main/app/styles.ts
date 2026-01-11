// app/styles.ts
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Containers for each page
  containerHome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffefd5', // Home: light peach
  },
  containerProfile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e6f7ff', // Profile: light blue
  },
  containerContact: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0e6ff', // Contact: lavender
  },
  containerSettings: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff4e6', // Settings: soft cream
  },
  containerAbout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff4e6', // About page: soft cream
  },

  // Titles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },

  // Avatar
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF69B4', // pink border to match buttons
  },

  // Name
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
    color: '#222',
  },

  // Bio
  bio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Solid pink button
  button: {
    backgroundColor: '#FF69B4', // pink background
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',       // center text horizontally
    justifyContent: 'center',   // center text vertically
    width: '80%',               // make buttons full-width on mobile screens
  },

  buttonText: {
    color: '#ffffff',           // white text for contrast
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Default link text
  link: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },

  // Input fields
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  // Subtitle
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
});
