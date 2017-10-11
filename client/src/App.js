import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';

import CloseIcon from 'grommet/components/icons/base/Close';

import { default as GrommetApp } from 'grommet/components/App'
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Select from 'grommet/components/Select';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';

class Echo extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;

    this.state = {
      varSelected: '',
      inputType: 'Link'
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  addCommand() {
    this.addCommandToFeed('echo', this.state);
  }

  onChange(value) {
    this.setState({inputType: value});
  }

  onChangeInput(env) {
    this.setState({ varSelected: env.target.value });
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
          (<li><TextInput
                 onDOMChange={this.onChangeInput}/></li>)}
          </ul>
      </Box>
    )
  }
}

class Store extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;

    this.state = {
      varName: '',
      value: null,
      varSelected: '',
      inputType: 'Link'
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeVarName = this.onChangeVarName.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  addCommand() {
    this.addCommandToFeed('store', this.state);
  }

  onChange(value) {
    this.setState({inputType: value});
  }

  onChangeVarName(env) {
    this.setState({ varName: env.target.value });
  }

  onChangeInput(env) {
    this.setState({ varSelected: env.target.value });
  }

  onChangeValue(env) {
    this.setState({ value: env.target.value });
  }

  render() {
    return (
      <Box>
        <span>Store</span><CloseIcon onClick={this.destroy}/>
        Name:
        <TextInput
          onDOMChange={this.onChangeVarName}>
        </TextInput>
        Input:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType}
                      onChange={(val) => this.onChange(val.value)} /></li>
          {this.state.inputType === 'Variable' &&
          (<li><TextInput
            onDOMChange={this.onChangeInput}/></li>)}
          {this.state.inputType === 'Value' &&
          (<li><TextInput
            onDOMChange={this.onChangeValue}/></li>)}
        </ul>
      </Box>
    )
  }
}

class If extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;

    this.state = {
      value1: null,
      varSelected1: '',
      inputType1: 'Link',
      comparator: '==',
      value2: null,
      varSelected2: '',
      inputType2: 'Link',
    };

    this.onChange1 = this.onChange1.bind(this);
    this.onChangeInput1 = this.onChangeInput1.bind(this);
    this.onChangeValue1 = this.onChangeValue1.bind(this);
    this.onChangeComparator = this.onChangeComparator.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onChangeInput2 = this.onChangeInput2.bind(this);
    this.onChangeValue2 = this.onChangeValue2.bind(this);
  }

  addCommand() {
    this.addCommandToFeed('if', this.state);
  }

  onChange1(value) {
    this.setState({ inputType1: value });
  }

  onChangeInput1(env) {
    this.setState({ varSelected1: env.target.value });
  }

  onChangeValue1(env) {
    this.setState({ value1: env.target.value });
  }

  onChangeComparator(value) {
    this.setState({ comparator: value });
  }

  onChange2(value) {
    this.setState({ inputType2: value });
  }

  onChangeInput2(env) {
    this.setState({ varSelected2: env.target.value });
  }

  onChangeValue2(env) {
    this.setState({ value2: env.target.value });
  }

  render() {
    return (
      <Box>
        <span>If</span><CloseIcon onClick={this.destroy}/>
        Input 1:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType1}
                      onChange={(val) => this.onChange1(val.value)} /></li>
          {this.state.inputType1 === 'Variable' &&
          (<li><TextInput
            onDOMChange={this.onChangeInput1}/></li>)}
          {this.state.inputType1 === 'Value' &&
          (<li><TextInput
            onDOMChange={this.onChangeValue1}/></li>)}
        </ul>
        <Select placeHolder='=='
                options={['==', '!=', '<', '>', '>=', '<=', '&&', '||']}
                value={this.state.comparator}
                onChange={(val) => this.onChangeComparator(val.value)} />
        Input 2:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType2}
                      onChange={(val) => this.onChange2(val.value)} /></li>
          {this.state.inputType2 === 'Variable' &&
          (<li><TextInput
            onDOMChange={this.onChangeInput2}/></li>)}
          {this.state.inputType2 === 'Value' &&
          (<li><TextInput
            onDOMChange={this.onChangeValue2}/></li>)}
        </ul>
      </Box>
    )
  }
}

