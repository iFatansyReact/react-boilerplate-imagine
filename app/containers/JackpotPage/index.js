/*
 * JackpotPage
 *
 * List all the Jackpot
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

export default class JackpotPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
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
      </div>
    );
  }
}
