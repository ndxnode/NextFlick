import { useState, useEffect } from "react";
import { getWatchlist } from "../../utils/api";
import MediaCard from "../common/MediaCard";

function WatchlistSection({ watchlistId }) {
  const [watchlist, setWatchlist] = useState(null);
  const [activeStatus, setActiveStatus] = useState("watching");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist(watchlistId);
        setWatchlist(data);
      } catch (err) {
        console.error("Failed to load watchlist:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (watchlistId) {
      fetchWatchlist();
    }
  }, [watchlistId]);

  if (isLoading) return <div>Loading watchlist...</div>;
  if (!watchlist) return null;

  const statusTabs = ["watching", "planning", "completed", "dropped"];
  const filteredItems = watchlist.items.filter(
    (item) => item.status === activeStatus
  );

  return (
    <div className="watchlist-section">
      <h2 className="profile-name">My Watchlist</h2>

      <div className="watchlist-tabs">
        {statusTabs.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`tab-button ${activeStatus === status ? "active" : ""}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="media-grid">
        {filteredItems.map((item) => (
          <MediaCard
            key={item.mediaId}
            mediaId={item.mediaId}
            mediaType={item.mediaType}
            progress={item.progress}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchlistSection;
