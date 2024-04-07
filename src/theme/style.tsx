import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor:'black'
  },
  inputs: {
    width: "90%",
  },
  buttons: {
    width: "90%",
    backgroundColor: 'orange',
    fontWeight: 'bold'
  },
  textNavigation:{
    marginTop:20,
    fontSize:15,
    color: "orange",
    fontWeight:'bold',
  },
  contentHome:{
    flex: 1,
    marginVertical:50,
    marginHorizontal:20,
    backgroundColor:'black'
  },
  headerHome:{
    flexDirection:'row',
    gap: 15,
    alignItems:'center'
  },
    iconProfile:{
    flex:1,
    alignItems:'flex-end'
    },
    modal:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#fff',
        marginHorizontal:20,
        borderRadius:10
    },
    headerModal:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    contentLetter:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:30,
        alignItems:'center'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:'purple'
    },
    subjectLetter:{
      flexDirection:'row',
      alignItems:'center',
      gap:10
    },
    contentDetailLetter:{
      flex:1,
      paddingHorizontal:20,
      backgroundColor:'black',
      gap:20
    },
    textMessage:{
      marginBottom:10,
      fontWeight:'bold',
      fontSize:18
    }

});