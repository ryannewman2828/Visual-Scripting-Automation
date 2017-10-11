import BPromise from 'bluebird';
import LogicUtils from '../utils/LogicUtils';

const request = require('sync-request');

const BASE_API = 'https://api.github.com';
const ScriptService = {};

// TODO promisfy
// TODO SIMPLIFY COMPILATION
// TODO REFACTOR and ABSTRACT
// This is a very POC rudementary implementation

ScriptService.Execute = (commands) => {
  const logs = [];
  const variables = {};
  let link = null;

  const getVal = (context) => {
    let value = null;
    if (context.inputType == 'Link'){
      value = link
    } else if (context.inputType == 'Variable') {
      value = variables[context.varSelected];
    } else if (context.inputType == 'Value') {
      value = context.value;
    }
    return value
  };

  const getVal1 = (context) => {
    let value = null;
    if (context.inputType1 == 'Link'){
      value = link
    } else if (context.inputType1 == 'Variable') {
      value = variables[context.varSelected1];
    } else if (context.inputType1 == 'Value') {
      value = context.value1;
    }
    return value
  };

  const getVal2 = (context) => {
    let value = null;
    if (context.inputType2 == 'Link'){
      value = link
    } else if (context.inputType2 == 'Variable') {
      value = variables[context.varSelected2];
    } else if (context.inputType2 == 'Value') {
      value = context.value2;
    }
    return value
  };

  const calcEndBracket = () => {
    let stackCount = 0;
    let index = 0;
    let ret = -1;
    commands.forEach((command) => {
      if (command.commandName === 'if' || command.commandName === 'while') {
        stackCount += 1;
      }
      if (command.commandName === 'end'){
        if (stackCount === 0) {
          ret = index;
          return index;
        }
        stackCount--;
      }
      index++;
    });
    return ret;
  };

  const calcElseBracket = () => {
    let stackCount = 0;
    let index = 0;
    let ret = -1;
    commands.forEach((command) => {
      if (command.commandName === 'if' || command.commandName === 'while') {
        stackCount += 1;
      }
      if (command.commandName === 'else'){
        if (stackCount === 0) {
          ret = index;
          return index;
        }
        stackCount--;
      }
      index++;
    });
    return ret;
  };

  const executeCommand = (command) => {
    switch (command.commandName) {
      case 'echo': {
        let value = getVal(command.context);
        logs.push(value);
        link = value;
        break;
      }
      case 'store': {
        let value = getVal(command.context);
        variables[command.context.varName] = value;
        link = value;
        break;
      }
      case 'if': {
        let value1 = getVal1(command.context);
        let value2 = getVal2(command.context);
        let test = `${value1} ${command.context.comparator} ${value2}`;
        test = LogicUtils.SimplifyLogicExpression(test);
        let ifCommands = [];
        let endIndex = calcEndBracket();
        let index = calcElseBracket();
        if (test) {
          if (index === -1) {
            ifCommands = commands.slice(0, endIndex);
          } else {
            ifCommands = commands.slice(0, index);
          }
        } else {
          if (index !== -1) {
            ifCommands = commands.slice(index, endIndex);
          }
        }
        for (let i = 0; i < endIndex; i++) {
          commands.shift();
        }
        while (ifCommands.length > 0) {
          executeCommand(ifCommands.shift());
        }
        link = test;
        break;
      }
      case 'while': {
        const tempLink = link;
        let lastLink = null;
        let whileCommands = commands.slice(0, calcEndBracket());
        const whileCommandsClone = whileCommands.slice(0);
        for (let i = 0; i < whileCommands.length; i++) {
          commands.shift();
        }
        while (true) {
          link = tempLink;
          let value1 = getVal1(command.context);
          let value2 = getVal2(command.context);
          let test = `${value1} ${command.context.comparator} ${value2}`;
          test = LogicUtils.SimplifyLogicExpression(test);
          if (!test) break;
          whileCommands = whileCommandsClone.slice(0);
          while (whileCommands.length > 0) {
            executeCommand(whileCommands.shift());
          }
          lastLink = link;
        }
        link = lastLink;
        break;
      }
      case 'range':
      {
        const tempLink = link;
        let lastLink = null;
        let count = 0;
        const val = getVal(command.context);
        let whileCommands = commands.slice(0, calcEndBracket());
        const whileCommandsClone = whileCommands.slice(0);
        for (let i = 0; i < whileCommands.length; i++) {
          commands.shift();
        }
        while (count < val) {
          link = tempLink;
          whileCommands = whileCommandsClone.slice(0);
          while (whileCommands.length > 0) {
            executeCommand(whileCommands.shift());
          }
          lastLink = link;
          count++;
        }
        link = lastLink;
        break;
      }
      case 'github_repos':
      {
        const username = getVal(command.context);
        const url = `${BASE_API}/users/${username}/repos`;
        const res = request('GET', url);
        link = res.body;
        break;
      }
    }
  };

  while (commands.length > 0){
    executeCommand(commands.shift());
  }

  return BPromise.resolve(logs);
};

export default ScriptService;
