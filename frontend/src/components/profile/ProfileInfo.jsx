import { formatDate } from "../../utils/dateUtils";
import ProfilePicture from "./ProfilePicture";

function ProfileInfo({ profile, onEdit }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <ProfilePicture src={profile.profilePicture} alt={profile.username} />

        <div className="profile-info">
          <div className="profile-name-row">
            <h1 className="profile-name">{profile.name}</h1>
            <button onClick={onEdit} className="edit-button">
              Edit Profile
            </button>
          </div>

          <div className="profile-details">
            <p>@{profile.username}</p>
            <p>Born: {formatDate(profile.dateOfBirth)}</p>
            <p>Gender: {profile.gender}</p>
            <p>Email: {profile.email}</p>
            {profile.bio && <p className="profile-bio">{profile.bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
