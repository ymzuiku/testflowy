import { createTask } from "./_createTask";
import { deleteTask } from "./_deleteTask";
import { getTaskDetail } from "./_getTaskDetail";
import { getTaskDetails } from "./_getTaskDetails";
import { getTasks } from "./_getTasks";
import { updatePassTask } from "./_updatePassTask";
import { updateTask } from "./_updateTask";

createTask.POST = true;
getTasks.POST = true;
deleteTask.DELETE = true;
getTaskDetails.POST = true;
getTaskDetail.POST = true;
updateTask.PATCH = true;
updatePassTask.PATCH = true;

export { getTasks, createTask, deleteTask, getTaskDetail, getTaskDetails, updateTask, updatePassTask };
