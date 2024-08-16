const Card = ({ 
  children,
}: { 
  children: React.ReactNode,
}) => {

  return (
    <div className="mt-2 rounded border p-2 flex flex-col shadow-md shadow-gray-500 items-left justify-center hover:cursor-pointer hover:bg-gray-200">
      {children}
    </div>
  );
};

export default Card;
