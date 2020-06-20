import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
// import firebase from '../android/app/google-services';
import firebase from '@react-native-firebase/app';
import TabNavigator from './Navigator';
import auth from '@react-native-firebase/auth'
import Firebase, { FirebaseProvider } from './utils';
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut = () => {
     auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: auth().currentUser.displayName,
      uid: auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}  
        </Text>
        <FirebaseProvider value={Firebase}>
        <TabNavigator />
      </FirebaseProvider>
        <Button
          color="#3740FE"
          title="Logout"
          style={{
            right: 5,
            top: 5,
             
          }}
          onPress={() => this.signOut()}
        />
      </View>
    );
  }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
     
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});