import React from 'react';
import _ from 'lodash';

const ChannelList = ({ list }) => (
  <ul>
    {list.map(({ name }) => <li key={_.uniqueId()}>{name}</li>)}
  </ul>
);

export default ChannelList;
