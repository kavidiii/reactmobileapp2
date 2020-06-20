import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Feed from './Feed';
import AddPost from './AddPost';
const TabNavigator = createBottomTabNavigator({
    Feed: {
      screen: Feed
    },
    AddPost: {
      screen: AddPost
    }
  });
  
  export default createAppContainer(TabNavigator);