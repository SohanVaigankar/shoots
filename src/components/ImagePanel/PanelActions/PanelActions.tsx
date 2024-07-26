import React from "react";
//
import { deleteImage } from "~/server/queries";
// components
import { Button } from "~/components/ui/button";
// icons
import { MdDeleteOutline } from "react-icons/md";

type PanelActionsProps = {
  imgId: number;
};

const PanelActions = (props: PanelActionsProps) => {
  const { imgId } = props;
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await deleteImage(imgId);
        }}
        className="mx-auto flex items-center justify-center gap-3"
      >
        <Button
          type="submit"
          variant="destructive"
          size="sm"
          className="flex gap-1"
        >
          <MdDeleteOutline fontSize={"1.125rem"} />
          <span>Delete</span>
        </Button>
      </form>
    </div>
  );
};

export default PanelActions;
