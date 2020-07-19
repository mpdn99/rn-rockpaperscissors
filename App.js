import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

var total = 0;
var won = 0;
var lose = 0;
var tied = 0;
var winsPercent;
var lossesPercent;
var tiePercent;;



const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];

const Button = props => (
  <TouchableOpacity style={styles.buttonStyle} onPress={() => props.onPress(props.name)}>
    <Text style={styles.buttonText}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</Text>
  </TouchableOpacity>
)

const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === computerChoice) result = 'Tie game!';

  if(result==='Victory!'){
    won++;
  }if(result==='Defeat!'){
    lose++;
  }
  if(result==='Tie game!'){
    tied++;
  }
  return [result, computerChoice];
};

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gamePrompt: 'Fire!',
      userChoice: {},
      computerChoice: {},
      total: 0,
      won: 0,
      lose: 0,
      tied: 0,
      winsPercent: 0,
      lossesPercent: 0,
      tiePercent: 0
    }
  }

  onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
  
    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);

    total++;

    winsPercent = (won/total*100).toFixed(2);
    lossesPercent = (lose/total*100).toFixed(2);
    tiePercent = (tied/total*100).toFixed(2);
  
    this.setState({
      gamePrompt: result,
      userChoice: newUserChoice,
      computerChoice: newComputerChoice,
      total: total,
      won: won,
      lose: lose,
      tied: tied,
      winsPercent: winsPercent,
      lossesPercent: lossesPercent,
      tiePercent: tiePercent
    })
  };

  getResultColor = () => {
    if (this.state.gamePrompt === 'Victory!') return 'green';
    if (this.state.gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 35, color: this.getResultColor() }}>{this.state.gamePrompt}</Text>
        <Text>Total game played: {this.state.total} </Text>
        <View style={{flexDirection:'row'}}>
          <Text>Won: {this.state.won} ({this.state.winsPercent}%) </Text>
          <Text>Lose: {this.state.lose} ({this.state.lossesPercent}%) </Text>
          <Text>Tied: {this.state.tied} ({this.state.tiePercent}%) </Text>
        </View>
        <View style={styles.choicesContainer}>
        <ChoiceCard player="Player" choice={this.state.userChoice}/>
        <Text style={{ color: '#250902' }}>vs</Text>
        <ChoiceCard player="Computer" choice={this.state.computerChoice}/>
        </View>
        
        {
          CHOICES.map(choice => {
            return <Button key={choice.name} name={choice.name} onPress={this.onPress}/>;
          })
        }
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 80,
    shadowRadius: 5,
    paddingBottom: 80,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
