import { TaskCreatedAt } from './TaskCreatedAt';
import { TaskId } from './TaskId';
import { TaskTitle } from './TaskTitle';
import { TaskUser } from './TaskUser';
import { TaskUserId } from './TaskUserId';
import { TaskDescription } from './Tastdescripción';
import { ItemEntiyTask } from './ItemEntityUser';
import { TaskDeadLine } from './TaskDeadLine';

export class Task {
  title: TaskTitle;
  description: TaskDescription;
  id: TaskId | null;
  createdAt: TaskCreatedAt;
  userId: TaskUserId;
  user: TaskUser;
  deadline: TaskDeadLine;
  item: ItemEntiyTask[];
  constructor(
    title: TaskTitle,
    description: TaskDescription,
    createdAt: TaskCreatedAt,
    userId: TaskUserId,
    deadline:TaskDeadLine,
    user?: TaskUser,
    id?: TaskId,
    item?: ItemEntiyTask[],
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.userId = userId;
    this.user = user;
    this.deadline = deadline
    this.id = id || null;
    this.item = item || null;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      user: this.user.value,
      item: this.item,
      createAt: this.createdAt.value,
    };
  }
}
