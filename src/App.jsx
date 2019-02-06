import React, { PureComponent } from 'react';
import { flushSync } from 'react-dom';
import {
  unstable_scheduleCallback,
  unstable_getFirstCallbackNode,
  unstable_cancelCallback,
} from 'scheduler';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import './App.css';

import config from './config';
import getData from './data';
import { debounce } from './api';
import Charts from './Charts';


class App extends PureComponent {
  state = {
    chars: 0,
    SAD: 'Sync',
  }


  debounceHandleChange = debounce(chars => {
    if (this.state.SAD === 'Debounced') {
      flushSync(() => {
        this.setState({ chars });
      });
    }
  }, config.DEBOUNCED_WAIT_MS);


  handleSADClick = (e) => {
    const SAD = e.target.value;

    this.setState((prevState) => {
      if (prevState.SAD === SAD) {
        return null;
      }
      return { SAD };
    });
  }


  handleChange = (e) => {
    const chars = e.target.value.length;

    switch (this.state.SAD) {
      case 'Async':
        const firstNode = unstable_getFirstCallbackNode();
        if (firstNode) {
          unstable_cancelCallback(firstNode);
        }

        unstable_scheduleCallback(() => {
          this.setState({ chars });
        });
        break;
      case 'Debounced':
        this.debounceHandleChange(chars);
        break;
      default:
        flushSync(() => this.setState({ chars }));
    }
  }


  render() {
    console.log('render string length:', this.state.chars);
    const data = getData(this.state.chars);

    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs={4}>
              <Button
                variant={this.state.SAD === 'Sync' ? 'primary' : 'secondary'}
                onClick={this.handleSADClick}
                value='Sync'
                size='lg'
              >
                Sync
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                variant={this.state.SAD === 'Async' ? 'primary' : 'secondary'}
                onClick={this.handleSADClick}
                value='Async'
                size='lg'
              >
                Async
              </Button>
            </Col>
            <Col xs={4}>
              <Button
                variant={this.state.SAD === 'Debounced' ? 'primary' : 'secondary'}
                onClick={this.handleSADClick}
                value='Debounced'
                size='lg'
              >
                Debounced
              </Button>
            </Col>
          </Row>
        </Container>


        <Container>
          <Row>
            <Col xs={12}>
              <FormControl
                type="text"
                placeholder="longer input → more components and DOM nodes"
                size="lg"
                onChange={(e) => this.handleChange(e)}
              />
            </Col>
          </Row>
        </Container>

        <Charts data={data} />

      </div>
    );
  }
}

export default App;
