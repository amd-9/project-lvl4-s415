const apiPrefix = 'api/v1';

export default {
  channelMessagesPath: channelId => `/${apiPrefix}/channels/${channelId}/messages`,
  channelsPath: () => `/${apiPrefix}/channels`,
  channelPath: id => `/${apiPrefix}/channels/${id}`,
};
