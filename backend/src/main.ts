import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microserviceGrpc = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_URL || 'localhost:20048',
      package: 'edge_agent',
      protoPath: join(__dirname, 'grpc/edge_agent.proto'),
    },
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          // Join errors together and capitalize first letter
          validationErrors.map((error: ValidationError) => {
            return Object.values(error.constraints).map((message: string) => {
              return message.charAt(0).toUpperCase() + message.slice(1);
            })
          }).join('. ') + '.'
        );
      },
    }));
  app.use(helmet());
  app.enableCors({ origin: true });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
