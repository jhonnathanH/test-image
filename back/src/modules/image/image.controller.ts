import handleProcess from "../../utils/scripts/images";
import uploadImage from "../../utils/storage/upload";
import { findAllImages, createImage, deleteImageById } from "./image.service";

export const getImages = async () => {
  try {
    const imagesList = await findAllImages();
    imagesList.forEach((image: any) => {
      image.id = image._id;
      delete image._id;
    });
    imagesList.sort((a: any, b: any) => b.createdAt - a.createdAt);
    return {
      success: true,
      data: imagesList
    };
  } catch (error) {
    console.error("Error in getImages controller:", error);
    return { success: false, message: "Error fetching images" };
  }
};

export const removeImage = async (id: string) => {
  try {
    const deletedImage = await deleteImageById(id);
    if (!deletedImage) {
      return {
        success: false,
        message: `Image with id ${id} not found.`
      };
    }
    return {
      success: true,
      message: `Image deleted successfully.`
    };
  } catch (error) {
    console.error("Error in removeImage controller:", error);
    return { success: false, message: "Error removing image" };
  }
}

export const handleImage = async (file: any, data: any) => {
  try {
    // Read file buffer and other details
    const fileBuffer = file.buffer;
    const fileName = file.originalname;
    const mimeType = file.mimetype;
    // only allow image mime types
    if (!mimeType.startsWith("image/")) {
      throw new Error("Invalid file type. Only image files are allowed.");
    }

    // Upload image to Supabase
    console.log("Uploading image to storage...", fileName, mimeType);
    const publicUrl = await uploadImage(fileBuffer, fileName, mimeType);
    if (!publicUrl) {
      throw new Error("Failed to upload image to storage");
    }
    console.log("Uploaded image URL:", publicUrl);
  
    const result: any = await handleProcess(publicUrl);
    console.log("Python script result:", result);
    if (!result || result.error) {
      return {
        success: false,
        message: result.error || "Error processing image"
      };
    }
    if (!publicUrl) {
      throw new Error("Failed to upload image to storage");
    }
    const newImage = await createImage({ url: publicUrl, data: result });

    return {
      success: true,
      data: newImage
    };
  } catch (error) {
    console.error("Error in saveUniqueImage controller:", error);
    return { success: false, message: "Error uploading unique image" };
  }
}