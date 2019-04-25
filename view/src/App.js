import React, { Component, useEffect, useState }  from 'react';

import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  Animated,
  Easing,
  Image,
} from 'react-native';
import logo from './logo.png';
import logod from './pobuext.png';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class App extends Component {
  state = {
    spinValue: new Animated.Value(0),
  }


  onClick = () => {
    const wasRotated = this.state.spinValue._value === 1;
    Animated.timing(
      this.state.spinValue,
      {
        toValue: wasRotated ? 0 : 1,
        duration: 50,
        easing: Easing.linear
      }
    ).start()
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });


    return (
      <View style={styles.container}>

        <View style={{width: '100%', flex: 1,}}>
      
        <Image  resizeMode={'contain'} source={logod} style={{width: 100, height: 50, marginBottom: 50,alignItems: "stretch",}}/>
        </View>

        <View style={styles.flex}>
      
          <View style={styles.flex1}>
            <Image resizeMode={'contain'} style={{ width: 300, height: 300}} source={logo} />
          </View>

          <View style={styles.flex2}>
            <Text style={styles.why}>
              WHY POBU?
            </Text>

            <Text style={styles.slogan}>
              Bookings + 
              connections,
              made easy
            </Text>

            <Text style={styles.description}>
              we value your privacy & efficiency, with pobu
              you got it all blabla.
            </Text>
          </View>

        </View>

      
        <TouchableHighlight
          onPress={this.onClick}
          style={styles.button}
          underlayColor={'#000'}
        >
          <Text style={styles.buttonText}>Get Your Host</Text>
        </TouchableHighlight>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8d8d8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
  },
  logo: {
    width: vw(100), 
    height: vh(100),
  },
  flex: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    // flexWrap: 'wrap-reverse',
    flexWrap: 'wrap',
    width: 100*vw,
    height: 100*vh,
  },
  flex1: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
  },
  flex2: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: 300,
  },
  slogan: {
    fontWeight: 'bold',
    fontSize: 28,
    borderLeftColor: '#000',
    borderLeftWidth: 2,
    fontFamily: 'Quicksand',
  },
  description: {
    fontWeight: '100',
    fontSize: 16,
    width: '80%',
    fontFamily: 'Quicksand',
  },
  why: {
    fontWeight: 'bold',
    fontSize: 12,
    width: '80%',
 
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,

  
    backgroundColor: '#3d009f',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    
    elevation: 5,
   
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Quicksand',
  },
});

// const App = () => {

//   const [users, setUsers] = useState([])

//   useEffect(() => {
//     fetch('/users')
//       .then(res => res.json())
//       .then(users => setUsers(users))
//   },[])

//   return (
//     <View>
//       <ul>
//         {users.map(user =>
//           <li key={user.id}>
//             {user.username}
//           </li>
//         )}
//       </ul>
//     </View>
//   )
// }

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
