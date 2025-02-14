import { useState } from 'react';
import { addToWatchlist } from '../../utils/api';
import { toast } from 'react-toastify';
import './AddToWatchlistButton.css';

function AddToWatchlistButton({ mediaId, mediaType }) {
  const [isAdding, setIsAdding] = useState(false);
  const [showStatusSelect, setShowStatusSelect] = useState(false);

  const handleAddToWatchlist = async (status) => {
    try {
      setIsAdding(true);
      await addToWatchlist(mediaId, mediaType, status);
      toast.success('Added to your watchlist!');
      setShowStatusSelect(false);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
      toast.error('Failed to add to watchlist');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="add-to-watchlist">
      {!showStatusSelect ? (
        <button
          className="add-button"
          onClick={() => setShowStatusSelect(true)}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : '+ Add to Watchlist'}
        </button>
      ) : (
        <div className="status-selector">
          <button
            className="status-option"
            onClick={() => handleAddToWatchlist('planning')}
          >
            Plan to Watch
          </button>
          <button
            className="status-option"
            onClick={() => handleAddToWatchlist('watching')}
          >
            Currently Watching
          </button>
          <button
            className="status-option"
            onClick={() => handleAddToWatchlist('completed')}
          >
            Completed
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowStatusSelect(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default AddToWatchlistButton;
