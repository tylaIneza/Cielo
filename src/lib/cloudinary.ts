import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadImage(
  file: string,
  folder: string = "cielo-fashion"
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder: `cielo-fashion/${folder}`,
    quality: "auto",
    fetch_format: "auto",
    flags: "progressive",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getOptimizedUrl(
  url: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  const { width, height, quality = "auto" } = options;
  const transformations: string[] = [`q_${quality}`, "f_auto"];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push("c_fill");
  return url.replace("/upload/", `/upload/${transformations.join(",")}/`);
}

export { cloudinary };
