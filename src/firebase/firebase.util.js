import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBVH_046kHOy8rNmI8qRfrU-78IYlNlIaE",
    authDomain: "todo-app-2a543.firebaseapp.com",
    databaseURL: "https://todo-app-2a543.firebaseio.com",
    projectId: "todo-app-2a543",
    storageBucket: "todo-app-2a543.appspot.com",
    messagingSenderId: "268888812562",
    appId: "1:268888812562:web:c25a01f2881f9faff43ccb",
    measurementId: "G-WE7DD53M01"
  };

  firebase.initializeApp(config);

  export const firestore = firebase.firestore();
  export const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exist) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return userRef;
  };

  export default firebase;