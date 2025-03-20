import LottieHandler from "@/components/feedback/LottieHandler/LottieHandler";



type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage:string;
};

type HasId = { id?: number };

const GridList =  <T extends HasId>({ records, renderItem,emptyMessage }: GridListProps<T>) => {
   const categoriesList =
    records.length > 0
      ? records.map((record) => (
          <div
            key={record.id}
            className="flex justify-center mt-2 mb-5 sm:w-1/2 md:w-1/3 lg:w-1/4"  // Tailwind classes for grid layout
          >
            {renderItem(record)}
          </div>
        ))
      : <LottieHandler type="empty" message={emptyMessage} />;

  return <div className="flex flex-wrap">{categoriesList}</div>;
}

export default GridList
