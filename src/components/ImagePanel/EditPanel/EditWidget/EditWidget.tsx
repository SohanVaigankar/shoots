"use client";

import React, { type ChangeEvent, useState } from "react";
// icons
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type EditWidgetProps = {
  widgetData: {
    id: string;
    title: string;
    icon: React.ReactNode;
    minValue: number;
    maxValue: number;
    defaultValue: number;
    value: number;
    unit: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
};

const EditWidget = (props: EditWidgetProps) => {
  const { widgetData } = props;

  const [expand, setExpand] = useState<boolean>(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <li className="rounded-sm bg-muted p-2  hover:cursor-pointer hover:bg-muted-foreground/30 hover:text-primary">
      <div
        className="flex items-center justify-start gap-2"
        onClick={handleExpand}
      >
        {widgetData.icon}
        <span className="w-[45%]">{widgetData.title}</span>
        <span
          className={`w-[2.5rem] rounded-sm bg-primary px-1 py-1 text-center text-[0.65rem] font-semibold text-primary-foreground`}
        >
          {`${widgetData.value}`}
          {widgetData.unit}
        </span>
        {expand ? (
          <IoChevronUp fontSize={"1.125rem"} />
        ) : (
          <IoChevronDown fontSize={"1.125rem"} />
        )}
      </div>
      {expand && (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-sm bg-primary-foreground p-2 text-[0.75rem]">
          <span>{`${widgetData.minValue}${widgetData.unit}`}</span>
          <input
            id={widgetData.id}
            type="range"
            min={widgetData.minValue}
            max={widgetData.maxValue}
            defaultValue={widgetData.defaultValue}
            value={widgetData.value}
            className="w-full"
            onChange={widgetData.handleChange}
          />
          <span>{`${widgetData.maxValue}${widgetData.unit}`}</span>
        </div>
      )}
    </li>
  );
};

export default EditWidget;
