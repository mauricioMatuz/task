import { TaskUserEntity } from 'src/infrastructure/Entity/taskUserEntity';
import { Rol, RolId } from '../rol';
import { RolEntityUser } from './RolEntity';
import { RolIdU } from './RolIdU';
import { TaskEntityUser } from './TaskEntityUser';
import { TaskIdU } from './TaskIdU';
import { UserCreatedAt } from './UserCreatedAt';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  id: UserId | null;
  name: UserName;
  email: UserEmail;
  rolId: RolIdU;
  // tasks: TaskIdU;
  createAt: UserCreatedAt;
  rol: RolEntityUser | null;

  constructor(
    name: UserName,
    email: UserEmail,
    createAt: UserCreatedAt,
    rolId: RolIdU,
    // taskId: TaskIdU[],
    rol?: RolEntityUser,
    // task?: TaskUserEntity[],
    id?: UserId,
  ) {
    this.id = id || null;
    this.name = name;
    this.email = email;
    this.createAt = createAt;
    this.rolId = rolId;
    // this.taskId = taskId;
    this.rol = rol || null;
    // this.task = task || null;
  }
  public nameAndEmail() {
    return `${this.name} - ${this.email}`;
  }
  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      createdAt: this.createAt.value,
      // rolId: this.rolId,
      rol: this.rol.value,
      // task: this.task.value,
    };
  }
}
