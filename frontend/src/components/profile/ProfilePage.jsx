import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";
import WatchlistSection from "./WatchlistSection";
import { fetchProfile } from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import "./Profile.css";

export function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);
        const data = await fetchProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
        console.error("Profile loading error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="profile-container">
      {isEditing ? (
        <ProfileEdit
          profile={profile}
          setProfile={setProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileInfo profile={profile} onEdit={() => setIsEditing(true)} />
      )}
      <WatchlistSection watchlistId={profile.watchlist} />
    </div>
  );
}

export default ProfilePage;
