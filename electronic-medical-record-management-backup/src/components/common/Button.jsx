import { colors } from "../../theme/colors";

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        backgroundColor: colors.primaryDark,
        color: "white",
      }}
    >
      {children}
    </button>
  );
}
