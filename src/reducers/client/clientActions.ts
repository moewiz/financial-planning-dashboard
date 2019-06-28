import {
  ClientActionTypes,
  FetchDataEntryAction,
  FetchDataEntryPayload,
  UpdateAssetsAction,
  UpdateDataEntryAction,
  UpdateDataEntryPayload,
  UpdateEmpStatus,
  UpdateMaritalStatusAction,
} from './clientTypes';
import { createPayloadAction } from '../reducerHelpers';

export default class ClientActions {
  public static fetchDataEntry = (payload: FetchDataEntryPayload): FetchDataEntryAction =>
    createPayloadAction(ClientActionTypes.FETCH_DATA_ENTRY_REQUEST, payload)
  public static updateDataEntry = (payload: UpdateDataEntryPayload): UpdateDataEntryAction =>
    createPayloadAction(ClientActionTypes.UPDATE_DATA_ENTRY_REQUEST, payload)
  public static updateMaritalStatus = (maritalStatus: string): UpdateMaritalStatusAction =>
    createPayloadAction(ClientActionTypes.UPDATE_MARITAL_STATE, maritalStatus)
  public static updateEmpStatus = (empStatus: string): UpdateEmpStatus =>
    createPayloadAction(ClientActionTypes.UPDATE_EMP_STATUS, empStatus)
  public static updateAssets = (
    assets: Array<{ refId: number; description: string; type: string }>,
  ): UpdateAssetsAction => createPayloadAction(ClientActionTypes.UPDATE_ASSETS, assets)
}
