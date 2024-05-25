"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// hooks
import { useWindowResolution } from "~/app/hooks";

interface GridItem {
  id: number;
  url: string;
  name: string;
  userId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface ItemGridProps {
  items: GridItem[];
}

const getColumnCount = (width: number): number => {
  if (width >= 1536) return 6;
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
};

const ItemGrid: React.FC<ItemGridProps> = (props) => {
  const { items } = props;
  const { width } = useWindowResolution();

  const [columnCount, setColumnCount] = useState<number>(
    getColumnCount(width ?? 0),
  );

  const columns = Array.from({ length: columnCount }, () => [] as GridItem[]);

  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  useEffect(() => {
    setColumnCount(getColumnCount(width ?? 0));
  }, [width]);

  return (
    <div className=" scrollbar-hide flex h-full border-separate   space-x-4 overflow-y-auto rounded-md bg-card p-4">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex-1 space-y-4">
          {column.map((item, itemIndex) => (
            <div key={itemIndex} className="overflow-hidden">
              <Link href={`/img/${item?.id}`}>
                <img
                  src={item.url}
                  alt={item.name}
                  className="rounded-sm object-contain shadow-sm hover:scale-[1.015]  hover:cursor-pointer hover:shadow-md"
                />
              </Link>
              <p className="p-1 text-center text-[0.8rem]">{item?.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
