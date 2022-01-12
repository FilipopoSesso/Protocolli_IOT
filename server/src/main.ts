import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://test.mosquitto.org:1883'
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //this parameter removes all the invalid properties from the request
    }),
  );

  // const config = new DocumentBuilder()
  // .setTitle('Protocolli IoT')
  // .setDescription('Drones API')
  // .setVersion('1.0')
  // .addTag('Drones')
  // .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen();
}
bootstrap();
