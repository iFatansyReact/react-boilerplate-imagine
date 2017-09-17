/*
 * JackpotPage
 *
 * 思路:
 *
 * [初始]
 * 123456
 *
 * [第一輪]
 * 上一次 123456
 *   這次 123472
 *   相差 123472-123456 = 16
 *        (上一次的最後一位數6  加上 這次的差 16 結果為 22)
 *
 * 移動完成 重置到 2 的位置
 *
 * [第二輪]
 * 上一次 123472
 *   這次 123490
 *   相差 123472-123490 = 18
 *        (上一次的最後一位數2  加上 這次的差 18 結果為 20)
 *
 * 移動完成 重置到 0 的位置
 *
 * List all the Jackpot
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import H1 from 'components/H1';
import messages from './messages';
import Number from './number';
require('./styles.scss');

export default class JackpotPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = { jackpotTotal: PropTypes.number };
  static defaultProps = { jackpotTotal: 34853948976 };

  constructor(props) {
    super(props);
    this.state = {
      jackpotTotal: props.jackpotTotal,
    };

    this.init = false;
    this.activeJackpot = Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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
      3500,
    );
  }

  /**
   * 格式化數字靠右對齊補0
   * @memberof JackpotPage
   */
  formater() {
    const realPotArray = this.state.jackpotTotal.toString().split('');
    let tmpInt = 0;

    return this.activeJackpot.map((pot, index) => {
      if (index >= (this.activeJackpot.size - realPotArray.length)) {
        const newPot = realPotArray[tmpInt];
        tmpInt += 1;
        return newPot;
      }
      return pot;
    });
  }

  tick() {
    // const n = Math.floor(Math.random() * (100));
    // this.setState({ jackpotTotal: (this.state.jackpotTotal + n) });
    this.setState({ jackpotTotal: (this.state.jackpotTotal + 24) });
  }

  render() {
    // 往上加到指定的數字
    // const realPotArray = this.state.jackpotTotal.toString().split('');

    // let tmpInt = 0;
    // // 將預設的12位陣列為0的以map取出, 並確認 真實pot數字位數相同時才放入,否則依照原值放入
    // const tmpJackpot = this.state.jackpot.map((pot, index) => {
    //   if (index >= (this.state.jackpot.size - realPotArray.length)) {
    //     const newPot = realPotArray[tmpInt];
    //     tmpInt += 1;
    //     return newPot;
    //   }
    //   return pot;
    // });
    this.activeJackpot = this.formater();


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

        <div className="JackpotDiv">
          {
            this.activeJackpot.map((pot, index) => {
              // 計算進位數
              const count = parseInt(this.activeJackpot.join('').substr(0, index + 1), 0);
              const key = index;
              return (
                <Number
                  key={key}
                  initCount={this.props.jackpotTotal}
                  count={count}
                />
              );
            })
          }
        </div>
      </div>

    );
  }
}
