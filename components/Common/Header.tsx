import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  ArrowLeft,
  ArrowRight,
  Logo
} from "../icons";

function Header(): JSX.Element {
   
    return (
      <View style={styles.sectionContainer}>
            <Logo color={'white'} height={25} style={{alignContent:'center',alignSelf:'center'}}/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    sectionContainer: {
      margin: 20,
      marginLeft: 160,
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center',
      textAlign:'center'
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  export default Header;