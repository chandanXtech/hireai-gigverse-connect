
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Calendar, Clock, Users } from 'lucide-react';

interface InterviewProps {
  interviewId: string;
  candidateName: string;
  recruiterName: string;
  scheduledTime: Date;
  duration: number; // in minutes
  onEnd: () => void;
}

export const VideoInterview = ({ 
  interviewId, 
  candidateName, 
  recruiterName, 
  scheduledTime, 
  duration,
  onEnd 
}: InterviewProps) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate connection establishment
    setTimeout(() => setConnectionStatus('connected'), 2000);
    
    // Timer for interview duration
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const endInterview = () => {
    if (isRecording) {
      stopRecording();
    }
    onEnd();
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Interview Session</h2>
            <Badge variant={connectionStatus === 'connected' ? 'default' : 'secondary'}>
              {connectionStatus}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {scheduledTime.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)} / {duration}min
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              2 participants
            </div>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 p-4 relative">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Remote Video */}
          <Card className="relative overflow-hidden bg-gray-800">
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary">{recruiterName}</Badge>
            </div>
          </Card>

          {/* Local Video */}
          <Card className="relative overflow-hidden bg-gray-800">
            {isVideoOn ? (
              <video
                ref={localVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <VideoOff className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary">{candidateName} (You)</Badge>
            </div>
          </Card>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 right-4">
            <Badge variant="destructive" className="animate-pulse">
              ● REC {formatTime(timeElapsed)}
            </Badge>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={isAudioOn ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-12 h-12"
          >
            {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          <Button
            variant={isVideoOn ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12"
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
            className="rounded-full"
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={endInterview}
            className="rounded-full w-12 h-12"
          >
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
