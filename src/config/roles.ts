const allRoles = {
  user: ["createTasks", "listTasks"],
  admin: ["getUsers", "createTasks", "manageUsers", "listTasks"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export {roles, roleRights};
