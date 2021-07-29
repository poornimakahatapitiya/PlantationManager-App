import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')


import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';
import uuid from "uuid"
import { AuthContext } from '../navigation/AuthProvider';

const AddPostScreen = () => {
  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
    setImage(pickerResult.uri)
    }
  };

  


  const submitPost = async (localUri) => {
    const remoteUri= await uplaodPhotoAsync(localUri)

    firebase.firestore()
    .collection('posts')
    .add({
      userId: firebase.auth().currentUser.uid,
      post: post,
      postImg:remoteUri,
      postTime: firebase.firestore.FieldValue.serverTimestamp(),
      likes: null,
      comments: null,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  const uploadImage = async (uri) => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    const path=`photos/${firebase.auth().currentUser||{}.uid}/${Date.now()}.jpg`

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = firebase.storage().ref().child(filename)
    const task = storageRef.put(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };
  
  
    
  
  const uplaodPhotoAsync= async (uri)=>{
    if( image == null ) {
      return null;
    }
    const path=`photos/${firebase.auth().currentUser||{}.uid}/${Date.now()}.jpg`
    return new Promise(async(res,rej)=>{
        const response=await fetch(uri)
        const file=await response.blob()
        setUploading(true);
        setTransferred(0);

        let upload=firebase.storage().ref(path).put(file)
        
        upload.on('state_changed', snapshot=>{},err=>{
            rej(err)
        },
        async()=>{
            const url=await upload.snapshot.ref.getDownloadURL();
            res(url)
        }
        )
      setUploading(false);
      setImage(null);

    })
}
  
const pickImage=async()=>{
  let result= await ImagePicker.launchImageLibraryAsync({
     mediaTypes:ImagePicker.MediaTypeOptions.Images,
     allowsEditing:true,
     aspect:[4,3]

   
    })
   if(!result.cancelled){
     setImage(result.uri)
    }
  }
  const handlePost=()=>{
    submitPost(image).then(ref=>{
        setImage(null)
        
    }).catch(error=>{
        alert(error)
    })
}
  return (
    <View style={styles.container}>
        <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}


        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        
        {uploading ? (
          <StatusWrapper>
          <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={handlePost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={pickImage}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});