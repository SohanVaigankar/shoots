"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";

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
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast.success("Image Upload Successful");
      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-button">Upload</label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
};
