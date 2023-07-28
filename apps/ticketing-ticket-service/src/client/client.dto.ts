import { IsString } from "class-validator";


export class ClientDTO {

    @IsString()
    raison_social: string;

    @IsString()
    num_sirette: string;

    // @IsString()
    // address: string;

    @IsString()
    email: string;

    @IsString()
    telephone: string;
}
