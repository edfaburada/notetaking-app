import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    padding:20
  },
  input:{
    borderWidth:1,
    borderRadius:10,
    padding:12,
    marginBottom:10
  },
  button:{
    backgroundColor:'#FF69B4',
    padding:12,
    borderRadius:10,
    alignItems:'center',
    marginTop:10
  },
  buttonText:{
    color:'#fff',
    fontWeight:'bold'
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center'
  }
});
