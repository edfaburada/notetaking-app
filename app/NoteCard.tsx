import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';

interface NoteCardProps {
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
  pinned?: boolean;   // ✅ added
  onPin?: () => void; // ✅ added
}


export default function NoteCard({ title, content, onEdit, onDelete, pinned, onPin }: NoteCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onEdit}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
  },
  deleteBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: 'red',
  },
});
