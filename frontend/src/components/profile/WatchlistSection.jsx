import { useState, useEffect } from "react";
import { getWatchlist, updateWatchlistItem, removeFromWatchlist } from "../../utils/api";
import MediaCard from "../common/MediaCard";
import { toast } from "react-toastify";
import "./WatchlistSection.css";

function WatchlistSection() {
  const [watchlist, setWatchlist] = useState(null);
  const [activeStatus, setActiveStatus] = useState("watching");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("dateAdded");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchWatchlist = async () => {
    try {
      setIsLoading(true);
      const data = await getWatchlist();
      setWatchlist(data);
    } catch (err) {
      console.error("Failed to load watchlist:", err);
      toast.error("Failed to load watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleStatusUpdate = async (mediaId, newStatus) => {
    try {
      await updateWatchlistItem(mediaId, { status: newStatus });
      fetchWatchlist();
      toast.success("Status updated successfully");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  const handleProgressUpdate = async (mediaId, newProgress) => {
    try {
      await updateWatchlistItem(mediaId, { progress: newProgress });
      fetchWatchlist();
      toast.success("Progress updated successfully");
    } catch (err) {
      console.error("Failed to update progress:", err);
      toast.error("Failed to update progress");
    }
  };

  const handleRatingUpdate = async (mediaId, newRating) => {
    try {
      await updateWatchlistItem(mediaId, { rating: newRating });
      fetchWatchlist();
      toast.success("Rating updated successfully");
    } catch (err) {
      console.error("Failed to update rating:", err);
      toast.error("Failed to update rating");
    }
  };

  const handleNotesUpdate = async (mediaId, notes) => {
    try {
      await updateWatchlistItem(mediaId, { notes });
      fetchWatchlist();
      toast.success("Notes updated successfully");
    } catch (err) {
      console.error("Failed to update notes:", err);
      toast.error("Failed to update notes");
    }
  };

  const handleRemoveItem = async (mediaId) => {
    if (window.confirm("Are you sure you want to remove this item from your watchlist?")) {
      try {
        await removeFromWatchlist(mediaId);
        fetchWatchlist();
        setSelectedItem(null);
        toast.success("Item removed from watchlist");
      } catch (err) {
        console.error("Failed to remove item:", err);
        toast.error("Failed to remove item from watchlist");
      }
    }
  };

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "dateAdded":
          comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
          break;
        case "dateUpdated":
          comparison = new Date(a.dateUpdated) - new Date(b.dateUpdated);
          break;
        case "rating":
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        case "progress":
          comparison = (b.progress || 0) - (a.progress || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  if (isLoading) return <div className="loading">Loading watchlist...</div>;
  if (!watchlist) return null;

  const statusTabs = ["watching", "planning", "completed", "dropped"];
  const filteredItems = sortItems(watchlist.items.filter(
    (item) => item.status === activeStatus
  ));

  return (
    <div className="watchlist-section">
      <h2 className="section-title">My Watchlist</h2>

      <div className="status-tabs">
        {statusTabs.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`tab-button ${activeStatus === status ? "active" : ""}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="item-count">
              {watchlist.items.filter(item => item.status === status).length}
            </span>
          </button>
        ))}
      </div>

      <div className="watchlist-controls">
        <div className="sort-controls">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="dateAdded">Date Added</option>
            <option value="dateUpdated">Last Updated</option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="progress">Progress</option>
          </select>
          <button
            onClick={() => setSortOrder(order => order === "asc" ? "desc" : "asc")}
            className="sort-order-button"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="media-grid">
        {filteredItems.map((item) => (
          <div 
            key={item.mediaId} 
            className={`media-item ${selectedItem?.mediaId === item.mediaId ? 'selected' : ''}`}
            onClick={() => setSelectedItem(selectedItem?.mediaId === item.mediaId ? null : item)}
          >
            <MediaCard
              mediaId={item.mediaId}
              mediaType={item.mediaType}
              progress={item.progress}
              rating={item.rating}
            />
            <div className="item-controls">
              <select
                value={item.status}
                onChange={(e) => handleStatusUpdate(item.mediaId, e.target.value)}
                className="status-select"
                onClick={(e) => e.stopPropagation()}
              >
                {statusTabs.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                max="100"
                value={item.progress}
                onChange={(e) => handleProgressUpdate(item.mediaId, parseInt(e.target.value))}
                className="progress-input"
                placeholder="Progress %"
                onClick={(e) => e.stopPropagation()}
              />
              <select
                value={item.rating || ""}
                onChange={(e) => handleRatingUpdate(item.mediaId, e.target.value ? parseInt(e.target.value) : null)}
                className="rating-select"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="">Rate</option>
                {[...Array(11)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      
      {selectedItem && (
        <div className="item-details-modal">
          <div className="modal-content">
            <h3>{selectedItem.title}</h3>
            <div className="details-grid">
              <div className="detail-item">
                <label>Added:</label>
                <span>{new Date(selectedItem.dateAdded).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <label>Last Updated:</label>
                <span>{new Date(selectedItem.dateUpdated).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <label>Notes:</label>
                <textarea
                  value={selectedItem.notes || ""}
                  onChange={(e) => handleNotesUpdate(selectedItem.mediaId, e.target.value)}
                  placeholder="Add notes..."
                  className="notes-input"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => handleRemoveItem(selectedItem.mediaId)}
                className="remove-button"
              >
                Remove from Watchlist
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {filteredItems.length === 0 && (
        <div className="empty-state">
          <p>No items in your {activeStatus} list</p>
        </div>
      )}
    </div>
  );
}

export default WatchlistSection;
