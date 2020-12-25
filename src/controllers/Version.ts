import { Controller, Get } from "@tsed/common";
import { Summary } from "@tsed/schema";
import config from '../../package.json';

@Controller("/")
export class AppController {
  @Get("/version")
  @Summary("Service Version")
  version() {
    return config.version;
  }
}