import { RolIdU } from 'src/domain';
import { Password } from 'src/domain/user/Password';
import { RolEntityUser } from 'src/domain/user/RolEntity';
import { UserCreatedAt } from 'src/domain/user/UserCreatedAt';
import { UserEmail } from 'src/domain/user/UserEmail';
import { UserId } from 'src/domain/user/UserId';
import { UserName } from 'src/domain/user/UserName';
import { User } from 'src/domain/user/user';
import { UserRepository } from 'src/domain/user/userRepository';
import { UserEntity } from 'src/infrastructure/Entity/userEntity';

export class UserEdit {
  constructor(private repository: UserRepository) {}

  async run(
    id: number,
    name: string,
    email: string,
    createdAt: Date,
    rolId: number,
    password: string,
    rol?: RolEntityUser,
  ): Promise<UserEntity> {
    const user = new User(
      new UserName(name),
      new UserEmail(email),
      new UserCreatedAt(createdAt),
      new RolIdU(rolId),
      new Password(password),
      rol ? new RolEntityUser(rol.value) : null,
      new UserId(id),
      // new TaskIdU(taskId),
    );

    return this.repository.edit(user);
  }
}
