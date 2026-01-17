import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface NoteCardProps {
  title: string;
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function NoteCard({ title, content, onEdit, onDelete }: NoteCardProps) {
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
