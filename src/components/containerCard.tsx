const ContainerCard= ({ 
  children,
}: { 
  children: React.ReactNode,
}) => {
  
  return (
    <div className="p-3 m-2.5 shadow border-2 rounded flex flex-col justify-left items-left">
      {children}
    </div>
  );
};

export default ContainerCard;
