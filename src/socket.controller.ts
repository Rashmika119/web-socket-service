import { Body, Controller, Get, Post } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller('socket')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

@Post('/notify')
notify(@Body() body:{clientId:string;jobId:string;fileUrl?:string;message?:string}){
  const{clientId,jobId,fileUrl,message}=body

  const payload={jobId,fileUrl,message,timestamp:Date.now()};
  this.socketService.sendJobNotification(clientId,payload);
  return{status:'OK'};
}
}
