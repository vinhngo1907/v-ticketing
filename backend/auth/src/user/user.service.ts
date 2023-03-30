import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserDTO } from './user.dto';
import { DatabaseService } from 'src/database/database.service';

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
			// const user = await user
		} catch (err: any) {
			throw err;
		}
	}

	async update(id: number, data: UserDTO) {
		try {
			const user = await this.databaseService.user.findUnique({ where: { id: id } });
			if (!user) {

			}
			const updatedUser = await this.databaseService.user.update({
				where: { id: id }, data: {
					...data
				}
			});

			return updatedUser;
		} catch (err: any) {
			throw err;
		}
	}
}

