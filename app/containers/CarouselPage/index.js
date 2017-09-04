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
  transform: translate3d(0,0,0);
  position: relative;
  display: block;
`;


const MainNumber = styled.div`
  opacity: 1;
  float: left;
  
  transition: -webkit-transform 500ms ease; /* 移動移動 */
  transform: translate3d(0, ${(props) => props.number * -71.5}px, 0px);
  position: relative;
  display: block;
  left: 0;
  top: 0;
  width: 52px;
  height: 78px;
  margin-right: 6px;
  background-color: red;

  &:nth-child(3n) {
    margin-right: 27px;
  }

  &:last-child {
    margin-right: 0;
  }
`;


const JackpotNumber = styled.div`
  float: left;
  width: 52px;
  height: 78px;
  background-image: url(${imgAll});
  background-position-y: -${(props) => props.number * 71.5}px;
  height: 100%;
  min-height: 1px;
  outline: ${(props) => props.outline}  | ''; 
`;


export default class CarouselPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = { jackpotTotal: PropTypes.number };
  static defaultProps = { jackpotTotal: 34853948976 };

  constructor(props) {
    super(props);
    this.state = {
      jackpotTotal: props.jackpotTotal,
      jackpot:
      Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
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
      1000,
    );
  }

  tick() {
    const n = Math.floor(Math.random() * (100));
    this.setState({ jackpotTotal: (this.state.jackpotTotal + n) });
  }

  render() {
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
          title="Carousel Page"
          meta={[
            { name: 'description', content: 'Carousel page of React.js Boilerplate application' },
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
                <MainNumber key={`${key}`} number={pot}>
                  <JackpotNumber
                    data-index={-1}
                    number={9}
                  />
                  <JackpotNumber
                    data-index={0}
                    tabindex={-1}
                    outline="none"
                    number={0}
                  />
                  <JackpotNumber
                    data-index={1}
                    tabindex={-1}
                    outline="none"
                    number={1}
                  />
                  <JackpotNumber
                    data-index={2}
                    tabindex={-1}
                    outline="none"
                    number={2}
                  />
                  <JackpotNumber
                    data-index={3}
                    tabindex={-1}
                    outline="none"
                    number={3}
                  />
                  <JackpotNumber
                    data-index={4}
                    tabindex={-1}
                    outline="none"
                    number={4}
                  />
                  <JackpotNumber
                    data-index={5}
                    tabindex={-1}
                    outline="none"
                    number={5}
                  />
                  <JackpotNumber
                    data-index={6}
                    tabindex={-1}
                    outline="none"
                    number={6}
                  />
                  <JackpotNumber
                    data-index={7}
                    tabindex={-1}
                    outline="none"
                    number={7}
                  />
                  <JackpotNumber
                    data-index={8}
                    tabindex={-1}
                    outline="none"
                    number={8}
                  />
                  <JackpotNumber
                    data-index={9}
                    tabindex={-1}
                    outline="none"
                    number={9}
                  />
                  <JackpotNumber
                    data-index={10}
                    number={9}
                  />
                </MainNumber>
              );
            })
          }
        </JackpotDiv>
      </div>

    );
  }
}
