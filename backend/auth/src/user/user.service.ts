import { Injectable, OnModuleInit, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserDTO } from './user.dto';
import { DatabaseService } from 'src/database/database.service';
import { from } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
	private loggerService: Logger
	constructor(
		private httpService: HttpService,
		private databaseService: DatabaseService
	) {
		this.loggerService = new Logger();
	}
	async onModuleInit() {
		try {
			// ----------------- listening on topic update status exchange qoc --------------- //

		} catch (err) {
			this.loggerService.error("An error while init the module exchange", err);
		}
	}
	 showAll(){
		// const users = await this.databaseService.user.findMany();
		// console.log({users});
		return from(this.databaseService.user.findMany())
	}
	async register(data: UserDTO) {
		try {
			const { username, password } = data;
			
			const newUser = await this.databaseService.user.create({
				data: {
					username,
					password,
				}
			});

			return newUser;
		} catch (err: any) {
			throw err;
		}
	}

	async login(data: UserDTO) {
		try {
			const { username, password } = data;
			const user = await this.databaseService.user.findUnique({
				where:{
					// username: username
				}
			})
		} catch (err: any) {
			throw err;
		}
	}

	async update(id: number, data: UserDTO) {
		try {
			const updatedUser = await this.databaseService.user.update({
				data: {
					...data
				},
				where: {
					id: id
				}
			});

			if (!updatedUser) {
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}
			return updatedUser;
		} catch (err: any) {
			throw err;
		}
	}
	async delete(id: number){
		try{
			const deletedUser = await this.databaseService.user.delete({
				where: {id: id}
			});

			if(!deletedUser){
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}
			
			return deletedUser;
		}catch(err: any){
			throw err;
		}
	}
}

