import { ImageModel } from "../../models/image";

export const findAllImages = async () => {
  // En Mongo, el "where" es un objeto simple
  const images = await ImageModel.find({
    active: 1,
    // createdBy: { $ne: currentUserId } // $ne es "not equal", equivalente a Op.ne
  })
  .lean();

  return images;
};

export const createImage = async (imageData: {url: string; data: any}) => {
  console.log("Creating image with data:", imageData);
  const newImage = new ImageModel(imageData);
  return await newImage.save();
};

export const deleteImageById = async (id: string) => {
  return await ImageModel.findByIdAndDelete(id);
};

export const findImageById = async (id: string) => {
  return await ImageModel.findById(id).lean();
};
