import { useState, useEffect } from "react";
import { getMediaDetails } from "../../utils/tmdbApi";

function MediaCard({ mediaId, mediaType, progress, rating }) {
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const data = await getMediaDetails(mediaId, mediaType);
        setMedia(data);
      } catch (err) {
        console.error("Failed to load media details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [mediaId, mediaType]);

  if (isLoading) return <div>Loading...</div>;
  if (!media) return null;

  return (
    <div className="media-card">
      <img
        src={`https://image.tmdb.org/t/p/w300${media.poster_path}`}
        alt={media.title || media.name}
        className="media-poster"
      />
      <div className="media-info">
        <h3>{media.title || media.name}</h3>
        {progress > 0 && <div>Progress: {progress}%</div>}
        {rating > 0 && <div>Rating: {rating}/10</div>}
      </div>
    </div>
  );
}

export default MediaCard;
