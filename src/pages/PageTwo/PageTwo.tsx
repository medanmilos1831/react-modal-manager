const ModalComponent = () => {
  return <>ModalComponent</>;
};

const PageTwo = () => {
  let x = 1;
  return (
    <></>
    // <ModalManagerProvider
    //   modalRender={({ manager }) => {
    //     return (
    //       <Modal open={manager.open} {...manager.modalConfig}>
    //         <>{manager.Component}</>
    //       </Modal>
    //     );
    //   }}
    // >
    //   <div>
    //     PageTwo
    //     <ModalManager<Omit<ModalProps, 'open' | 'children'>>>
    //       {({ open, close }) => {
    //         return (
    //           <button
    //             type="button"
    //             onClick={() => {
    //               x = x + 1;
    //               if (x === 3) {
    //                 open({
    //                   Component: <ModalComponent />,
    //                   modalConfig: {
    //                     onClose() {
    //                       close();
    //                     },
    //                   },
    //                 });
    //               }
    //             }}
    //           >
    //             open modal
    //           </button>
    //         );
    //       }}
    //     </ModalManager>
    //   </div>
    // </ModalManagerProvider>
  );
};

export { PageTwo };
