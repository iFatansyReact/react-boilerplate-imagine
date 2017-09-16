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
import classNames from 'classnames';
import H1 from 'components/H1';
import messages from './messages';
// import styles from './styles.scss';
require('./styles.scss');

export default class CarouselPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = { jackpotTotal: PropTypes.number };
  static defaultProps = { jackpotTotal: 12345678 };

  constructor(props) {
    super(props);
    this.state = {
      jackpotTotal: props.jackpotTotal,
      jackpot: Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    };
    this.init = false;
    this.tmpJackpot = Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.preJackpot = Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.styleNumber = [
      'number0',
      'number1',
      'number2',
      'number3',
      'number4',
      'number5',
      'number6',
      'number7',
      'number8',
      'number9',
    ];
  }

  componentDidMount() {
    this.startCount();
    // this.preJackpot = this.state.jackpot;
  }

  componentDidUpdate() {
    // this.init = true;
    // this.preJackpot = this.state.jackpot;
    this.timerId = setTimeout(
      () => this.move(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  startCount() {
    this.timerId = setInterval(
      () => this.tick(),
      1500,
    );
    // this.timerId = setTimeout(
    //   () => this.tick(),
    //   1500,
    // );
  }

  tick() {
    // const n = Math.floor(Math.random() * (100));
    // this.setState({ jackpotTotal: (this.state.jackpotTotal + n) });
    this.setState({ jackpotTotal: (this.state.jackpotTotal + 27) });
  }

  move() {
    for (let i = 0; i <= 11; i += 1) {
      const numberDom = document.getElementById(`mainNumber${i}`);
      const translate3dY = numberDom.getAttribute('data-translate3dY');
      numberDom.style.transform = translate3dY;
      numberDom.style.transition = 'transform 500ms ease';
    }

    // const number11 = document.getElementById('mainNumber11');
    // const translate3dY = number11.getAttribute('data-translate3dY');
    // number11.style.transform = translate3dY;
    // number11.style.transition = 'transform 500ms ease';
  }

  render() {
    // const tmpNumber11 = document.getElementById('mainNumber11');
    // if (tmpNumber11) {
    //   tmpNumber11.style.transition = '';
    // }

    // console.log('==========render start=========');
    const realPotArray = this.state.jackpotTotal.toString().split('');

    let tmpInt = 0;
    // 將預設的12位陣列為0的以map取出, 並確認 真實pot數字位數相同時才放入,否則依照原值放入
    this.preJackpot = this.tmpJackpot;

    this.tmpJackpot = this.state.jackpot.map((pot, index) => {
      if (index >= (this.state.jackpot.size - realPotArray.length)) {
        const newPot = realPotArray[tmpInt];
        tmpInt += 1;
        return newPot;
      }
      return pot;
    });

    if (this.init === false) {
      this.preJackpot = this.tmpJackpot;
      this.init = true;
    }

    for (let i = 0; i <= 11; i += 1) {
      const numberDom = document.getElementById(`mainNumber${i}`);
      if (numberDom) {
        // const translate3dY = number11.getAttribute('data-translate3dY');
        numberDom.style.transform = 'translate3d(0, -71px, 0)';
        numberDom.style.transition = '';
      }
    }


    // });


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
        <div className="jackpotDiv">
          <div className="jackpotArea">
            {
              this.tmpJackpot.map((pot, index) => {
                const newKey = index;
                // const newPot = pot;
                let preCount = 0;
                // this.preJackpot = this.preJackpot.set(index, pot);

                const nowCount = Number(this.tmpJackpot.join('').substr(0, index + 1));
                preCount = Number(this.preJackpot.join('').substr(0, index + 1));
                // } else {
                //   preCount = nowCount;
                // }

                //  if (index === 11) {
                //    console.log(tmpHtml, preCount, tmpJackpot, nowCount);
                //  }


                const tmpHtml = [];
                // if (index === 11) {
                // console.log(tmpHtml, `preCount:${preCount }`, this.preJackpot.toArray(), `nowCount:${nowCount }`);
                // }

                let lastNumber;
                for (let i = preCount; i <= nowCount; i += 1) {
                  const number = i % 10;
                  const numberNewKey = `${newKey}-${nowCount}-${i}`;
                  lastNumber = number;
                  tmpHtml.push(
                    <div
                      key={numberNewKey}
                      data-key={numberNewKey}
                      data-number={number}
                      className={classNames('jackpotNumber', this.styleNumber[number])}
                    />,
                  );
                }

                const numberLastKey = `${newKey}-${nowCount}-reset`;
                tmpHtml.unshift(
                  <div
                    key={`${numberLastKey}`}
                    data-key={`${numberLastKey}`}
                    data-number={lastNumber}
                    className={classNames('jackpotNumber', this.styleNumber[lastNumber])}
                  />
                );


                // 取得下一個位數共2位數的 數字差,來產生總共幾個數字
                // ex: 988 -> 98
                //    1000 ->100

                const translate3dY = (1 + (nowCount - preCount)) * -71;
                return (
                  <div
                    className="maiNumber"
                    key={newKey}
                    data-translate3dY={`translate3d(0, ${translate3dY}px, 0) `}
                    id={`mainNumber${newKey}`}
                  >
                    {tmpHtml}
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>

    );
  }
}
