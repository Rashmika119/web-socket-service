import { Module } from '@nestjs/common';
// import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';

@Module({
  imports: [],
  controllers: [SocketController],
  providers: [SocketService],
})
export class AppModule {}
