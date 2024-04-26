"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import { IoCloudUploadOutline } from "react-icons/io5";
// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export const UploadImageButton = () => {
  const router = useRouter();

  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("upload_begin");
      toast.loading("Uploading...", { duration: 100000, id: "upload-begin" });
    },
    onUploadError() {
      posthog.capture("upload_error");
      toast.dismiss("upload-begin");
      toast.error("Failed to upload image", { duration: 5000 });
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast.success("Image Upload Successful");
      router.refresh();
    },
  });

  return (
    <div className="rounded-md bg-purple-700 px-4 py-1 text-[0.9rem] text-primary-foreground drop-shadow-sm hover:cursor-pointer hover:bg-purple-800">
      <label
        htmlFor="upload-button"
        className="flex items-center justify-center gap-2 hover:cursor-pointer"
      >
        <IoCloudUploadOutline fontSize={"1.125rem"} /> <span>Upload</span>
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only hover:cursor-pointer"
        {...inputProps}
      />
    </div>
  );
};
