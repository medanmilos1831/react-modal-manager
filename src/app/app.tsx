import { Button, Modal } from 'antd'; // Importing Ant Design components
import { OverlayProvider } from '../OverlayProvider'; // Importing OverlayProvider to manage overlay state
import { PersonModal } from 'src/overlays'; // Importing the modal component to display inside the Modal
import { HomePage } from 'src/pages/HomePage';

const App = () => {
  console.log('*****RENDER APP*****');
  return (
    // Wrapping the entire app with OverlayProvider to manage overlay state
    <OverlayProvider>
      {/* This Item component is used to manage a specific overlay (in this case, "personModal") */}
      <OverlayProvider.Item overlayName="personModal">
        {({ open, overlayData, overlayHandler }) => {
          return (
            <Modal
              open={open} // Controls whether the modal is open or closed
              onCancel={() => {
                // Close the modal when the cancel button is clicked
                overlayHandler({
                  overlayName: 'personModal',
                  open: false, // Setting overlay to closed
                });
              }}
              onOk={() => {
                // Close the modal when the OK button is clicked
                overlayHandler({
                  overlayName: 'personModal',
                  open: false, // Setting overlay to closed
                });
              }}
            >
              {/* The PersonModal component is passed the overlayData to be displayed */}
              <PersonModal {...overlayData} />
            </Modal>
          );
        }}
      </OverlayProvider.Item>

      {/* The Handler component is used to trigger the opening of the overlay */}
      <OverlayProvider.Handler>
        {(overlayHandler) => {
          return (
            <Button
              onClick={() => {
                // Opening the modal and passing data when the button is clicked
                overlayHandler({
                  overlayName: 'personModal',
                  open: true, // Setting the overlay to open
                  overlayData: {
                    id: 1,
                    fname: 'John', // Example data to be passed to the modal
                  },
                });
              }}
            >
              Open APP modal
            </Button>
          );
        }}
      </OverlayProvider.Handler>
      <HomePage />
    </OverlayProvider>
  );
};

export { App };
