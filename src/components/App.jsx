import React from 'react';
import { render } from 'react-dom';
import ChannelList from './ChannelList';

const app = ({ channels }) => {
  render(<ChannelList list={channels} />,
    document.getElementById('channel-list'));
};

export default app;
