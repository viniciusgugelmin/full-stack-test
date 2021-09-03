import {Controller, Get, Header, Render, Res} from '@nestjs/common';
import {AppService} from './app.service';
import {Response} from "express";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('')
    root(@Res() res: Response) {
        return res.render(
            this.appService.getViewName(),
            {message: 'Hello World!'}
        )
    }
}
