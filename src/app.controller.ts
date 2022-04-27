import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HelloBody } from './validators/hello.body';

@ApiTags('test')
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // TODO: wrap interceptor like papi does for routing controllers to use representers & swagger in 1 decorator
  // https://github.com/Panenco/papi/blob/main/src/decorators/representer.decorator.ts
  // https://docs.nestjs.com/interceptors#binding-interceptors
  // https://docs.nestjs.com/techniques/serialization

  @Post()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() helloBody: HelloBody) {
    return helloBody;
  }
}
