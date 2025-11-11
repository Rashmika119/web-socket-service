import { Injectable, Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';


import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors:{origin:'*'}})
export class SocketService implements OnGatewayConnection,OnGatewayDisconnect{
  @WebSocketServer()
  server:Server;

  private readonly logger=new Logger(SocketService.name);


handleConnection(client: Socket){
  console.log("Client conneted: ",client.id);
  client.on('registerClient', (clientName: string) => {
    client.join(clientName);
    this.logger.log(`Client ${client.id} registered to room: ${clientName}`);
    client.emit('registered',{clientName,socketId:client.id});
  });
}
    handleDisconnect(client: Socket) {
      this.logger.log(`Client ${client.id} disconnected`);
      this.logger.log('Socket disconnected', client.id);
    
  }
 
  sendJobNotification(clientName:string,payload:any){

    if(!clientName || !payload){
      this.logger.warn('Cannot send notification, missing clientName or payload');
      return;
    }

    const room=this.server.sockets.adapter.rooms.get(clientName);
    if(!room){
      this.logger.warn(`Room ${clientName} does not exist. Notification not sent.`);
      return;
    }

    this.logger.log(`Sending notification to room: ${clientName}`, payload);
    this.server.to(clientName).emit('jobCompleted', payload);
    this.logger.log(`Notification sent to room: ${clientName}`);
    
  }
  
  
}
