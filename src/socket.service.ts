import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';


import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors:{origin:'*'}})
export class SocketService implements OnGatewayConnection,OnGatewayDisconnect{
  @WebSocketServer()
  server:Server;


  handleConnection(client:Socket){
  client.on('registerClient', (clientId: string) => {
    client.join(clientId);
    console.log(`Client registered to room: ${clientId}`);
  });
  }
    handleDisconnect(client: Socket) {
    console.log('Socket disconnected', client.id);
    
  }

 
  sendJobNotification(clientId:string,payload:any){

      this.server.to(clientId).emit('jobCompleted', payload);
    
  }
  
  
}
