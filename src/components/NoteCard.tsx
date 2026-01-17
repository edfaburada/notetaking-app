import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  title: string;
  content: string;
  onDelete?: () => void;
};

export default function NoteCard({ title, content, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      {onDelete && (
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    marginTop: 5,
    color: '#555',
  },
  delete: {
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
