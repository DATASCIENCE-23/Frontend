export default function AddressSection({ addresses }) {
  return (
    <>
      <h3>Addresses</h3>
      {addresses.length === 0 && <p>No address found</p>}
      {addresses.map(addr => (
        <div key={addr.address_id}>
          {addr.street}, {addr.city}, {addr.state}
        </div>
      ))}
    </>
  );
}
