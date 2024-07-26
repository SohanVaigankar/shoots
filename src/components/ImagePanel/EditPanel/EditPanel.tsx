"use client";

import React from "react";
// context
import { useEditContext } from "~/context";
import { EDIT_CONTEXT_ACTIONS } from "~/context/edit-context/actions.types";
// components
import EditWidget from "./EditWidget/EditWidget";
// icons
import { IoContrast, IoSunny } from "react-icons/io5";
import { PiCircleHalfTiltBold, PiDropHalfDuotone } from "react-icons/pi";
import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import { MdEdit, MdSave } from "react-icons/md";

const EditPanel = () => {
  const {
    brightness,
    contrast,
    saturation,
    grayscale,
    rotate,
    dispatch,
    isEdit,
  } = useEditContext();

  const handleChange = (e) => {
    const widgetType = e.target.id;

    switch (widgetType) {
      case "brightness":
        dispatch({
          type: EDIT_CONTEXT_ACTIONS.UPDATE_BRIGHTNESS,
          payload: e.target.value,
        });
        break;
      case "contrast":
        dispatch({
          type: EDIT_CONTEXT_ACTIONS.UPDATE_CONTRAST,
          payload: e.target.value,
        });
        break;
      case "saturation":
        dispatch({
          type: EDIT_CONTEXT_ACTIONS.UPDATE_SATURATION,
          payload: e.target.value,
        });
        break;
      case "grayscale":
        dispatch({
          type: EDIT_CONTEXT_ACTIONS.UPDATE_GRAYSCALE,
          payload: e.target.value,
        });
        break;
      case "rotate":
        dispatch({
          type: EDIT_CONTEXT_ACTIONS.UPDATE_ROTATE,
          payload: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const widgets = [
    {
      id: "brightness",
      title: "Brightness",
      icon: <IoSunny fontSize={"1.125rem"} />,
      minValue: 0,
      maxValue: 200,
      defaultValue: 100,
      value: brightness,
      unit: "%",
      handleChange: handleChange,
    },
    {
      id: "contrast",
      title: "Contrast",
      icon: <IoContrast fontSize={"1.125rem"} />,
      minValue: 0,
      maxValue: 200,
      defaultValue: 100,
      value: contrast,
      unit: "%",
      handleChange: handleChange,
    },
    {
      id: "saturation",
      title: "Saturation",
      icon: <PiCircleHalfTiltBold fontSize={"1.125rem"} />,
      minValue: 0,
      maxValue: 200,
      defaultValue: 100,
      value: saturation,
      unit: "%",
      handleChange: handleChange,
    },
    {
      id: "grayscale",
      title: "Grayscale",
      icon: <PiDropHalfDuotone fontSize={"1.125rem"} />,
      minValue: 0,
      maxValue: 100,
      defaultValue: 0,
      value: grayscale,
      unit: "%",
      handleChange: handleChange,
    },
    {
      id: "rotate",
      title: "Rotate",
      icon: <FaRotateRight fontSize={"1.125rem"} />,
      minValue: 0,
      maxValue: 360,
      defaultValue: 0,
      value: rotate,
      unit: "°",
      handleChange: handleChange,
    },
  ];

  const handleClick = (type: string) => {
    switch (type) {
      case "edit":
        dispatch({ type: EDIT_CONTEXT_ACTIONS.EDIT_STATUS, payload: true });
        break;
      case "reset":
        dispatch({ type: EDIT_CONTEXT_ACTIONS.RESET });
        break;
      case "save":
        dispatch({ type: EDIT_CONTEXT_ACTIONS.SAVE_EDIT });
        break;
      case "download":
        dispatch({ type: EDIT_CONTEXT_ACTIONS.DOWNLOAD_IMAGE });
        break;

      default:
        break;
    }
  };

  if (!isEdit) {
    return (
      <Button
        type="button"
        className="flex gap-1"
        onClickCapture={() => handleClick("edit")}
      >
        <MdEdit fontSize={"1rem"} />
        <span>Edit</span>
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <ul className="mt-3 flex flex-col gap-1 rounded-md bg-card p-1 shadow-sm">
        {widgets.map((widget) => (
          <EditWidget key={widget.id} widgetData={widget} />
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          className="flex gap-1"
          onClickCapture={() => handleClick("reset")}
        >
          <FaRotateLeft fontSize={"1rem"} />
          <span>Reset</span>
        </Button>
        <Button
          type="button"
          className="flex gap-1"
          onClickCapture={() => handleClick("save")}
        >
          <MdSave fontSize={"1rem"} />
          <span>Save</span>
        </Button>
        <Button
          type="button"
          className="flex gap-1"
          onClickCapture={() => handleClick("download")}
        >
          <MdSave fontSize={"1rem"} />
          <span>Download</span>
        </Button>
      </div>
    </div>
  );
};

export default EditPanel;
