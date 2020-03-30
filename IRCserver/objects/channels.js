function Channels(name, creator) {
  this.name = name;
  this.creator = creator;
  this.users = [];
  this.moderators = [];
}

Channels.prototype.addUser = function(user) {
  this.users.push(user);
};

Channels.prototype.removeUser = function(user) {
  for (let i = 0; i < this.users.length; i++) {
    if ((this.users[i].id = user.id)) {
      this.users.splice(i, 1);
    }
  }
  return;
};

Channels.prototype.addModerator = function(user) {
  this.users.push(user);
};

Channels.prototype.removeModerator = function(user) {
  for (let i = 0; i < this.users.length; i++) {
    if ((this.users[i].id = user.id)) {
      this.users.splice(i, 1);
    }
  }
};

module.exports = Channels;
