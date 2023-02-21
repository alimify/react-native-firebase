import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
    FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {
    ArrowLeft,
    ArrowRight,
    Logo
  } from "../icons";


export default function DateSwiper (props: any): JSX.Element {

    const children = Array.from({length: 50}, (_, i) => i + 1);
    const [getItemIndex, setItemIndex] = useState(15)

    const keyExtractor = React.useCallback((item: any) => item.toString(),children);
    const flatlistRef  = React.useRef()
    let prevIndex = 0;

    const onViewableItemsChanged = (info: any) => {
        if(info.viewableItems.length == 1){
            if(prevIndex > info.viewableItems[0].index){
                props.dateDecreament(props.self, props.uniq)
            }else if(prevIndex < info.viewableItems[0].index){
                props.dateIncreament(props.self, props.uniq)
            }
            prevIndex = info.viewableItems[0].index
            setItemIndex(info.viewableItems[0].index)
        }
    }


    useEffect( () => {

        if(getItemIndex == 0){
            flatlistRef.current.scrollToIndex({
                index: 15,
                animated: true
            })
        }
    })

    const viewConfig = {waitForInteraction: true, viewAreaCoveragePercentThreshold: 95};
    const viewabilityConfigCallbackPairs = React.useRef([{ viewConfig, onViewableItemsChanged }])


    return (
        <View style={{height:50, alignContent:'center',alignItems:'center',alignSelf:'center'}}>

        <FlatList
                    data={children}
                    ref={flatlistRef}
                    selected={15}
                    keyExtractor={keyExtractor}
                    style={{width: 200}}
                    renderItem={({item}) => <View style={{width: 200, alignContent: 'center',alignItems:'center'}}><Text style={{color:'green', fontSize: 20, fontWeight:'400', fontFamily:'Poppins'}}>{props.dayName}</Text><Text style={{color:'#32A071', fontSize: 12, lineHeight: 18, fontWeight: 400 }}>{props.date}</Text></View>}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    onScroll={() => {}}
                    // onViewableItemsChanged={() => {}}
                    onEndReached={async () => {
                         
                        await flatlistRef.current.scrollToIndex({
                            index: 15,
                            animated: true
                        })
                    }}
                    extraData={
                        4
                    }
                    initialScrollIndex={10}
            />

            <View style={{
                position: 'absolute',
                left: 0,
                top: 27
            }}>
                <TouchableOpacity onPress={async () => {
                    if(flatlistRef.current != null){
                        const index = getItemIndex == 0 ? 9 : getItemIndex - 1
                        
                        await flatlistRef.current.scrollToIndex({
                            index: index,
                            animated: true
                        })
                    }
                }}>
                    <Text>{'<'}</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                position: 'absolute',
                right: 0,
                top: 27
            }}>
                <TouchableOpacity onPress={async () => {
                    const index = getItemIndex == 49 ? 0 : getItemIndex + 1

                    if(flatlistRef.current != null){    
                        
                        await flatlistRef.current.scrollToIndex({
                             index: index,
                             animated: true
                         })
                    }    
                }}>
                    <Text>{'>'}</Text>
                
                </TouchableOpacity>
            </View>


      </View>
    );
}