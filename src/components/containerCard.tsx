const ContainerCard= ({ 
  children,
}: { 
  children: React.ReactNode,
}) => {
  
  return (
    <div className="p-3 ml-1.5 mr-1.5 mt-2 shadow border-2 rounded flex flex-col justify-left items-left">
      {children}
    </div>
  );
};

export default ContainerCard;
