/*
 * BannerPage
 *
 * List all the Banner
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
// import PropTypes from 'prop-types';
// import Immutable from 'immutable';

import H1 from 'components/H1';
// import styled from 'styled-components';
import messages from './messages';
import style from './style.scss';
// const Styles = require('./style.css');
import Item from './item';

export default class BannerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      active: 0,
      direction: '',
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }

  generateItems() {
    const items = [];
    let level;
    console.log(this.state.active);
    for (let i = this.state.active - 2; i < this.state.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }
      level = this.state.active - i;
      items.push(<Item key={index} id={this.state.items[index]} level={level} />);
    }
    return items;
  }

  moveLeft() {
    let newActive = this.state.active;
    newActive -= 1;
    this.setState({
      active: newActive < 0 ? this.state.items.length - 1 : newActive,
      direction: 'left',
    });
  }

  moveRight() {
    const newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.state.items.length,
      direction: 'right',
    });
  }


  render() {
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


        <div className={style.bannerPage} style={{ position: 'relative', height: '220px' }}>
          <div id="carousel" className="noselect">
            <div className="arrow arrow-left" onClick={this.leftClick}><i className="fi-arrow-left"></i></div>
            <ReactCSSTransitionGroup
              transitionName={this.state.direction}
            >
              {this.generateItems()}
            </ReactCSSTransitionGroup>
            <div className="arrow arrow-right" onClick={this.rightClick}><i className="fi-arrow-right"></i></div>
          </div>
        </div>

      </div>


    );
  }
}
