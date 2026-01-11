import AssetForm from "../components/Assets/AssetForm";
import AssetList from "../components/Assets/AssetList";
import DepreciationForm from "../components/Assets/DepreciationForm";
import DepreciationList from "../components/Assets/DepreciationList";

export default function AssetPage() {
  return (
    <div>
      <h2>Assets & Depreciation</h2>
      <AssetForm />
      <AssetList />
      <DepreciationForm />
      <DepreciationList />
    </div>
  );
}
