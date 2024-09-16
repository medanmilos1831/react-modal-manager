import { useContext, useState, useEffect } from 'react';
import { IState } from './types';
import { ModalContext } from './ModalContext';

/**
 * ModalController component.
 *
 * This component manages the state of the modal and triggers the rendering
 * of the modal based on the current state using the modalRender function.
 *
 * @param {Object} props
 * @param {Function} props.modalRender - A function that renders the modal based on the current state.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
const ModalController = ({
  modalRender,
}: {
  modalRender: (state: IState) => JSX.Element;
}) => {
  // Access the modal service from context
  const service = useContext(ModalContext);

  // State that holds the modal configuration and whether it's open
  const [state, setState] = useState<IState>({
    open: false,
    Component: null,
    modalConfig: {},
  });

  // Register the modal service with the state setter when the component mounts or updates
  useEffect(() => {
    service!.register({
      setState,
    });
  }, [state, setState]);

  // Render the modal based on the current state
  return <>{modalRender({ ...state })}</>;
};

export { ModalController };
