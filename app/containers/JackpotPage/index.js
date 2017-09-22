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

export default class JackpotPage extends React.Component {
  static propTypes = {
    jackpotTotal: PropTypes.number, // 遊戲總彩金
    isRandom: PropTypes.bool, // 數字已亂數跳動(若設定為true,則不會採納tickCount參數)
    tickCount: PropTypes.number, // 每次增加總彩金數字
    tickTimeMs: PropTypes.number, // 數字跳動間隔時間(ms)
    moveTimeMs: PropTypes.number, // 數字移動速度-限制時間(ms)
  };
  static defaultProps = {
    jackpotTotal: 123456,
    isRandom: false,
    tickCount: 27,
    tickTimeMs: 1900,
    moveTimeMs: 900,
  };

  constructor(props) {
    super(props);
    this.state = {
      jackpotTotal: Math.floor(props.jackpotTotal),
    };

    this.activeJackpot = Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 目前的jackpot
    this.preJackpot = Immutable.List([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);    // 上一次的Jackpot
  }

  componentDidMount() {
    this.startCount();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  /**
   * 計時跳動數字
   * @memberof JackpotPage
   */
  startCount() {
    this.timerId = setInterval(
      () => this.tick(),
      this.props.tickTimeMs,
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

  /**
   * 跳動數字
   * @memberof JackpotPage
   */
  tick() {
    let tickCount = this.props.tickCount;
    if (this.props.isRandom) {
      tickCount = Math.floor(Math.random() * (100));
      // 亂數跳動若為100,10 則為預設跳動數字, 因為計算只到2位數, 所屬第三位數開始不會動
      if (tickCount >= 100) {
        tickCount = this.props.tickCount;
      }
    }

    this.setState({ jackpotTotal: (this.state.jackpotTotal + tickCount) });
  }

  render() {
    this.activeJackpot = this.formater();

    const numberList = this.activeJackpot.map((pot, index) => {
      // 計算進位數
      const count = parseInt(this.activeJackpot.join('').substr(0, index + 1), 0);
      const key = index;
      return (
        <Number
          key={key}
          initCount={this.props.jackpotTotal}
          count={count}
          moveTimeMs={this.props.moveTimeMs}
        />
      );
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

        <div className="JackpotDiv">
          {
            numberList
              .insert(3, <div className="thousand" key="thousand1" />)
              .insert(7, <div className="thousand" key="thousand2" />)
              .insert(11, <div className="thousand" key="thousand3" />)
          }
        </div>
      </div>

    );
  }
}
