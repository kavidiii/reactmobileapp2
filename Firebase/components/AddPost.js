import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Image, View , Button, Input, StyleSheet,TextInput,Text, Alert, ActivityIndicator} from 'react-native';
import { withFirebaseHOC } from './utils';
import firebase from '@react-native-firebase/app'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


class AddPost extends Component {
    state = {
      image: null,
      title: ''
    }
    onChangeTitle = title => {
      this.setState({ title })
    }
  
    selectImage = () => {
      const options = {
        noData: true
      }
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          const source = { uri: response.uri }
          console.log(source)
          this.setState({
            image: source
          })
        }
      })
    }
  
    onSubmit = async () => {
      try {
        const post = {
          photo: this.state.image,
          title: this.state.title
        }
        this.props.firebase.uploadPost(post)
          
        this.setState({
          image: null,
          title: '',
          description: ''
        })
      } catch (e) {
        console.error(e)
      }
    }
  
    render() {
      return (
        <View style={styles.inputStyle} >
        <View>
          {this.state.image ? (
            <Image
              source={this.state.image}
              style={{ width: '100%', height: 250 }}
            />
          ) : (
            <Button
            onPress={this.selectImage}
            style={{
              alignItems: 'center',
              padding: 5,
              margin: 30
            }}  title="Add an image" />
          )}
        </View>
        <View style={styles.container} >
          <Text>Post Details</Text>
          <TextInput
            placeholder='Enter title of the post'
            style={{ margin: 20 }}
            value={this.state.title}
            onChangeText={title => this.onChangeTitle(title)}
          />
           <Button status='success' onPress={this.onSubmit} title="Add_post"/> 
        </View>
      </View>
      )
    }
  }
  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      alignItems: 'center' 
    },
    inputStyle: {
      flex: 1, 
      marginTop: 15
    },
     
  });
   
  
  export default withFirebaseHOC(AddPost)