import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";
import WatchlistSection from "./WatchlistSection";
import { fetchProfile } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

export function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Wait for auth check to complete
    if (authLoading) {
      return;
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/profile" } });
      return;
    }

    // Load profile data
    async function loadProfile() {
      try {
        setIsLoading(true);
        const data = await fetchProfile();
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error("Profile loading error:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [navigate, isAuthenticated, authLoading]);

  // Show nothing while checking authentication
  if (authLoading) {
    return null;
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <div className="error-message">Profile not found. Please try refreshing the page.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-section">
        {isEditing ? (
          <ProfileEdit
            profile={profile}
            setProfile={setProfile}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileInfo profile={profile} onEdit={() => setIsEditing(true)} />
        )}
      </div>

      <div className="watchlist-section-container">
        <WatchlistSection />
      </div>
    </div>
  );
}

export default ProfilePage;
