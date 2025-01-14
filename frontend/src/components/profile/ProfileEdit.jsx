import { useState } from "react";
import { updateProfile, updatePassword } from "../../utils/api";
import ProfilePicture from "./ProfilePicture";

function ProfileEdit({ profile, setProfile, onCancel }) {
  const [formData, setFormData] = useState({
    username: profile.username,
    bio: profile.bio || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Handle password change if new password is provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError("Passwords don't match");
          return;
        }
        await updatePassword(formData.currentPassword, formData.newPassword);
      }

      // Update profile information
      const updatedProfile = await updateProfile({
        username: formData.username,
        bio: formData.bio,
      });

      setProfile(updatedProfile);
      onCancel();
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-card">
      <div className="form-group">
        <ProfilePicture
          src={profile.profilePicture}
          alt={profile.username}
          editable
          onUpdate={setProfile}
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="form-input"
          rows="3"
        />
      </div>

      <div className="password-section">
        <h3>Change Password</h3>
        <div className="form-group">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="button-group">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="edit-button">
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ProfileEdit;
