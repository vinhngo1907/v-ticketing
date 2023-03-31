import { Injectable, OnModuleInit, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserDTO } from './user.dto';
import { DatabaseService } from 'src/database/database.service';
import { from } from 'rxjs';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class UserService implements OnModuleInit {
	private loggerService: Logger
	constructor(
		private httpService: HttpService,
		private databaseService: DatabaseService,
		private kafkaService: KafkaService
	) {
		this.loggerService = new Logger();
	}

	async onModuleInit() {
		try {
			// ----------------- listening on topic update profile user --------------- //
			const consumerProfileUser = this.kafkaService.GetUser('auth-microservice-profile');
			await consumerProfileUser.connect();
			await consumerProfileUser.subscribe({
				topic: 'update_profile_auth',
				fromBeginning: true
			});
		} catch (err) {
			this.loggerService.error("An error while init the module exchange", err);
		}
	}
	showAll(
		page: number = 1,
		limit: number = 10,
		status: string = undefined,
		order_by: string = 'desc'
	) {
		if (limit < 0 || page < 1) {
			throw new HttpException(
				'Limit or page is invalid',
				HttpStatus.BAD_REQUEST,
			);
		}
		const filterObj = {
			status: status
		};
		let obj = Object.keys(filterObj).length >= 1 ? {...filterObj} : {}
		
		return from(this.databaseService.user.findMany({
			where: obj,
			take: Number(limit),
			skip: (Number(page) - 1) * Number(limit),
			orderBy: {
				id: order_by === 'desc' ? 'desc' : 'asc',
			},
		}))
	}
	async register(data: UserDTO) {
		try {
			const { username, password } = data;
			const user = await this.databaseService.user.findUnique({
				where: {
					username: username,
				}
			});
			if (user) {
				throw new HttpException('This user already exists', HttpStatus.BAD_REQUEST);
			}

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
				where: {
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
	async delete(id: number) {
		try {
			const deletedUser = await this.databaseService.user.delete({
				where: { id: id }
			});

			if (!deletedUser) {
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}

			return deletedUser;
		} catch (err: any) {
			throw err;
		}
	}

	async block(id: number) {
		try {
			const blockedUser = await this.databaseService.user.update({
				where: { id: id },
				data: {
					status: 'inactive'
				}
			});
			if (!blockedUser) {
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}

			return blockedUser;
		} catch (err: any) {
			console.log(err);
			throw err;
		}
	}
}

