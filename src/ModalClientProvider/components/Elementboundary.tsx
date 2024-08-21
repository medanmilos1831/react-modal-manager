const Elementboundary = ({
  errMsg = 'Niste definisali element!',
}: {
  errMsg?: string;
}) => {
  return (
    <>
      <span>{errMsg}</span>
    </>
  );
};

export { Elementboundary };
