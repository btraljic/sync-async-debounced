import React, { PureComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  VictoryChart,
  VictoryLabel,
  VictoryScatter,
  VictoryBar,
  VictoryStack,
  VictoryLine,
  VictoryArea,
} from "victory";

import './Charts.css';

import config from './config';


class Charts extends PureComponent {
  state = {
    isChartDisabled: [false, false, false, true],
  };


  handleClick = index => {
    this.setState(prevState => {
      const isChartDisabled = prevState.isChartDisabled.map((value, key) => {
        if (key === index) {
          return !value;
        }
        return value;
      });
      return { isChartDisabled };
    });
  }


  render() {
    const { data } = this.props;

    return (
      <Container>
        <Row>
          <Col
            md={6}
            className={this.state.isChartDisabled[0] ? 'disable-chart' : ''}
            onClick={() => this.handleClick(0)}
          >
            <VictoryChart domain={{ y: [0, 300] }}>
              <VictoryLabel
                text={this.state.isChartDisabled[0] ? 'Click to enable scatter chart rendering' : 'Click to disable scatter chart rendering'}
                textAnchor="start"
                verticalAnchor="start"
                dy={15}
                style={{ fontSize: '18px' }}
              />
              <VictoryScatter
                style={{ data: config.dataStyle }}
                alignment="start"
                data={this.state.isChartDisabled[0] ? [] : data[0]}
              />
            </VictoryChart>
          </Col>

          <Col
            md={6}
            className={this.state.isChartDisabled[1] ? 'disable-chart' : ''}
            onClick={() => this.handleClick(1)}
          >
            <VictoryChart domain={{ y: [0, 300] }}>
              <VictoryLabel
                text={this.state.isChartDisabled[1] ? 'Click to enable bar chart rendering' : 'Click to disable bar chart rendering'}
                textAnchor="start"
                verticalAnchor="start"
                dy={15}
                style={{ fontSize: '18px' }}
              />
              <VictoryBar
                style={{ data: config.dataStyle }}
                alignment="start"
                data={this.state.isChartDisabled[1] ? [] : data[0]}
              />
            </VictoryChart>
          </Col>
        </Row>

        <Row>
          <Col
            md={6}
            className={this.state.isChartDisabled[2] ? 'disable-chart' : ''}
            onClick={() => this.handleClick(2)}
          >
            <VictoryChart domain={{ y: [0, 300] }}>
              <VictoryLabel
                text={this.state.isChartDisabled[2] ? 'Click to enable line chart rendering' : 'Click to disable line chart rendering'}
                textAnchor="start"
                verticalAnchor="start"
                dy={15}
                style={{ fontSize: '18px' }}
              />
              <VictoryLine
                style={{
                  data: { stroke: config.COLORS[1] }
                }}
                alignment="start"
                interpolation="natural"
                data={this.state.isChartDisabled[2] ? [] : data[0]}
              />
            </VictoryChart>
          </Col>

          <Col
            md={6}
            className={this.state.isChartDisabled[3] ? 'disable-chart' : ''}
            onClick={() => this.handleClick(3)}
          >
            <VictoryChart domain={{ y: [0, 1300] }}>
              <VictoryLabel
                text={this.state.isChartDisabled[3] ? 'Click to enable area chart rendering' : 'Click to disable area chart rendering'}
                textAnchor="start"
                verticalAnchor="start"
                dy={15}
                style={{ fontSize: '18px' }}
              />
              <VictoryStack>
                {(this.state.isChartDisabled[3] ? [] : data).map((item, i) => (
                  <VictoryArea
                    key={i}
                    colorScale={config.COLORS}
                    alignment="start"
                    data={item}
                  />
                ))}
              </VictoryStack>
            </VictoryChart>
          </Col>
        </Row>
      </Container >
    );
  }
}

export default Charts;
