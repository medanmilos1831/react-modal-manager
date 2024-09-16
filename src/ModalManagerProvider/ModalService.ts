import { IState } from './types';

/**
 * ModalService class.
 *
 * A singleton service that handles opening and closing modals. This service
 * manages the modal state and provides methods to manipulate the modal state.
 */
class ModalService {
  private static instance: ModalService;
  private setState!: React.Dispatch<React.SetStateAction<IState>>;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  /**
   * Retrieves the singleton instance of ModalService.
   *
   * @returns {ModalService} The instance of the modal service.
   */
  public static getInstance(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }
    return ModalService.instance;
  }

  /**
   * Opens the modal with the specified component and configuration.
   *
   * @param {IState['Component']} Component - The component to display in the modal.
   * @param {IState['modalConfig']} [modalConfig] - Optional configuration for the modal.
   */
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

  /**
   * Closes the modal and resets its state.
   */
  closeModal = () => {
    this.setState((prev) => {
      return {
        ...prev,
        open: false,
        Component: null,
      };
    });
  };

  /**
   * Registers the state setter for managing modal state.
   *
   * @param {Object} param - The object containing the setState function.
   * @param {React.Dispatch<React.SetStateAction<IState>>} param.setState - The function to update the modal state.
   */
  register = ({
    setState,
  }: {
    setState: React.Dispatch<React.SetStateAction<IState>>;
  }) => {
    this.setState = setState;
  };
}

export { ModalService };
