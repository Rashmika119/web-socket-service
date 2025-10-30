import { Body, Controller, Post } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller('socket') 
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Post('notify') 
  async notify(@Body() body: any) {
    console.log('Received notification HTTP POST:', body);

    const { clientName, jobId, fileUrl, message } = body;
    
    if (!clientName || !jobId) {
      console.error('Missing required fields');
      return { status: 'ERROR', message: 'clientName and jobId are required' };
    }

    const payload = { jobId, fileUrl, message, timestamp: Date.now() };
    
    console.log(`Sending to room "${clientName}":`, payload);
    this.socketService.sendJobNotification(clientName, payload);

    return { status: 'OK' };
  }
}