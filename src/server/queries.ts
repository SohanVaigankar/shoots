import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// fn to get uploaded images
export const getImages = async () => {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
};

// fn to get single img
export const getImage = async (id: number) => {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image Not Found");
  if (image.userId !== user.userId) throw new Error("Unauthorised");

  return image;
};

// delete image
export const deleteImage = async (id: number) => {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorised");

  await db
    .delete(image)
    .where(and(eq(image.id, id), eq(user.userId, image.userId)));

//   revalidatePath("/");
  redirect("/");
};
