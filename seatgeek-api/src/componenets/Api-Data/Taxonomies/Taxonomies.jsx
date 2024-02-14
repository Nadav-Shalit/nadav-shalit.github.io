import getTaxonomies from "../../../assets/taxonomy-methods";
import { useEffect, useState } from "react";
import TaxonomyMenu from "./TaxonomyMenu.jsx";
import TaxonomiesList from "./TaxonomiesList.jsx";

export default function Taxonomies() {
  const [taxoxnomies, setTaxonomies] = useState([]);
  const [parentId, setParentId] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const tax = await getTaxonomies();
      setTaxonomies(tax);
    };
    loadData();
  }, []);

  function fliterByParent(parentId) {
    setParentId(parentId);
  }
  function getChildrenTaxonomies() {
    const childrenTaxonomies = [...taxoxnomies].filter((itm) => {
      return parentId === itm.parent_id || parentId === null;
    });

    return childrenTaxonomies;
  }
  return (
    <>
      {taxoxnomies.length === 0 && (
        <p className="mx-auto mt-8 font-extrabold">Loading...</p>
      )}
      {taxoxnomies.length > 0 && (
        <div className="bg-red-200 min-h-screen">
          <TaxonomyMenu
            data={taxoxnomies.filter((itm) => itm.parent_id === null)}
            filter={fliterByParent}
            parentId={parentId}
          ></TaxonomyMenu>
          <TaxonomiesList data={getChildrenTaxonomies()}></TaxonomiesList>
        </div>
      )}
    </>
  );
}
