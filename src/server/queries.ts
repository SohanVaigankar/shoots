import "server-only";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// db & ORM
import { images } from "./db/schema";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
// analytics
import analyticsServerClient from "./analytics";
import { ERROR_TYPE } from "~/utils/errorData";

// fn to get uploaded images
export const getImages = async () => {
  try {
    const user = auth();
    if (!user?.userId) throw new Error(ERROR_TYPE.UNAUTHORIZED);

    const images = await db.query.images.findMany({
      where: (model, { eq }) => eq(model.userId, user.userId),
      orderBy: (model, { desc }) => desc(model.id),
    });

    return images;
  } catch (error) {
    console.error(" getImages:", error);
    throw new Error(error?.message || ERROR_TYPE.INTERNAL_SERVER_ERROR);
  }
};

// fn to get single img
export const getImage = async (id: number) => {
  try {
    const user = auth();

    if (!user?.userId) throw new Error(ERROR_TYPE.UNAUTHORIZED);

    const image = await db.query.images.findFirst({
      where: (model, { eq }) => eq(model.id, id),
    });

    if (!image) throw new Error(ERROR_TYPE.NOT_FOUND);
    if (image.userId !== user.userId) throw new Error(ERROR_TYPE.UNAUTHORIZED);

    return image;
  } catch (error) {
    console.error(" getImage", error);
    throw new Error(error?.message || ERROR_TYPE.INTERNAL_SERVER_ERROR);
  }
};

// delete image
export const deleteImage = async (id: number) => {
  try {
    const user = auth();

    if (!user?.userId) throw new Error(ERROR_TYPE.UNAUTHORIZED);

    await db
      .delete(images)
      .where(and(eq(images.id, id), eq(images.userId, user.userId)));

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "delete_image",
      properties: { imageId: id },
    });

    //   revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error(" deleteImage:", error);
    throw new Error(error?.message || ERROR_TYPE.INTERNAL_SERVER_ERROR);
  }
};
