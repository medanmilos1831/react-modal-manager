export type openModalType = <T = {}>(
  Component: (props: ExtendableProps<T>) => JSX.Element,
  props?: T,
  modalConfig?: any
) => void;
export type closeModalType = () => void;

export interface IState {
  Component: (props: any) => JSX.Element;
  props: any;
  open: boolean;
}

interface IElementProps {
  closeModal: closeModalType;
}

export type ExtendableProps<T = {}> = IElementProps & T;

export type modalRender = (obj: {
  open: boolean;
  Component: (props: any) => JSX.Element;
  props: any;
  modalConfig: any;
  closeModal: () => void;
}) => JSX.Element;

export interface IModalContext {
  openModal: openModalType;
  closeModal: closeModalType;
  Modal: modalRender;
  state: IState;
  modalConfigRef: any;
}
