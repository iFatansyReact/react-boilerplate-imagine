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
      positionY: 0,
    };

    this.preCount = 0;
    this.timerId = null;
    this.init = false;
    this.settingPositionY = { lg: -75, md: -67.5, sm: -64.5, xs: -33, default: -21 };
  }


  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.init === false || this.props.count !== nextProps.count ||
      nextState.positionY !== this.state.positionY;
  }

  componentWillUpdate() {
    // 還原動態動畫
    this.init = true;

    this.refNumber.style.transition = `background-position-y ${this.props.moveTimeMs}ms`;
  }

  componentDidUpdate() {
    // 當timerId存在時, 將舊的停止, 只執行新的
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    // 當位置移動完成時,重設位置,參考transition移動完成時間後執行
    this.timerId = setTimeout(
      () => this.reset(),
      this.props.moveTimeMs,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearTimeout(this.timerId);
  }

  /**
   * 重設位置
   * @memberof Number
   */
  reset() {
    const refNumber = this.refNumber;
    if (refNumber) {
      const resetCount = refNumber.getAttribute('data-count');
      const move = parseInt(resetCount.substr(-1, 1), 0) * this.state.positionY;
      refNumber.style.transition = '';
      refNumber.style.backgroundPositionY = `${move}px`;
    }
  }

  /**
   * 當畫面尺寸變更時觸發
   * @memberof Number
   */
  handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      if (this.state.positionY !== this.settingPositionY.lg) {
        this.setState({
          positionY: this.settingPositionY.lg,
        });
      }
    } else if (width >= 992) {
      if (this.state.positionY !== this.settingPositionY.md) {
        this.setState({
          positionY: this.settingPositionY.md,
        });
      }
    } else if (width >= 768) {
      if (this.state.positionY !== this.settingPositionY.sm) {
        this.setState({
          positionY: this.settingPositionY.sm,
        });
      }
    } else if (width >= 480) {
      if (this.state.positionY !== this.settingPositionY.xs) {
        this.setState({
          positionY: this.settingPositionY.xs,
        });
      }
    } else if (this.state.positionY !== this.settingPositionY.default) {
      this.setState({
        positionY: this.settingPositionY.default,
      });
    }
  }

  render() {
    if (this.preCount === 0) {
      this.preCount = this.props.count;
    }
    const diff = this.props.count - this.preCount; // 與上一次相差

    const preCount = this.preCount;
    const lastSize = preCount.toString().length;
    const lastInt = preCount.toString().substr(lastSize - 1, 1); // 上一次的最後一位數
    const moveCount =
      parseInt(lastInt, 0) + parseInt(diff, 0); // (上一次的最後一位數X  加上 這次的差 Y 結果為 moveCount)

    this.preCount = this.props.count;

    return (
      <div className="JackpotBox">
        <div
          className="JackpotNumber"
          data-preCount={preCount}
          data-count={this.props.count}
          ref={(input) => { this.refNumber = input; }}
          // data-moveCount={`${lastInt}+${diff}=${moveCount}`}
          style={{
            backgroundPositionY: `${moveCount * this.state.positionY}px`,
          }}
        />
      </div>

    );
  }
}
