import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const Firebase = {
  uploadPost: post => {
    const data = {
      postPhoto:post.photo,
      postTitle:post.title
  };
    console.log(post)
    console.log(post.photo)
    console.log(post.title)
    return  firestore().collection('posts').doc().set(post) 
    return storage().putfile(postPhoto)
    
       

    
      },

      getPosts: () => {
        return firestore()
          .collection('posts')
          .get()
          .then(function(querySnapshot) {
            let posts = querySnapshot.docs.map(doc => doc.data())
            // console.log(posts)
            return posts
          })
          .catch(function(error) {
            console.log('Error getting documents: ', error)
          })
      }
    }
    

export default Firebase