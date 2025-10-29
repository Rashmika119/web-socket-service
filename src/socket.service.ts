import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';


import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors:{origin:'*'}})
export class SocketService implements OnGatewayConnection,OnGatewayDisconnect{
  @WebSocketServer()
  server:Server;


handleConnection(client: Socket){
  console.log("Client conneted: ",client.id);
  client.on('registerClient', (clientName: string) => {
    client.join(clientName);
    console.log(`Client ${client.id} registered to room: ${clientName}`);
    client.emit('registered',{clientName,socketId:client.id});
  });
}
    handleDisconnect(client: Socket) {
      console.log(`Client ${client.id} disconnected`);
    console.log('Socket disconnected', client.id);
    
  }
 
  sendJobNotification(clientName:string,payload:any){
    console.log(`Sending notification to room: ${clientName}`, payload);
    this.server.to(clientName).emit('jobCompleted', payload);
    console.log(`Notification sent to room: ${clientName}`);
    
  }
  
  
}
