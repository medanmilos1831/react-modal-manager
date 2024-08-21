import { ModalManagerHandler } from 'src/ModalManagerProvider';
const Hello = () => {
  console.log('renderrrrr');
  return <>Hello</>;
};
const ProductsPage = () => {
  console.log('ProductsPage render');
  return (
    <>
      <ModalManagerHandler
        render={({ open }: any) => {
          return (
            <button
              type="button"
              onClick={() => {
                open({
                  Component: <Hello />,
                });
              }}
            >
              open modal
            </button>
          );
        }}
      ></ModalManagerHandler>
    </>
  );
};

export { ProductsPage };
