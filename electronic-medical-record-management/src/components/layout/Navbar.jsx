import { colors } from "../../theme/colors";

export default function Navbar() {
  return (
    <nav
      style={{
        background: colors.deep,
        color: "white",
        padding: "12px 20px",
      }}
    >
      🏥 Hospital Information System
    </nav>
  );
}
