function Message(content, nickname, channelName) {
  this.content = content;
  this.nickname = nickname;
  this.channel = channelName;
  this.dateTime = now.format('isoDateTime');
}

module.exports = Message;
