import { PERMISSION } from "src/app/models/permission.model";
import { PermissionAction, PermissionActionType } from "../actions/permission.actions";

export interface PERMISSION_STATE {
    permission: PERMISSION,
    error: string | any
}

const initialState: PERMISSION_STATE = {
    permission: {
        read: false,
        write: false,
        edit: false,
        del: false
    },
    error: null
}

export function PermissionReducer(state: PERMISSION_STATE = initialState, action: PermissionAction) {

    console.log(action);

    switch(action.type) {
        case PermissionActionType.GET_PERMISSION:
            return {
                ...state,
                permission: action.type
            }
        case PermissionActionType.SET_PERMISSION:
                return {
                    ...state,
                    permission: action.payload
                }
        default:
            return state
    }
}