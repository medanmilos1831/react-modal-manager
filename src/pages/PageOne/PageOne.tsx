import {
  ExtendableProps,
  ModalClientProvider,
} from '../../ModalClientProvider';

const Product = ({ price, closeModal }: ExtendableProps<{ price: number }>) => {
  console.log('closeModal', closeModal);
  console.log('price', price);
  return (
    <>
      Product Modal
      <button onClick={closeModal}>close modal</button>
    </>
  );
};

const ProductsPage = () => {
  return (
    <>
      <ModalClientProvider.Modal />
      <ModalClientProvider.ModalHandler>
        {({ openModal, closeModal }) => {
          return (
            <button
              onClick={() => {
                openModal(
                  Product,
                  {
                    price: 100,
                  },
                  {
                    width: 1000,
                  }
                );
              }}
            >
              click me
            </button>
          );
        }}
      </ModalClientProvider.ModalHandler>
      <div>{/* some content */}</div>
      <div>{/* some content */}</div>
      <div>{/* some content */}</div>
      <div>{/* some content */}</div>
    </>
  );
};

export { ProductsPage };
