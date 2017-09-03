import React from 'react';
import PropTypes from 'prop-types';


export default class Item extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = { level: PropTypes.number, id: PropTypes.number };

  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level,
    };
  }

  render() {
    const className = `item level${this.props.level}`;
    return (
      <div className={className}>
        {this.props.id}
      </div>
    );
  }
}
