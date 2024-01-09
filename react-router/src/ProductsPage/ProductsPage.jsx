import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const ProductsPage = ({ data }) => {
  const [companies, setCompanies] = useState(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (evt) => {
    // console.log({ val: evt.target.value });
    setSearchParams({ s: evt.target.value });
  };

  const updateCompanies = useCallback(() => {
    // console.log({ searchParams: searchParams.get("s") });
    const filterdCompanies = data.filter((cmp) => {
      return searchParams.get("s")
        ? cmp.companyName.toLowerCase().includes(searchParams.get("s"))
        : true;
    });
    setCompanies(filterdCompanies);
  }, [data, searchParams]);

  useEffect(() => {
    updateCompanies();
  }, [data, searchParams, updateCompanies]);

  return (
    <>
      <input type="text" onChange={handleChange} />
      <ul className="companyList">
        {companies.map(({ id, companyName, companyDescription }) => (
          <li key={id}>
            <h2>{companyName}</h2>
            <p>{companyDescription}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ProductsPage;
