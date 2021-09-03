import {Controller, Get, Param} from '@nestjs/common';
import axios from "axios";
import {ErrorResponse} from "@roit/roit-response-handler/dist";

@Controller('postal-code')
export class PostalCodeController {

    @Get(':postalCode')
     async getCep(@Param('postalCode') postalCode: number) {
        return await axios.get(`https://viacep.com.br/ws/${postalCode}/json/unicode/`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return ErrorResponse('Incorrect postal code');
            })
    }
}