/*
 * JackpotPage Number
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Number extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    moveTimeMs: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      reset: 0,
    };

    this.preCount = 0;
  }

  componentWillUpdate() {
    // 還原動態動畫
    this.refs.refNumber.style.transition = `background-position-y ${this.props.moveTimeMs}ms`;
  }

  componentDidUpdate() {
    // 當位置移動完成時,重設位置,參考transition移動完成時間後執行
    setTimeout(
      () => this.reset(),
      this.props.moveTimeMs,
    );
  }

  /**
   * 重設位置
   * @memberof Number
   */
  reset() {
    const refNumber = this.refs.refNumber;
    const resetCount = refNumber.getAttribute('data-count');
    const move = parseInt(resetCount.substr(-1, 1), 0) * -75;
    refNumber.style.transition = '';
    refNumber.style.backgroundPositionY = `${move}px`;
  }

  render() {
    if (this.preCount === 0) {
      this.preCount = this.props.count;
    }
    const diff = this.props.count - this.preCount; // 與上一次相差

    const preCount = this.preCount;
    const lastSize = preCount.toString().length;
    const lastInt = preCount.toString().substr(lastSize - 1, 1); // 上一次的最後一位數
    const moveCount = parseInt(lastInt, 0) + parseInt(diff, 0); // (上一次的最後一位數X  加上 這次的差 Y 結果為 moveCount)

    this.preCount = this.props.count;

    return (
      <div
        className="JackpotNumber"
        data-preCount={preCount}
        data-count={this.props.count}
        ref="refNumber"
        // data-moveCount={`${lastInt}+${diff}=${moveCount}`}
        style={{
          backgroundPositionY: `${moveCount * -75}px`,
        }}
      />

    );
  }
}
