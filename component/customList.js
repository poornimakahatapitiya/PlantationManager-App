import React from 'react'
import {ListItem,Avatar} from 'react-native-elements'
import {StyleSheet,Text,View} from 'react-native'

const CutomListItem=({item})=>{
return(
    <ListItem key={item.id} bottomDivider>
        <Avatar
            rounded
            source={{uri:"http://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}
        />
       <ListItem.Content>
           <ListItem.Title style={{fontWeight:'800'}}>{item.chatName}</ListItem.Title>
           <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
               This is a test chat for estate manager
           </ListItem.Subtitle>
       </ListItem.Content>
    </ListItem>
)
}
export default CutomListItem

const styles=StyleSheet.create({

})