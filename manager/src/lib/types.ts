export enum CommonActionType {
  OPERATION_ERROR,
  OPERATION_SUCCESS
}

export type IAction = {
  type: string;
  data: any;
};

export type IOption<T> = {
  label: string;
  value: T;
};
