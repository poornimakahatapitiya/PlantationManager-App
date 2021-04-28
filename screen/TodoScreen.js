import React,{useState} from 'react'
import {StyleSheet,Text,TouchableOpacity,View,FlatList,
    Modal,KeyboardAvoidingView,TextInput,
    ActivityIndicator,Animated} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import AddListModal from '../components/AddListModal'
import ToDoList from '../components/ToDoList'
import { AuthContext } from '../navigation/AuthProvider';

import Fire from '../components/fire'
import{swipeable} from 'react-native-gesture-handler'

export default class TodoScreen extends React.Component{

state={
    addTodoVisible:false,
    lists:[],
    loading:true,
    user:{}
   
}
  
componentDidMount(){
    firebase=new Fire((error,user)=>{
        if(error){
            return alert("Something went wrong")
        }
        firebase.getLists(lists=>{
            this.setState({lists,user},()=>{
                this.setState({loading:false})
            })
        })
        this.setState({user})
    })
    

}
componentWillUnmount(){
    firebase.detach()
}
toggleAddTodoModal(){
    this.setState({addTodoVisible:!this.state.addTodoVisible})
}

renderList=list=>{
    return<ToDoList list={list} updateList={this.updateList}/>
}
renderDelete=list=>{
    return <TodoList list={list} deleteList={this.deleteList}/>
}
addList=list=>{
    firebase.addList({
        name:list.name,
        color:list.color,
        todos:[]
    })
};
updateList=list=>{
    firebase.updateList(list)
}
deleteList= list=>{
    firebase.deleteList(list)
}
render(){
    if(this.state.loading){
       return(
           <View style={styles.container}>
            <ActivityIndicator size='large'color="#1F4FA0"/>
           </View>
       ) 
    }
  
    return(

        <View style={styles.container}>
         <Modal animationType='slide' 
         visible={this.state.addTodoVisible}
         onRequestClose={()=>this.toggleAddTodoModal()}>
         <AddListModal closeModal={()=>this.toggleAddTodoModal() }addList={this.addList}/>
         </Modal>
        <View style={{flexDirection:'row'}}>
         <View style={styles.divider}/>
          <Text style={styles.title}>
            Todo <Text style={{fontWeight:'300',color:"#000080"}}>Lists</Text>
          </Text>
          <View style={styles.divider}/>
         </View>
         <View style={{marginVertical:48}}>
         <TouchableOpacity style={styles.addList} onPress={()=>this.toggleAddTodoModal()}>
           <AntDesign name='plus' size={16} color="#000080"/>
         </TouchableOpacity>
         <Text style={styles.add}>Add List</Text>
         </View>
         <View style={{height:275,paddingLeft:32}}>
             <FlatList data={this.state.lists} 
                 keyExtractor={item=>item.id.toString()} horizontal={true}
                 showsHorizontalScrollIndicator={false}
                 renderItem={({item})=>
                 this.renderList(item)
                 }
                 keyboardShouldPersistTaps='always'
             />
              
         </View>
        </View>
    )
}
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"
    },
    divider:{
        backgroundColor:"#33E0FF",
        height:1,
        flex:1,
        alignSelf:"center"
    },
    title:{
        fontSize:38,
        fontWeight:"800",
        color:"#000000",
        paddingHorizontal:64,
    },
    addList:{
        borderWidth:2,
        borderColor:"#33E0FF",
        borderRadius:4,
        padding:16,
        alignItems:"center",
        justifyContent:"center"

    },
    add:{
        color:"#000080",
        fontWeight:"600",
        fontSize:14,
        marginTop:8
    },
    modalToggle:{
        marginBottom:10,
        borderWidth:1,
        borderColor:"#00A86B",
        padding:10,
        borderRadius:10,
        alignSelf:"center"
      },
      modalClose:{
        marginTop:20,
        marginBottom:0,
        alignSelf:"flex-end"
      },
      modalTitle:{
        fontSize:28,
        fontWeight:"800",
        color:"#000000",
        marginBottom:16,
        alignSelf:"center",
      },
      input:{
          borderWidth:StyleSheet.hairlineWidth,
          borderColor:"#194C97",
          borderRadius:6,
          height:50,
          marginTop:8,
          paddingHorizontal:16,
          fontSize:18
      },
      create:{
          marginTop:24,
          height:50,
          borderRadius:6,
          alignItems:"center",
          justifyContent:"center"
      },
      colorSelect:{
          width:30,
          height:30,
          borderRadius:4
      }
})