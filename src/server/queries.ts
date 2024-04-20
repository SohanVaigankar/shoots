import "server-only";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import analyticsServerClient from "./analytics";
import { images } from "./db/schema";

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
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete_image",
    properties: { imageId: id },
  });

  //   revalidatePath("/");
  redirect("/");
};
