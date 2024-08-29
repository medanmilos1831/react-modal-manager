import { IState } from './types';

class ModalService {
  private static instance: ModalService;
  private setState!: React.Dispatch<React.SetStateAction<IState>>;

  private constructor() {}

  public static getInstance(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }
    return ModalService.instance;
  }

  openModal = <T extends {}>(
    Component: IState['Component'],
    modalConfig?: IState<T>['modalConfig']
  ) => {
    this.setState((prev) => {
      return {
        ...prev,
        open: true,
        Component,
        modalConfig: modalConfig ?? {},
      };
    });
  };

  closeModal = () => {
    this.setState((prev) => {
      return {
        ...prev,
        open: false,
        Component: null,
      };
    });
  };
  register = ({
    setState,
  }: {
    setState: React.Dispatch<React.SetStateAction<IState>>;
  }) => {
    this.setState = setState;
  };
}

export { ModalService };
