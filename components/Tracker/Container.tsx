import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import SelectDropDown from "react-native-select-dropdown";
import DateSwiper from './DateSwiper'

class Container extends React.Component {


    state = {
        loading: true,
        dateSlots: [{
            uniq: 1,
            start: 1,
            end: 5,
            date: new Date(),
            updatedAt: new Date(),
          },
          {
            uniq: 2,
            start: 1,
            end: 5,
            date: new Date(),
            updatedAt: new Date(),
          }
        
        ],
        timeSlots: [],
        currentDate: new Date(),
        dateViewUniq: null,
        dateViewVal: null,
        addDateModalShow: false,
        datePickerShow: false,
        newDateVal: {
          uniq: null,
          start: 1,
          end: 5,
          date: new Date(),
          updatedAt: new Date(),
        },
    };


    constructor(props: any){
        super(props);
    }


    render(): React.ReactNode {

        let screenHeight = Dimensions.get('window').height;

        return (
            <View style={styles.container}>
                 <TouchableOpacity style={styles.addNewBtn} onPress={() => {
                        this.setState({
                            addDateModalShow: true
                        })
                 }}>
                      <Text style={styles.addNewBtnTxt}>Add New Date</Text>
                 </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.addDateModalShow}
                        onRequestClose={() => {
                        
                        
                        }}>
                            

                        <View style={{...styles.centeredView, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
                            
                            <View style={styles.modalView}>
                                
                                <View>
                                    <Text>Date</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            datePickerShow: true
                                        })
                                    }}>

                                        <Text style={{borderWidth: 1,borderRadius: 8, padding: 14, borderColor:'green'}}>{this.state.newDateVal.date.toLocaleDateString('en-GB',{
                                            month: "long",
                                            year: "numeric",
                                            day: "numeric",
                                        })}</Text>
                                    </TouchableOpacity>

                                                        <Modal
                                                            supportedOrientations={['portrait', 'landscape']}
                                                            animationType="none"
                                                            transparent={true}
                                                            statusBarTranslucent={false}
                                                            visible={ this.state.datePickerShow}>
                                                                <Calendar style={{margin:50, marginTop: 130, borderWidth: 1,borderColor:'green'}} 
                                                                          initialDate={this.state.newDateVal.date.toLocaleDateString('en-GB', {
                                                                            month: "numeric",
                                                                            year: "numeric",
                                                                            day: "numeric",
                                                                          }).split('\/').reverse().join('-')} 
                                                                          onDayPress={(day) => {
                                                                                        this.setState({
                                                                                            newDateVal: {...this.state.newDateVal,date: new Date(day.timestamp)},
                                                                                            datePickerShow: false
                                                                                        })
                                                                }}/>
                                                        </Modal>
                                
                                </View>
                                <View>
                                    <Text>Start Time</Text>
                                    <SelectDropDown data={this._timeList()}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        defaultButtonText="Select time"
                                        buttonStyle={styles.dropdown1BtnStyle}
                                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    />
                                </View>

                                <View>
                                    <Text>End Time</Text>
                                    <SelectDropDown data={this._timeList()}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        defaultButtonText="Select time"
                                        buttonStyle={styles.dropdown1BtnStyle}
                                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    />
                                </View>

                                <View>
                                    <TouchableOpacity style={{backgroundColor:'green', padding: 10, width: 120, borderRadius: 8, alignItems:'center', marginTop: 10}}
                                            onPress={() => {
                                                this.setState({
                                                    addDateModalShow: false
                                                })
                                            }}>
                                        <Text style={{color:'white', fontWeight:'900'}}>ADD</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                    </Modal>

      
                 <View style={{...styles.trackListContainer,minHeight: screenHeight - 200}}>
                        
                              {this.state.dateSlots.map((item,index) => <View key={index.toString()}>{this._dateSlot(item)}</View>)}
                  </View>
      
            
      
                 <View style={styles.flex}>
      
                      <View style={{...styles.flex, ...styles.justifyBetween}}>
                          <View>
                              <Text>Total Day</Text>
                          </View>
                          <View>
                              <Text>14</Text>
                          </View>
                      </View>
      
                      <View style={{...styles.flex, ...styles.justifyBetween}}>
                          <View>
                              <Text>Total Hours</Text>
                          </View>
                          <View>
                              <Text>14</Text>
                          </View>
                      </View>
      
                 </View>
                  
            </View>
          );
    }


    _timeList(){

        return [...Array.from(Array(24).keys())].map((itemOpt) => {

            return itemOpt + 1 > 12 ? itemOpt - 12 + 1 + ' PM': itemOpt + 1 + " AM"
        })
    }

    _dateSlot(item: any){

    
        return (

            <View style={{borderBottomWidth: 0.3, borderColor:'green', paddingVertical: 10}}>
                
            <View style={styles.trackListDate}>
                <DateSwiper date={item.date.toLocaleDateString("en-GB", {month: "long",year: "numeric",day: "numeric"})} 
                            uniq={item.uniq} 
                            dateIncreament={this._dateIncreament} 
                            dateDecreament={this._dateDecreament}
                            dayName={item.date.toLocaleDateString("en-GB", { weekday: "long" }).split(',')[0]}
                            self={this}/>
                
            </View>
            <View style={{flexDirection:'row', flexWrap:'wrap',...styles.justifyBetween}}>
                <View>
                    <Text>Start Time</Text>

                    <SelectDropDown data={this._timeList()}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        defaultButtonText="Select time"
                                        buttonStyle={styles.dropdown1BtnStyle}
                                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    />


                </View>
                <View>
                    <Text>End Time</Text>

                    <SelectDropDown data={this._timeList()}
                                        onSelect={(selectedItem, index) => {
                                            console.log(selectedItem, index)
                                        }}
                                        defaultButtonText="Select time"
                                        buttonStyle={styles.dropdown1BtnStyle}
                                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    />


                </View>
                <View>
                    <Text>Hours</Text>
                    <View style={{backgroundColor:'#C7F0DF', paddingHorizontal: 30, paddingVertical:10, borderRadius: 10, margin: 3}}>
                        <Text style={{color:'#2DA771'}}>7 hours</Text>
                    </View>
                </View>
            </View>

        </View>


        );
    }


    _dateIncreament(self: any,uniq: string){

        const getDate = self.state.dateSlots.map((item: any) => {
            if(item.uniq == uniq){
                let date = new Date(item.date);
                date.setDate(date.getDate() + 1)
                item.date = date
            }
            return item
        })

        self.setState({
            dateSlots: getDate
        })

    }


    _dateDecreament(self: any,uniq: string){
  
        
        const getDate = self.state.dateSlots.map((item: any) => {
            if(item.uniq == uniq){
                let date = new Date(item.date);
                date.setDate(date.getDate() - 1)
                item.date = date
            }
            return item
        })

        self.setState({
            dateSlots: getDate
        })


    }
    
}

  const styles = StyleSheet.create({
    container: {
      margin: 20,
      padding: 5,
      backgroundColor:'white',
      borderRadius: 8,
    },

    addNewBtn: {
        padding: 10,
        height: 35,
        backgroundColor: '#C7F0DF',
        borderRadius: 5,
        width: 130
    },

    addNewBtnTxt: {
        color: '#2DA771'
    },

    trackListContainer: {
       flexGrow: 1
    },

    trackListDate: {
        justifyContent:'center',
        alignItems:'center'
    },

    flex: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    justifyBetween: {
        justifyContent: 'space-evenly'
    },

    trackListView: {
        height: '80%'
    },



    centeredView: {
        flex: 1,
    },

    modalView: {
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },


    dropdown1BtnStyle: {
        minWidth: 100,
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'green',
      },
      dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},

      wrapper: {
     
      },
      slide1: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      },
      slide2: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
      },
      slide3: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
      },
      text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
      }

  });

  export default Container;