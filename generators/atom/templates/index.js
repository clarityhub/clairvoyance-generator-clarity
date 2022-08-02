import React from 'react';
import classnames from 'classnames';

import { <%= atomNameLower %> } from './<%= atomName %>.scss';

export default ({ children, className }) => (
  <div className={classnames(<%= atomNameLower %>, className)}>
    {children}
  </div>
);
