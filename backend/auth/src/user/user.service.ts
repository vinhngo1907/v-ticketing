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
		} catch (err) {
			throw err;
		}
	}
}

