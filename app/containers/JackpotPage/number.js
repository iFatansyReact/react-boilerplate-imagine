/*
 * JackpotPage
 *
 * List all the Jackpot
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Number extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    count: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      reset: 0,
    };

    this.preCount = 0;
  }

  // componentWillUpdate() {

  // }

  render() {
    if (this.preCount === 0) {
      this.preCount = this.props.count;
    }
    const diff = this.props.count - this.preCount; // 與上一次相差

    const preCount = this.preCount;
    const lastSize = preCount.toString().length;
    const lastInt = preCount.toString().substr(lastSize - 1, 1); // 上一次的最後一位數
    const moveCount = parseInt(lastInt, 0) + parseInt(diff, 0);

    this.preCount = this.props.count;
    return (
      <div
        className="JackpotNumber"
        data-preCount={preCount}
        data-count={this.props.count}
        // data-diff={diff}
        // data-lastInt={lastInt}
        // data-size={lastSize}
        data-moveCount={`${lastInt}+${diff}=${moveCount}`}
        style={{
          backgroundPositionY: `${moveCount * -75}px`,
        }}
      />

    );
  }
}
