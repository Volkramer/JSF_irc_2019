import { Observable, observable } from 'rxjs';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(data) {
    this.socket.emit('new-message', data);
  }

  public joinChannel(data) {
    this.socket.emit('join-channel', data);
  }

  public leaveChannel(data) {
    this.socket.emit('leave-channel', data);
  }

  public newNickname(data) {
    this.socket.emit('nickname', data);
  }

  /* public getMessage = () => {
    const observable = new Observable((observer) => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }; */
}
