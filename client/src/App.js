import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { default as GrommetApp } from 'grommet/components/App'
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class Echo extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  render() {
    return (
      <Box>
        Echo
      </Box>
    )
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleLogs: ['Initializing Console Output'],
      commands: [],
      variables: {}
    }
  }

  createCommand(index) {
    const commands = this.state.commands;
    console.log(commands);
    switch (index) {
      case 0:
        commands.push(<ListItem><Echo></Echo></ListItem>);
        this.setState({ commands: commands });
    }
  }

  render() {
    return (
      <GrommetApp>
        <div className="main">
          <div className="heading">
            <Box>
              Header
            </Box>
          </div>
          <Split
            className="split"
            flex='right'>
            <div className="selectorPanel">
              <List selectable={true}
                    onSelect={index => this.createCommand(index)}>
                <ListItem justify='between'
                          separator='horizontal'>
                  <span>
                    Echo
                  </span>
                </ListItem>
                <ListItem justify='between'>
                  <span>
                    New
                  </span>
                </ListItem>
                <ListItem justify='between'>
                  <span>
                    Store
                  </span>
                </ListItem>
                <ListItem justify='between'
                          separator='horizontal'>
                  <span>
                    If/Else
                  </span>
                </ListItem>
                <ListItem justify='between'>
                  <span>
                    While
                  </span>
                </ListItem>
                <ListItem justify='between'>
                  <span>
                    Range Loop
                  </span>
                </ListItem>
                <ListItem justify='between'
                          separator='horizontal'>
                  <span>
                    Github - Repos
                  </span>
                </ListItem>
              </List>
            </div>
            <div className="commands">
              <List>
                {this.state.commands.map(elem => elem)}
              </List>
            </div>
          </Split>
          <div className="console">
            <List>
              {this.state.consoleLogs.map((log, i) => {
                return (
                  <ListItem
                    justify='between'
                    separator='horizontal'
                    key={i}>
                      <span>
                        {log}
                      </span>
                  </ListItem>
                )
              })}
            </List>
          </div>
        </div>
      </GrommetApp>
    );
  }
}

export default App;
