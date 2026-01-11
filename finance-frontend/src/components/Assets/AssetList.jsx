import { useEffect, useState } from "react";
import { getAssets } from "../../api/assetApi";

export default function AssetList() {
  const [assets, setAssets] = useState([]);

  useEffect(()=>{
    getAssets().then(res=>setAssets(res.data));
  },[]);

  return (
    <table>
      <tr><th>Name</th><th>Cost</th><th>Status</th></tr>
      {assets.map(a=>(
        <tr key={a.asset_id}>
          <td>{a.asset_name}</td>
          <td>{a.purchase_cost}</td>
          <td>{a.status}</td>
        </tr>
      ))}
    </table>
  );
}
