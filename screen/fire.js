import firebase from 'firebase';
import "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAj9LteXiPapKYVAdK63C8-9VfNUFxJXzA",
    authDomain: "teaestate-ff144.firebaseapp.com",
    projectId: "teaestate-ff144",
    storageBucket: "teaestate-ff144.appspot.com",
    messagingSenderId: "695843781066",
    appId: "1:695843781066:web:4391669415aaa2ee41f733",
    measurementId: "G-HXM5M7H135"
  };
class Fire{
    constructor(callback){
        this.init(callback)
    }
    init(callback){
      if(!firebase.apps.length){
          firebase.initializeApp(firebaseConfig)
      }
      firebase.auth().onAuthStateChanged(user=>{
          if(user){
          callback(null,user)
          }else{
              firebase.auth().signInAnonymously().catch(error=>{
                  callback(error)
              });
          }
      })
    }
    getLists(callback){
        let ref=this.ref.orderBy("name")
       
        this.unsubscribe=ref.onSnapshot(snapshot=>{
            lists=[]
            snapshot.forEach(doc => {
                lists.push({id:doc.id,...doc.data()})
            });
            callback(lists)
        })
    }
    addList(list){
    let ref=this.ref
    ref.add(list)
    }

    updateList(list){
        let ref=this.ref

        ref.doc(list.id).update(list)
    }
    get userId(){
        return firebase.auth().currentUser.uid
    }
    get ref(){
       return firebase.firestore()
       .collection('users').doc(this.userId).
       collection('lists')
    }
  
    deleteList(list){
        let ref=this.ref
        ref.doc(list.id).delete(list)
    }
    detach(){
        this.unsubscribe();
    }
    
}
export default Fire