import React, { Component } from 'react';
import './App.css';

import CloseIcon from 'grommet/components/icons/base/Close';

import { default as GrommetApp } from 'grommet/components/App'
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Select from 'grommet/components/Select';
import TextInput from 'grommet/components/TextInput';

class Echo extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);

    this.state = {
      varSelected: '',
      variables: props.variables,
      inputType: 'Link'
    }
  }

  onChange(value) {
    this.setState({inputType: value});
  }

  onChangeInput(value) {
    const variables = this.state.variables;
    this.setState({ varSelected: value });
  }

  render() {
    return (
      <Box>
        <span>Echo</span><CloseIcon onClick={this.destroy}/>
        Input:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                  options={['Link', 'Variable']}
                  value={this.state.inputType}
                  onChange={(val) => this.onChange(val.value)} /></li>
          {this.state.inputType === 'Variable' &&
          (<li><TextInput /></li>)}
          </ul>
      </Box>
    )
  }
}

class New extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);

    this.state = {
      varSelected: '',
      variables: props.variables,
      inputType: 'Link'
    }
  }

  onChange(value) {
    this.setState({inputType: value});
  }

  onChangeInput(value) {
    const variables = this.state.variables;
    this.setState({ input: variables[value], varSelected: value });
  }

  render() {
    return (
      <Box>
        <span>New</span><CloseIcon onClick={this.destroy}/>
        Name:
        <TextInput
          onDOMChange={(event) => console.log(event.target.value)}>
        </TextInput>
        Input:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType}
                      onChange={(val) => this.onChange(val.value)} /></li>
          {this.state.inputType === 'Variable' &&
          (<li><TextInput /></li>)}
        </ul>
      </Box>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: undefined,
      consoleLogs: ['Initializing Console Output'],
      commands: [],
      variables: { count: 0 }
    };
    this.keys = 0;
    this.destroy = this.destroy.bind(this);
    this.onVarNameChange = this.onVarNameChange.bind(this);
  }

  destroy(key) {
    let commands = this.state.commands;
    commands = commands.filter(elem => elem.key != key);
    this.setState({ commands: commands });
  }

  onVarNameChange(oldName, newName) {
    const variables = this.state.variables;
    if (oldName) {
      delete variables[oldName];
    }

  }

  createCommand(index) {
    const commands = this.state.commands;
    switch (index) {
      case 0:
        commands.push(<ListItem key={this.keys}><Echo id={this.keys} variables={this.state.variables} destroy={this.destroy}></Echo></ListItem>);
        this.setState({ commands: commands });
        break;
      case 1:
        commands.push(<ListItem key={this.keys}><New id={this.keys} variables={this.state.variables} destroy={this.destroy}></New></ListItem>);
        this.setState({ commands: commands });
        break;
    }
    this.keys++;
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
