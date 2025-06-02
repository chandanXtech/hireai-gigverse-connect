
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Clock,
  CheckCircle,
  Bookmark,
  Star
} from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  duration?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  isCompleted?: boolean;
  isBookmarked?: boolean;
  onBookmark?: () => void;
  rating?: number;
  onRate?: (rating: number) => void;
}

export const VideoPlayer = ({
  videoId,
  title,
  duration,
  onProgress,
  onComplete,
  isCompleted = false,
  isBookmarked = false,
  onBookmark,
  rating = 0,
  onRate
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [watchProgress, setWatchProgress] = useState(0);

  // Extract video ID from YouTube URL if needed
  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  const actualVideoId = extractVideoId(videoId);
  const embedUrl = `https://www.youtube.com/embed/${actualVideoId}?enablejsapi=1&origin=${window.location.origin}`;

  useEffect(() => {
    // Calculate progress and trigger callbacks
    if (totalDuration > 0) {
      const progress = (currentTime / totalDuration) * 100;
      setWatchProgress(progress);
      onProgress?.(progress);

      // Mark as complete if watched 90% or more
      if (progress >= 90 && !isCompleted) {
        onComplete?.();
      }
    }
  }, [currentTime, totalDuration, isCompleted, onProgress, onComplete]);

  const handleRating = (newRating: number) => {
    onRate?.(newRating);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {/* Video Container */}
        <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Completion Overlay */}
          {isCompleted && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </Badge>
            </div>
          )}
        </div>

        {/* Video Controls & Info */}
        <div className="p-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(watchProgress)}%</span>
            </div>
            <Progress value={watchProgress} className="h-2" />
          </div>

          {/* Video Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {duration}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Bookmark Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onBookmark}
                className={isBookmarked ? 'text-blue-600' : 'text-gray-500'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>

              {/* Rating Stars */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRating(star)}
                    className="p-0 h-auto"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        star <= rating 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
