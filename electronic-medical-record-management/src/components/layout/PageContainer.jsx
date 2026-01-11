export default function PageContainer({ children }) {
  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      {children}
    </div>
  );
}
