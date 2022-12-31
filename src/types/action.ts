import { ActionModel, UserModel } from '@prisma/client';

export type TUsersActions = (UserModel & { actions: ActionModel[] }) | null | ActionModel[];
