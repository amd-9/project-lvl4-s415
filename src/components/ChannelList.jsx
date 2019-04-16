import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

const ChannelList = ({ channels, currentChannelId }) => {
  const channelClasses = channelId => cn({
    'list-group-item': true,
    active: currentChannelId === channelId,
  });

  return (
    <ul className="list-group">
      {channels.map(({ id, name }) => (
        <li key={_.uniqueId()} className={channelClasses(id)}>{name}</li>))}
    </ul>
  );
};

export default ChannelList;
