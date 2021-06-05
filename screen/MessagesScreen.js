import React,{ useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList,TextInput, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import firebase from 'firebase';
import { color } from 'react-native-reanimated';
import { error } from 'react-native-gifted-chat/lib/utils';
require('firebase/firestore')
require('firebase/firebase-storage')
import CutomListItem from '../components/customList'
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'The factory needs machinery',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Tea feilds need fertliser.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Test message for estate manager app',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Test message for estate manager app',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Test message for estate manager app',
  },
];

const MessagesScreen = ({navigation}) => {
  const [input,setInput]= useState("")
  const[chats,setChats]=useState([])
  

  const fetchChats = async () => {
    try {
      const list = [];

      await firebase.firestore()
        .collection('chats')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              chatName
            } = doc.data();
            list.push({
              id: doc.id,
              chatName,
            
            });
          });
        });

      setChats(list);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const createChat=async()=>{
  await firebase.firestore().collection('chats').add({
    chatName:input,
  }).then(()=>{
  setInput("")
  alert("a new chat has been created successfully")
  }).catch((error)=>alert(error))
  }
    return (
      
      <Container>
      <SafeAreaView>
      <ScrollView>
      <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
        
       
        
        <View style={{flex:1,paddingTop:50}}>
        <TextInput style={{flex: 1,marginBottom:20}} placeholder="Enter chat name" 
        value={input}
          onChangeText={(text)=>setInput(text)}
          onSubmitEditing={createChat}
          leftIcon={
            <Icon name="wechat" type='antdesign' size={24} color="black"/>
          }
        />
        <Button onPress={createChat} title="Create new chat"/>
        </View>
        </ScrollView>
        </SafeAreaView>
        
      </Container>
    
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});