import { TaskCreatedAt } from './TaskCreatedAt';
import { TaskId } from './TaskId';
import { TaskTitle } from './TaskTitle';
import { TaskUser } from './TaskUser';
import { TaskUserId } from './TaskUserId';
import { TaskDescription } from './Tastdescripción';

export class Task {
  title: TaskTitle;
  description: TaskDescription;
  id: TaskId | null;
  createdAt: TaskCreatedAt;
  userId: TaskUserId;
  user: TaskUser;
  constructor(
    title: TaskTitle,
    description: TaskDescription,
    createdAt: TaskCreatedAt,
    userId: TaskUserId,
    user: TaskUser,
    id?: TaskId,
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.userId = userId;
    this.user = user;
    this.id = id || null;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      user: this.user.value,
      createAt: this.createdAt.value,
    };
  }
}
