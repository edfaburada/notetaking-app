import { View, Text } from 'react-native';

export default function Header({title}:any){
  return(
    <View>
      <Text style={{fontSize:22,fontWeight:'bold'}}>{title}</Text>
    </View>
  );
}
