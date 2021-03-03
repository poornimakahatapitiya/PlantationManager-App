import React, {createContext, useState} from 'react';
import firebase from 'firebase'
require('firebase/firestore')

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            alert(e)
          }
        },
     
        register: async (email, password) => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              //Once the user creation has happened successfully, we can add the currentUser into firestore
              //with the appropriate details.
              firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
              .set({
                  fname: '',
                  lname: '',
                  email: email,
                  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                  userImg: null
              })
              //ensure we catch any errors at this stage to advise us if something does go wrong
              .catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
                  alert(error)
              })
            })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
                alert(error)
            });
          } catch (e) {
            console.log(e);
            alert(e)
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
            alert(e)
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};