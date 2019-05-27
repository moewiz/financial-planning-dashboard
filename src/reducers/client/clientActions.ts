import {
  ClientActionTypes,
  FetchDataEntryAction,
  FetchDataEntryPayload,
  UpdateMaritalStateAction,
  UpdateAssetsAction,
  UpdateEmpStatus,
} from './clientTypes';
import { createPayloadAction } from '../reducerHelpers';

export default class ClientActions {
  public static fetchDataEntry = (payload: FetchDataEntryPayload): FetchDataEntryAction =>
    createPayloadAction(ClientActionTypes.FETCH_DATA_ENTRY_REQUEST, payload)
  public static updateMaritalState = (maritalState: string): UpdateMaritalStateAction =>
    createPayloadAction(ClientActionTypes.UPDATE_MARITAL_STATE, maritalState)
  public static updateEmpStatus = (empStatus: string): UpdateEmpStatus =>
    createPayloadAction(ClientActionTypes.UPDATE_EMP_STATUS, empStatus)
  public static updateAssets = (
    assets: Array<{ refId: number; description: string; type: string }>,
  ): UpdateAssetsAction => createPayloadAction(ClientActionTypes.UPDATE_ASSETS, assets)
}
