export interface IManager {
  open: boolean;
  Component: JSX.Element | null;
  modalConfig: any;
}

export interface IModalManagerProvider {
  modalRender: (obj: { manager: IManager }) => JSX.Element;
}

export interface IModalManagerContext {
  manager: IManager;
  setManager: React.Dispatch<React.SetStateAction<IManager>>;
}

export type modalManagerHanderParam<T> = {
  open: (params: { Component: JSX.Element | null; modalConfig?: T }) => void;
  close: () => void;
};

export interface IModalManagerHandler<T> {
  render: (obj: modalManagerHanderParam<T>) => JSX.Element;
}
