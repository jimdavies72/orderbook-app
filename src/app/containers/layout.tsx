
const ContainersLayout = ({
  children,
  suppliertab
}: {
  children: React.ReactNode;
  suppliertab: React.ReactNode;
}) => {
  return (
    <main>
      <div>
        {children}
      </div>
      <div>
        {suppliertab}
      </div>
      
    </main>
  );
};

export default ContainersLayout;