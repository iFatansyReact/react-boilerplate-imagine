/*
 * JackpotPage
 *
 * List all the Jackpot
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import H1 from 'components/H1';
import styled from 'styled-components';
import messages from './messages';
import imgAll from './img/number-all.png';
import imgBg from './img/number-bg.png';

// import styles from './styles.scss';


const JackpotDiv = styled.div`
  width: 772px;
  height: 79px;
  overflow: hidden;
  padding-left: 9px;
  margin: 3px auto;
  background: transparent url(${imgBg}) repeat 0 0;
`;


const JackpotNumber = styled.div`
  float: left;
  width: 52px;
  height: 78px;
  margin-right: 6px;
  transition: all 0.9s;
  -webkit-transition: all 0.3s;
  -mos-transition: all 0.3s;
  -o-transition: all 0.3s;
  background-image: url(${imgAll});
  background-position-y: -${(props) => props.number * 71.5}px;

  &:nth-child(3n) {
    margin-right: 27px;
  }

  &:last-child {
    margin-right: 0;
  }
`;


export default class JackpotPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = { jackpotTotal: PropTypes.number };
  static defaultProps = { jackpotTotal: 34853948976 };

  constructor(props) {
    super(props);
    this.state = {
      jackpotTotal: props.jackpotTotal,
      jackpot: Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    };
  }

  componentDidMount() {
    this.startCount();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  startCount() {
    this.timerId = setInterval(
      () => this.tick(),
      1500,
    );
  }

  tick() {
    // const n = Math.floor(Math.random() * (100));
    // this.setState({ jackpotTotal: (this.state.jackpotTotal + n) });
    this.setState({ jackpotTotal: (this.state.jackpotTotal + 1) });
  }

  render() {
    console.log('test2');
    // 往上加到指定的數字,但不是一次到位,而是一次+1,+1上去
    const realPotArray = this.state.jackpotTotal.toString().split('');

    let tmpInt = 0;
    // 將預設的12位陣列為0的以map取出, 並確認 真實pot數字位數相同時才放入,否則依照原值放入
    const tmpJackpot = this.state.jackpot.map((pot, index) => {
      if (index >= (this.state.jackpot.size - realPotArray.length)) {
        const newPot = realPotArray[tmpInt];
        tmpInt += 1;
        return newPot;
      }
      return pot;
    });


    return (
      <div>
        <Helmet
          title="Jackpot Page"
          meta={[
            { name: 'description', content: 'Jackpot page of React.js Boilerplate application' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>

        <JackpotDiv>
          {
            tmpJackpot.map((pot, index) => {
              const key = index;
              return (
                <JackpotNumber
                  key={key}
                  number={pot}
                />
              );
            })
          }
        </JackpotDiv>
      </div>

    );
  }
}
