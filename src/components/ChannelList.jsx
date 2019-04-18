import React from 'react';
import _ from 'lodash';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels, channelsUIState } = state;
  return { channels, channelsUIState };
};

const actionCreators = {
  changeChannel: actions.changeChannel,
};

@connect(mapStateToProps, actionCreators)
class ChannelList extends React.Component {
  handleChannelChange = channelId => (e) => {
    e.preventDefault();
    const { changeChannel } = this.props;
    changeChannel(channelId);
  };

  render() {
    const { channels, channelsUIState: { currentChannelId } } = this.props;

    const channelClasses = channelId => cn({
      btn: true,
      'btn-light': currentChannelId !== channelId,
      'btn-primary': currentChannelId === channelId,
    });

    return (
      <div className="btn-group-vertical">
        {channels.map(({ id, name }) => (
          <button type="button" key={_.uniqueId()} className={channelClasses(id)} onClick={this.handleChannelChange(id)}>
            {name}
          </button>))}
      </div>
    );
  }
}

export default ChannelList;
