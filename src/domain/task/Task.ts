import { TaskCreatedAt } from './TaskCreatedAt';
import { TaskId } from './TaskId';
import { TaskTitle } from './TaskTitle';
import { TaskDescription } from './Tastdescripción';

export class Task {
  title: TaskTitle;
  description: TaskDescription;
  id: TaskId | null;
  createdAt: TaskCreatedAt;
  constructor(
    title: TaskTitle,
    description: TaskDescription,
    createdAt: TaskCreatedAt,
    id?: TaskId,
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.id = id || null;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      createAt: this.createdAt.value,
    };
  }
}
