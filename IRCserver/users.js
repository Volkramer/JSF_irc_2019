function User(id, socket, nickname) {
  this.socket = socket;
  this.nickname = nickname;
}

module.exports = User;
