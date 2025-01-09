const uploadFile = async (file) => {
  try {
    // Ensure cloud name is properly set
    if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
      throw new Error("Cloudinary cloud name is not configured");
    }

    if (!file || !(file instanceof File)) {
      throw new Error("Invalid file provided");
    }

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/auto/upload`;

    let formData;
    if (file instanceof FormData) {
      formData = file;
    } else if (file instanceof File) {
      formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "chat-app");
    } else {
      throw new Error("Invalid file provided");
    }
    // Make sure this upload_preset name matches exactly what's in your Cloudinary settings

    // Add specific options based on file type
    // Validate file type and provide fallback
    const fileType = file.type?.split("/")[0] || "raw"; // Default to 'raw' if file.type is undefined
    // const resourceType = fileType === 'image'
    //     ? 'image'
    //     : fileType === 'video'
    //     ? 'video'
    //     : fileType === 'audio'
    //     ? 'video' // Cloudinary handles audio under 'video'
    //     : fileType === 'application' && file.type === 'application/pdf'
    //     ? 'raw'
    //     : 'raw';
    const resourceType =
      {
        image: "image",
        video: "video",
        audio: "video", // Cloudinary handles audio under 'video'
        application: "raw",
      }[fileType] || "raw";

    formData.append("resource_type", resourceType);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload error:", errorData);
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      public_id: data.public_id,
      resource_type: data.resource_type,
      format: data.format,
    };
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("Failed to upload file. Please try again.");
  }
};

export default uploadFile;
