import { ModeToggle } from "@/components/lightDark/theme-toggle";

const navStyle = {
  padding: "15px",
  margin: "10px",
  width: "90%",
  boxShadow: "var(--light-shadow)",
  border: "1px solid #ddd",
  borderRadius: "5px",
  background: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Navbar = () => {
  return (
    <div style={navStyle}>
      <h2>Navbar</h2>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