class While extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;

    this.state = {
      value1: null,
      varSelected1: '',
      inputType1: 'Link',
      comparator: '==',
      value2: null,
      varSelected2: '',
      inputType2: 'Link',
    };

    this.onChange1 = this.onChange1.bind(this);
    this.onChangeInput1 = this.onChangeInput1.bind(this);
    this.onChangeValue1 = this.onChangeValue1.bind(this);
    this.onChangeComparator = this.onChangeComparator.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onChangeInput2 = this.onChangeInput2.bind(this);
    this.onChangeValue2 = this.onChangeValue2.bind(this);
  }

  addCommand() {
    this.addCommandToFeed('while', this.state);
  }

  onChange1(value) {
    this.setState({ inputType1: value });
  }

  onChangeInput1(env) {
    this.setState({ varSelected1: env.target.value });
  }

  onChangeValue1(env) {
    this.setState({ value1: env.target.value });
  }

  onChangeComparator(value) {
    this.setState({ comparator: value });
  }

  onChange2(value) {
    this.setState({ inputType2: value });
  }

  onChangeInput2(env) {
    this.setState({ varSelected2: env.target.value });
  }

  onChangeValue2(env) {
    this.setState({ value2: env.target.value });
  }

  render() {
    return (
      <Box>
        <span>While</span><CloseIcon onClick={this.destroy}/>
        Input 1:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType1}
                      onChange={(val) => this.onChange1(val.value)} /></li>
          {this.state.inputType1 === 'Variable' &&
          (<li><TextInput
            onDOMChange={this.onChangeInput1}/></li>)}
          {this.state.inputType1 === 'Value' &&
          (<li><TextInput
            onDOMChange={this.onChangeValue1}/></li>)}
        </ul>
        <Select placeHolder='=='
                options={['==', '!=', '<', '>', '>=', '<=', '&&', '||']}
                value={this.state.comparator}
                onChange={(val) => this.onChangeComparator(val.value)} />
        Input 2:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType2}
                      onChange={(val) => this.onChange2(val.value)} /></li>
          {this.state.inputType2 === 'Variable' &&
          (<li><TextInput
            onDOMChange={this.onChangeInput2}/></li>)}
          {this.state.inputType2 === 'Value' &&
          (<li><TextInput
            onDOMChange={this.onChangeValue2}/></li>)}
        </ul>
      </Box>
    )
  }
}

class Else extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;
  }

  addCommand() {
    this.addCommandToFeed('else', this.state);
  }

  render() {
    return (
      <Box>
        <span>Else</span><CloseIcon onClick={this.destroy}/>
      </Box>
    )
  }
}

class End extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;
  }

  addCommand() {
    this.addCommandToFeed('end', this.state);
  }

  render() {
    return (
      <Box>
        <span>End</span><CloseIcon onClick={this.destroy}/>
      </Box>
    )
  }
}

class Range extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;

    this.state = {
      value: null,
      varSelected: '',
      inputType: 'Link',
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  addCommand() {
    this.addCommandToFeed('range', this.state);
  }

  onChange(value) {
    this.setState({ inputType: value });
  }

  onChangeInput(env) {
    this.setState({ varSelected: env.target.value });
  }

  onChangeValue(env) {
    this.setState({ value: env.target.value });
  }

  render() {
    return (
      <Box>
        <span>Range Loop</span><CloseIcon onClick={this.destroy}/>
        Loop for how many times:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType}
                      onChange={(val) => this.onChange(val.value)} /></li>
          {this.state.inputType === 'Variable' &&
          (<li><TextInput
            onDOMChange={this.onChangeInput}/></li>)}
          {this.state.inputType === 'Value' &&
          (<li><TextInput
            onDOMChange={this.onChangeValue}/></li>)}
        </ul>
      </Box>
    )
  }
}

