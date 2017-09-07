// eslint-disable
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
  padding: 3px 0 7px 11px;
  margin: 3px auto;
  background: transparent url(${imgBg}) repeat 0 0;
  transform: translate3d(0,0,0);
  position: relative;
  display: block;
`;

const JackpotArea = styled.div`
    width:100%;
    overflow: hidden;
    height: 71px;
`;

const MaiNumber = styled.div`
  opacity: 1;
  float: left;
  /*transition: -webkit-transform 500ms ease; /* 移動移動 */
  /*transition: ${(props) => props.number < 10 ? '-webkit-transform 500ms ease' : 'none'}; /* 移動移動 */
  
  position: relative;
  display: block;
  left: 0;
  top: 0;
  width: 49px;
  height: 100%;
  margin-right: 9px;
  transform: translate3d(0, ${(props) => Number(props.number) === 10 ? 0 : (Number(props.number) + 1) * -71}px, 0px);
  /*transform: translate3d(0, 71px, 0px);*/

  &:nth-child(3n) {
    margin-right: 30px;
  }

  &:last-child {
    margin-right: 0;
  }
`;


const JackpotNumber = styled.div`
  float: left;
  width: 52px;
  height: 71px;
  background-image: url(${imgAll});
  height: 100%;
  min-height: 1px;
  outline: ${(props) => props.outline || ''}; 
`;

const Number0 = JackpotNumber.extend`
  background-position-y:-7px;
`;

const Number1 = JackpotNumber.extend`
  background-position-y:-75px;
`;

const Number2 = JackpotNumber.extend`
  background-position-y:-149px;
`;

const Number3 = JackpotNumber.extend`
  background-position-y:-221px;
`;

const Number4 = JackpotNumber.extend`
  background-position-y:-292px;
`;

const Number5 = JackpotNumber.extend`
  background-position-y:-360px;
`;

const Number6 = JackpotNumber.extend`
  background-position-y:-431px;
`;

const Number7 = JackpotNumber.extend`
  background-position-y:-502px;
`;

const Number8 = JackpotNumber.extend`
  background-position-y:-574px;
`;

const Number9 = JackpotNumber.extend`
  background-position-y:-645px;
`;

const Number10 = JackpotNumber.extend`
  background-position-y:-645px;
`;


export default class CarouselPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = { jackpotTotal: PropTypes.number };
  static defaultProps = { jackpotTotal: 12345678 };

  constructor(props) {
    super(props);
    this.state = {
      jackpotTotal: props.jackpotTotal,
      jackpot: Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    };
    this.preJackpot = Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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

    // this.setState(tmpJackpot);

    // tmpJackpot.List(tmpJackpot);


    // const tmpJackpot = tmpJackpot.map((ipot, index) => {


    // });

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
          <JackpotArea>
            {
              tmpJackpot.map((pot, index) => {
                const newKey = index;
                const newPot = pot;

                // if (index === 11) {
                //  console.log(this.preJackpot.get(index));
                // }

                // 檢查上一次的數字是否為9, 若為9, 先跳到 10
                // if (index === 11) {
                //   console.log(`pre:${this.preJackpot.get(index)}`, `now:${newPot}`);
                // }


                if (document.getElementById(`number${newKey}`)) {
                  if (newPot === '9') {
                    document.getElementById(`number${newKey}`).style.transform = 'translate3d(0, 0, 0)';
                    document.getElementById(`number${newKey}`).style.transition = 'null';
                    // newPot = 10;
                  } else {
                    document.getElementById(`number${newKey}`).style.transform = '';
                    document.getElementById(`number${newKey}`).style.transition = '-webkit-transform 500ms ease';
                  }
                }

                this.preJackpot = this.preJackpot.set(index, pot);
                // if (index === 11) {
                //  console.log(this.preJackpot.get(index));
                // }

                return (
                  <MaiNumber key={newKey} number={newPot} id={`number${newKey}`} >
                    <Number10
                      data-index={-1}
                      number={9}
                      outline="none"
                    />
                    <Number0
                      data-index={0}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number1
                      data-index={1}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number2
                      data-index={2}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number3
                      data-index={3}
                      tabindex={-1}
                      outline="none"
                      number={3}
                    />
                    <Number4
                      data-index={4}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number5
                      data-index={5}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number6
                      data-index={6}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number7
                      data-index={7}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number8
                      data-index={8}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number9
                      data-index={9}
                      tabindex={-1}
                      outline="none"
                    />
                    <Number0
                      data-index={-1}
                    />
                  </MaiNumber>
                );
              })
            }
          </JackpotArea>
        </JackpotDiv>
      </div>

    );
  }
}
