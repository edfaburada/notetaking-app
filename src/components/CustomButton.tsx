import { TouchableOpacity, Text } from 'react-native';

export default function CustomButton({title,onPress}:any){
  return(
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
