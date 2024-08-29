export interface IState<T = any> {
  open: boolean;
  Component: JSX.Element | null;
  modalConfig: T;
}
