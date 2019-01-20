/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {Platform, StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(){
    super()



    this.operation = ['DEL', '+', '-', '*', '/']

    this.state = {
      resultText: '',
      calculationText: '0'
    }
  }

  calculateResult(){
    const text = this.state.resultText
    // now parse this text
    this.setState({
      calculationText: eval(text)
    })

  }

  operate(operation){
    switch(operation){
      case 'DEL':
        console.log(this.state.resultText)
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break

      case '+':
      case '-':
      case '*':
      case '/':

        let lastChar = this.state.resultText.split('').pop()

        if(this.operation.indexOf(lastChar) > 0) return

        if(this.state.text  == '') return

        this.setState({
          resultText: this.state.resultText + operation
        })

    }
  }

  validate(){
    let text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }

    return true
  }


  buttonPressed(text){

    if(text == '='){
      return this.validate() && this.calculateResult()
    }


    this.setState({
      resultText: this.state.resultText + text
    })
  }


  render() {
    let rows = []
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    for(let i = 0; i < 4; i++){
      let row = [];
      for(let j = 0; j < 3; j++){
        row.push(<TouchableOpacity
            onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}><Text style={styles.btnText}>{ nums[i][j] }</Text></TouchableOpacity>)
      }

      rows.push(<View style={styles.row}>{row}</View>)
    }

    let operations = []
    for(let i = 0; i < 5; i++){
      operations.push(<TouchableOpacity onPress={() => this.operate(this.operation[i])} style={styles.btn}><Text style={styles.btnText}>{ this.operation[i] }</Text></TouchableOpacity>)
    }




    return (
        <View style={styles.container}>
          {/* result container */}
          <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.resultText}</Text>
          </View>

          {/* result while typing - calculation */}
          <View style={styles.calculation}>
            <Text style={styles.calculationText}>{this.state.calculationText}</Text>
          </View>


          {/* Buttons */}
          <View style={styles.buttons}>
            <View style={styles.numbers}>
              {rows}
            </View>

            <View style={styles.operations}>
              {operations}
            </View>

            <View style={styles.design}></View>
          </View>



        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  btnText: {
    fontSize: 27,

  },

  calculationText: {
    fontSize: 40,
    color: "#424242",
  },

  resultText: {
    fontSize: 18,
    color: "#212121",
  },

  result: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  calculation: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#FAFAFA'
  },

  buttons: {
    flex: 5,
    flexDirection: 'row',
  },

  numbers: {
    flex: 3,
    backgroundColor: '#757575',
  },

  operations: {
    flex: 1,
    backgroundColor: '#616161',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },

  design: {
    flex: 0.1,
    backgroundColor: '#1DE9B6'
  }

});