class GithubRepos extends Component {
  constructor(props) {
    super();

    this.destroy = () => props.destroy(props.id);
    this.addCommandToFeed = props.addCommandToFeed;

    this.state = {
      value: null,
      varSelected: '',
      inputType: 'Link',
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  addCommand() {
    this.addCommandToFeed('github_repos', this.state);
  }

  onChange(value) {
    this.setState({ inputType: value });
  }

  onChangeInput(env) {
    this.setState({ varSelected: env.target.value });
  }

  onChangeValue(env) {
    this.setState({ value: env.target.value });
  }

  render() {
    return (
      <Box>
        <span>Github Repos</span><CloseIcon onClick={this.destroy}/>
        Username:
        <ul className="inputList">
          <li><Select placeHolder='Link'
                      options={['Link', 'Variable', 'Value']}
                      value={this.state.inputType}
                      onChange={(val) => this.onChange(val.value)} /></li>
          {this.state.inputType === 'Variable' &&
          (<li><TextInput
            onDOMChange={this.onChangeInput}/></li>)}
          {this.state.inputType === 'Value' &&
          (<li><TextInput
            onDOMChange={this.onChangeValue}/></li>)}
        </ul>
      </Box>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commandFeed: [],
      consoleLogs: ['Initializing Console Output'],
      commands: [],
      variables: { count: 0 }
    };

    this.child = {};

    this.keys = 0;
    this.destroy = this.destroy.bind(this);
    this.addCommandToFeed = this.addCommandToFeed.bind(this);
  }

  destroy(key) {
    let commands = this.state.commands;
    commands = commands.filter(elem => elem.key != key);
    delete this.child[key];
    this.setState({ commands: commands });
  }

  addCommandToFeed(commandName, state) {
    const commandFeed = this.state.commandFeed;
    commandFeed.push({
      commandName,
      context: state,
    });
    this.setState({ commandFeed: commandFeed});
  }

  printFeed() {
    Object.keys(this.child).forEach(key => this.child[key] && this.child[key].addCommand()); // refactor this to not keep the key
    console.log(this.state.commandFeed);
    this.setState({ commandFeed: [] });
  }

  executeCode() {
    Object.keys(this.child).forEach(key => this.child[key] && this.child[key].addCommand()); // refactor this to not keep the key
    fetch('http://localhost:9000/api/v1/script/execute', {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type':'application/json'
      }),
      mode: 'no-cors',
      method: 'POST',
      body: JSON.stringify({ commands: "sd" }),
    })
      .then((response) => response.json())
      .then((a) => console.log(a))
      .then(() => this.setState({ commandFeed: [] }));
  }

  createCommand(index) {
    const commands = this.state.commands;
    switch (index) {
      case 0:
        commands.push(<ListItem key={this.keys}><Echo id={this.keys}  destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></Echo></ListItem>);
        this.setState({ commands: commands });
        break;
      case 1:
        commands.push(<ListItem key={this.keys}><Store id={this.keys} destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></Store></ListItem>);
        this.setState({ commands: commands });
        break;
      case 2:
        commands.push(<ListItem key={this.keys}><If id={this.keys} destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></If></ListItem>);
        this.setState({ commands: commands });
        break;
      case 3:
        commands.push(<ListItem key={this.keys}><Else id={this.keys} destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></Else></ListItem>);
        this.setState({ commands: commands });
        break;
      case 4:
        commands.push(<ListItem key={this.keys}><While id={this.keys} destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></While></ListItem>);
        this.setState({ commands: commands });
        break;
      case 5:
        commands.push(<ListItem key={this.keys}><Range id={this.keys} destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></Range></ListItem>);
        this.setState({ commands: commands });
        break;
      case 6:
        commands.push(<ListItem key={this.keys}><End id={this.keys} destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></End></ListItem>);
        this.setState({ commands: commands });
        break;
      case 7:
        commands.push(<ListItem key={this.keys}><GithubRepos id={this.keys} destroy={this.destroy} addCommandToFeed={this.addCommandToFeed} ref={ref => (this.child[this.keys] = ref)}></GithubRepos></ListItem>);
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
              <Button
                    label='Save (print to JS console)'
                    onClick={() => this.printFeed()}
                    href='#' />
              <Button
                    label='Execute'
                    onClick={() => this.executeCode()}
                    href='#' />
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
                    Store
                  </span>
                </ListItem>
                <ListItem justify='between'
                          separator='horizontal'>
                  <span>
                    If
                  </span>
                </ListItem>
                <ListItem justify='between'
                          separator='horizontal'>
                  <span>
                    Else
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
                    End
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
