import {Controller, Get} from "@tsed/common";
import pkg from '../../package.json';

@Controller("/version")
export class HelloWorldController {
  @Get("/")
  get() {
    return pkg.version;
  }
}
