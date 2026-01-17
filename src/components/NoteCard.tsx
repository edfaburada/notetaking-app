import { View, Text, TouchableOpacity } from 'react-native';

export default function NoteCard({note,onPress,onDelete}:any){
  return(
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{note.title}</Text>
        <Text>{note.description}</Text>
        <TouchableOpacity onPress={onDelete}>
          <Text style={{color:'red'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
