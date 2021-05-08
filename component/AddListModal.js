import React from 'react'
import {View,Text,StyleSheet,TextInput,KeyboardAvoidingView,TouchableOpacity} from 'react-native'
import tempdata from './tempdata';
import {AntDesign} from '@expo/vector-icons'
export default class AddListModal extends React.Component{
    backgroundColors=["#8C1313","#385745","#0C9FC3","#0C1CC3","#0FAD4F"]
   state={
       name:"",
       color:this.backgroundColors[0]
   };
   createTodo=()=>{
   const{name,color}=this.state
   const list={name,color}
   this.props.addList(list)
   this.setState({name:""})
   this.props.closeModal();
   }

   renderColors=()=>{
    return this.backgroundColors.map(color=>{
        return(
            <TouchableOpacity 
            key={color}
            style={[styles.colorSelect,{backgroundColor:color}]}
            onPress={()=>this.setState({color})}
        />
        )
    })

    }
    render(){
    return(
         <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={{position:'absolute',top:64,right:32}}>
          <AntDesign name="close" size={24} color="#000080"
               onPress={()=>{this.props.closeModal()}}
          />
        </TouchableOpacity>
        <View style={{alignSelf:"stretch",marginHorizontal:32}}>
          <Text style={styles.modalTitle}>Create Todo List</Text>
          <TextInput style={styles.input} placeholder="List name" onChangeText={text=>
          this.setState({name:text})}/>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:12,}}>
            {this.renderColors()}
        </View>
        <TouchableOpacity style={[styles.create,{backgroundColor:this.state.color}]} 
        onPress={this.createTodo}>
            <Text style={{color:"#FFFFFF",fontWeight:"600"}}>
             Create
            </Text>
        </TouchableOpacity>
        
       </KeyboardAvoidingView>
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