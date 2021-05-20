import React from 'react'
import {StyleSheet,Text,View,TouchableOpacity, Modal} from 'react-native'
import TodoModal from './TodoModal'
import Fire from '../components/fire'
export default class TodoList extends React.Component{
   state={
       showListVisible:false
   }
   toggleListModal(){
       this.setState({showListVisible:!this.state.showListVisible})
   }

 render(){
        const list=this.props.list
        const compledtedCount=list.todos.filter(todo=>todo.completed).length
        const remainingCount=list.todos.length-compledtedCount;
        
    return(
    <View>
     <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}
  >
          <TodoModal list={list} closeModal={()=>this.toggleListModal()}
                 updateList={this.props.updateList}
          />
        </Modal>
       
            <TouchableOpacity style={[styles.deleteButton,{backgroundColor:"#A01A1A"}]} onPress={()=>this.deleteList(this.props.deleteList)}>
                <Text style={{fontSize:20,fontWeight:'800',color:'#D1D1D1'}}>DELETE LIST</Text>
            </TouchableOpacity>
            
        <TouchableOpacity style={[styles.listContainer,
        {backgroundColor:list.color}]}onPress={()=>this.toggleListModal()}>
       
        <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
        </Text>
       <View>
           <View style={{alignItems:'center'}}>
               <Text style={styles.count}>{compledtedCount}</Text>
               <Text style={styles.subTitle}>Completed</Text>
           </View>
           <View style={{alignItems:'center'}}>
               <Text style={styles.count}>{remainingCount}</Text>
               <Text style={styles.subTitle}>Remaining</Text>
           </View>
          
       </View>
     </TouchableOpacity>
     
     </View>  
    )
}
}
const styles=StyleSheet.create({
    listContainer:{
        paddingVertical:10,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal:16,
        alignItems:'center',
        width:200
    },
    deleteButton:{
        paddingVertical:2,
        paddingHorizontal:16,
        borderRadius:3,
        marginHorizontal:16,
        alignItems:'center',
        width:200
    },
    listTitle:{
        fontSize:24,
        fontWeight:'700',
        color:'#FFFFFF',
        marginBottom:18
    },
    count:{
        fontSize:48,
        fontWeight:'200',
        color:'#FFFFFF',
    },
    subTitle:{
        fontSize:12,
        fontWeight:'200',
        color:'#FFFFFF',
    }
})