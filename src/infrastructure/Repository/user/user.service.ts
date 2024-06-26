import { InjectRepository } from '@nestjs/typeorm';
import {
  Rol,
  RolId,
  RolIdU,
  User,
  UserCreatedAt,
  UserEmail,
  UserId,
  UserName,
  UserRepository,
} from 'src/domain';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';
import { RolEntityUser } from 'src/domain/user/RolEntity';
import { MailService } from '@sendgrid/mail';
import { TaskIdU } from 'src/domain/user/TaskIdU';
import { TaskEntityUser } from 'src/domain/user/TaskEntityUser';

export class UserService implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  private mapToDomain(u: UserEntity) {
    return new User(
      new UserName(u.name),
      new UserEmail(u.email),
      new UserCreatedAt(u.createdAt),
      new RolIdU(u.rolId),
      // new TaskIdU(u.),
      new RolEntityUser(u.rol),
      // new TaskEntityUser(u.tasks),
      new UserId(u.id),
    );
  }

  public async getAll(): Promise<User[]> {
    const users = await this.repository.find({
      relations: ['rol'],
    });
    return users.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: UserId): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        id: id.value,
      },
    });

    if (!user) return null;

    return this.mapToDomain(user);
  }

  async create(user: User): Promise<UserEntity> {
    const test = await this.repository.save({
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createAt.value,
      rolId: user.rolId.value,
      // taskId: user.taskId.value,
    });
    console.log(test);
    return test
  }

  async edit(user: User): Promise<UserEntity> {
    await this.repository.update(user.id.value, {
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createAt.value,
    });
    return await this.repository.findOneBy({ id: user.id.value });
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
