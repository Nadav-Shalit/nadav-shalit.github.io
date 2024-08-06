export default function TaxonomyItem({ data }) {
  return (
    <section className=" flex flex-col p-2 m-2 xl:w-60 w-24 text-center bg-red-100 rounded-md text-black-200">
      <div className="flex justify-center items-center">
        <div className="relative">
          <img
            src={data.imgSrc}
            className="xl:w-64 xl:h-44 h-24 h-16 object-contain justify-center"
          />
          <span className="xl:font-extrabold absolute top-2/3 xl:top-3/4 pl-3 left-0 text-white text-nowrap overflow-hidden truncate w-full text-left">
            {data.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between gap-2 text-xs xl:text-lg">
        <p className="font-semibold">
          Events
          <span id="events" className="font-thin p-2">
            {data.events}
          </span>
        </p>
        <p className="font-semibold">
          Performers
          <span id="performers" className="font-thin p-2">
            {data.perfomers}
          </span>
        </p>
      </div>
    </section>
  );
}
