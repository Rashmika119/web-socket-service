import { Module } from '@nestjs/common';
// import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketService],
})
export class AppModule {}
