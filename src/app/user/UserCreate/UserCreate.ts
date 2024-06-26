import { RolIdU } from 'src/domain';
import { RolEntityUser } from 'src/domain/user/RolEntity';
import { TaskEntityUser } from 'src/domain/user/TaskEntityUser';
import { TaskIdU } from 'src/domain/user/TaskIdU';
import { UserCreatedAt } from 'src/domain/user/UserCreatedAt';
import { UserEmail } from 'src/domain/user/UserEmail';
import { UserId } from 'src/domain/user/UserId';
import { UserName } from 'src/domain/user/UserName';
import { User } from 'src/domain/user/user';
import { UserRepository } from 'src/domain/user/userRepository';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class UserCreate {
  constructor(private repository: UserRepository) {}

  async run(
    name: string,
    email: string,
    createdAt: Date,
    rolId: number,
    rol?: RolEntityUser,
    id?: number,
  ): Promise<UserEntity> {
    const user = new User(
      new UserName(name),
      new UserEmail(email),
      new UserCreatedAt(createdAt),
      new RolIdU(rolId),
      rol ? new RolEntityUser(rol.value) : null,
      new UserId(id),
    );

    return await this.repository.create(user);
  }
}
