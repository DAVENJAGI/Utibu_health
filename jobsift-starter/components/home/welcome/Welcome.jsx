import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-web'
import { icons, SIZES } from '../../../constants'

const Welcome = () => {
  const router = useRouter();
  
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 0 && hours < 12) {
      setGreeting('Good morning');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);


  

  return (
    <View>
      <View style={styles.container}>
        <Text style={{fontSize: 35, fontWeight:900, color:"#1a6860", marginBottom: SIZES.xSmall}}>{greeting},</Text>
        <Text style={{fontSize: 33, fontWeight:800, color:"#1a6860", marginBottom: SIZES.medium}}>David.</Text>
      </View>

      
    </View>

  )
}

export default Welcome