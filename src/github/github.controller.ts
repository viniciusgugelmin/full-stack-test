import {Controller, Get} from '@nestjs/common';
import axios from "axios";
import {ErrorResponse, OkResponse} from "@roit/roit-response-handler/dist";

@Controller('github')
export class GithubController {

    @Get('user/:username')
    async getUser(username: string) {
        return await axios.get(`https://api.github.com/search/users?q=${username}`)
            .then(response => {
                return  response.data.items;
            })
            .catch(error => {
                console.log(error)
                return null;
            })
    }
}