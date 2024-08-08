const Card = ({ children }: { children: React.ReactNode }) => {
  const cardStyle = {
    padding: "100px",
    margin: "10px",
    boxShadow: "var(--light-shadow)",
    border: "1px solid #ddd",
    borderRadius: "5px",
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return <div style={cardStyle}>{children}</div>;
};

export default Card;
