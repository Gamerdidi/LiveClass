import React, {useEffect, useState} from 'react';
import { Button } from '@material-ui/core';


class MyTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: (this.props.time)};
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours.toFixed(2),
      "m": minutes,
      "s": seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      this.props.submitQuizHandler();
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div>
        <Button  style={{margin:'5px 0'}} variant="contained" color="secondary" onClick={this.startTimer}>Start</Button>
        <div style={{fontSize:"20px"}}>Time Left:</div>
        <div style={{fontSize:"30px"}}>{this.state.time.m}:{this.state.time.s}</div>
      </div>
    );
  }
}

export default MyTimer;