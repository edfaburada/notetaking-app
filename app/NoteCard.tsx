import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface NoteCardProps {
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
  pinned?: boolean;
  onPin?: () => void;
}

export default function NoteCard({
  title,
  content,
  onEdit,
  onDelete,
  pinned,
  onPin,
}: NoteCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onEdit}>

      {/* PIN BUTTON */}
      {onPin && (
        <TouchableOpacity
          onPress={onPin}
          style={styles.pinBtn}
        >
          <Ionicons
            name={pinned ? 'pin' : 'pin-outline'}
            size={18}
            color="#FF69B4"
          />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
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

  pinBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
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
