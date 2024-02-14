import TaxonomyItem from "./TaxonomyItem.jsx";
export default function TaxonomiesList({ data }) {
  const hasChildrenTaxonomies = data && data.length > 0;
  return (
    <>
      <div className="max-w-full flex flex-wrap justify-center bg-red-500">
        {hasChildrenTaxonomies &&
          data.map((itm, idx) => {
            return <TaxonomyItem key={idx} data={itm}></TaxonomyItem>;
          })}
      </div>
      <div className="text-2xl text-center text-black  min-h-96">
        {!hasChildrenTaxonomies && (
          <section className="my-36">
            <h2>No results </h2>
          </section>
        )}
      </div>
    </>
  );
}
