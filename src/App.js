import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PictureCard from "./components/PictureCard";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";


class App extends Component {
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };

  clickPicture = id => {

    const shuffledArray = this.shuffleArray(cards);
    this.setState({ cards: shuffledArray });

    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect! Game Over. Click an image to start again!", shakeit: "true" });
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct!",
        shakeit: "false"
      });
    }

    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
  }

  shuffleArray = (picturesArray) => {
    for (let i = picturesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
    }
    return picturesArray;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the MLB React Clicky Game!</h1>
        </header>
        <div className="App-intro-div">
          <h3 className="App-intro">
            <strong>Click on a team to earn points, but don't click on any more than once!</strong>
            <p className="score"><strong>Score: {this.state.score} | Top Score: {this.state.topScore}</strong></p>
            <p className="message"><strong>{this.state.message}</strong></p>
          </h3>
        </div>
        <Wrapper
          shakeWrapper={this.state.shakeit}
          pictures=
          {this.state.cards.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
        <footer className="footer">
          <div className="container">
            <span className="text-muted">Harris's Clicky Game - Week 19</span>
          </div>
        </footer>
      </div>
    );
  }

}

export default App;
