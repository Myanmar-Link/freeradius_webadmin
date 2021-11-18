import { Action } from '@ngrx/store';
import { PERMISSION } from 'src/app/models/permission.model';

export enum PermissionActionType {
    GET_PERMISSION = '[PERMISSION] get permission',
    SET_PERMISSION = '[PERMISSION] set permission'
}

export class GetPermissionAction implements Action {
    readonly type = PermissionActionType.GET_PERMISSION;
    constructor() { }
}

export class SetPermissionAction implements Action {
    readonly type = PermissionActionType.SET_PERMISSION;
    constructor(public payload: PERMISSION) { }
}

export type PermissionAction = GetPermissionAction | SetPermissionAction;
