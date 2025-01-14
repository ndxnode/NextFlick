import { useState } from "react";
import { updateProfilePicture } from "../../utils/api";

function ProfilePicture({ src, alt, editable, onUpdate }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const updatedProfile = await updateProfilePicture(formData);
      onUpdate?.(updatedProfile);
    } catch (err) {
      console.error("Failed to upload image:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="profile-picture-container">
      <img
        src={src || "/default-avatar.png"}
        alt={alt}
        className="profile-picture"
      />
      {editable && (
        <div className="profile-picture-upload">
          <label className="profile-picture-button" htmlFor="profile-picture">
            {isUploading ? "..." : "📷"}
          </label>
          <input
            type="file"
            id="profile-picture"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </div>
      )}
    </div>
  );
}

export default ProfilePicture;
