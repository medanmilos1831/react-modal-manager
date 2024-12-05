import { Button, Drawer } from 'antd'; // Importing Ant Design components
import { CompanyDrawer } from 'src/overlays'; // Importing the custom CompanyDrawer component
import { OverlayProvider, useOverlay } from '../OverlayProvider'; // Importing OverlayProvider and useOverlay hook

const HomePage = () => {
  const overlayHandler = useOverlay(); // Using the useOverlay hook to manage overlay state
  console.log('*****RENDER HOME*****'); // Logging render for debugging purposes

  return (
    <div>
      <div>
        <h1>Home Page</h1> {/* Displaying the title of the page */}
      </div>

      {/* This Item component is used to manage the visibility and state of the "homePageDrawer" overlay */}
      <OverlayProvider.Item overlayName="homePageDrawer">
        {({ open, overlayData, overlayHandler }) => {
          return (
            <Drawer
              open={open} // Controls whether the drawer is open or closed
              onClose={() => {
                // Closing the drawer when the close button is clicked
                overlayHandler({
                  overlayName: 'homePageDrawer',
                  open: false, // Setting the overlay to closed
                });
              }}
            >
              {/* The CompanyDrawer component is rendered inside the Drawer with the passed overlayData */}
              <CompanyDrawer {...overlayData} />
            </Drawer>
          );
        }}
      </OverlayProvider.Item>

      {/* Button to trigger the opening of the "homePageDrawer" */}
      <Button
        type="primary" // Primary button style
        onClick={() => {
          // Opening the "homePageDrawer" and passing the necessary data when the button is clicked
          overlayHandler({
            overlayName: 'homePageDrawer',
            open: true, // Setting the overlay to open
            overlayData: {
              id: 1,
              companyName: 'Sony', // Example data to be passed to the drawer
            },
          });
        }}
      >
        Open Home page Drawer
      </Button>
    </div>
  );
};

export { HomePage };
