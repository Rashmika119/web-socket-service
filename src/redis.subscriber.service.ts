// import { Injectable, OnModuleInit } from "@nestjs/common";
// import Redis from "ioredis";
// import { SocketService } from "./socket.service";

// @Injectable()
// export class RedisSubscriberService implements OnModuleInit{
//     private redisSubscriber:Redis

//     constructor(private readonly socketService:SocketService){}

//     onModuleInit(){
//         this.redisSubscriber=new Redis({ host: 'localhost', port: 6379 });
//         this.redisSubscriber.subscribe('job_notifications',(err,count)=>{
//             if(err) console.error('Redis subscription error: ',err);
//             else console.log("Subscribed to job notifications chanel");;
//         })
//         console.log("inside redis subscriber.......")

//         this.redisSubscriber.on('message',(channel,message)=>{
//             try{
//                 const data=JSON.parse(message);
//                 const{clientName,jobId,fileUrl,message:msg}=data;
//                 console.log("data  :",data);
//                 console.log("channel: ",channel)

//                 this.socketService.sendJobNotification(clientName,{
//                     jobId,
//                     fileUrl,
//                     message:msg,
//                     timestamp:Date.now(),
//                 })
//             }catch(err){
//                 console.error('Error parsing Redis message: ',err)
//             }
//         })
//     }
// }