import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  QrCodeIcon, 
  XIcon, 
  CameraIcon, 
  FlashlightIcon,
  RotateCcwIcon,
  CheckIcon
} from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setError('');
      setIsScanning(true);
      
      const constraints = {
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Check if flash is available
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      setHasFlash('torch' in capabilities);

    } catch (err) {
      setError('Camera access denied or not available');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
    setFlashOn(false);
  };

  const toggleFlash = async () => {
    if (streamRef.current && hasFlash) {
      const track = streamRef.current.getVideoTracks()[0];
      try {
        await track.applyConstraints({
          advanced: [{ torch: !flashOn }]
        });
        setFlashOn(!flashOn);
      } catch (err) {
        console.error('Flash toggle failed:', err);
      }
    }
  };

  const handleManualInput = () => {
    const input = prompt('Enter QR code data manually:');
    if (input && input.trim()) {
      handleScanResult(input.trim());
    }
  };

  const handleScanResult = (data: string) => {
    setScannedData(data);
    stopCamera();
  };

  const confirmScan = () => {
    onScan(scannedData);
    onClose();
  };

  const resetScan = () => {
    setScannedData('');
    setError('');
    startCamera();
  };

  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <QrCodeIcon className="w-6 h-6 text-[#df8e8f]" />
            QR Scanner
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!isScanning && !scannedData && !error && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#df8e8f] to-[#c97a7b] rounded-full flex items-center justify-center">
                <QrCodeIcon className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-600">
                Scan QR codes to quickly add tasks or import data
              </p>
              <div className="space-y-2">
                <Button
                  onClick={startCamera}
                  className="w-full bg-[#df8e8f] hover:bg-[#c97a7b] text-white"
                >
                  <CameraIcon className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
                <Button
                  onClick={handleManualInput}
                  variant="outline"
                  className="w-full"
                >
                  Enter Manually
                </Button>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-64 object-cover"
                  playsInline
                  muted
                />
                <div className="absolute inset-0 border-2 border-[#df8e8f] rounded-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#df8e8f]"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#df8e8f]"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#df8e8f]"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#df8e8f]"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                {hasFlash && (
                  <Button
                    onClick={toggleFlash}
                    variant="outline"
                    className={`px-3 ${flashOn ? 'bg-yellow-100' : ''}`}
                  >
                    <FlashlightIcon className={`w-4 h-4 ${flashOn ? 'text-yellow-600' : ''}`} />
                  </Button>
                )}
                <Button
                  onClick={handleManualInput}
                  variant="outline"
                  className="px-3"
                >
                  Manual
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                Position the QR code within the frame to scan
              </p>
            </div>
          )}

          {scannedData && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <CheckIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">QR Code Scanned!</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600 break-all">{scannedData}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={resetScan}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcwIcon className="w-4 h-4 mr-2" />
                  Scan Again
                </Button>
                <Button
                  onClick={confirmScan}
                  className="flex-1 bg-[#df8e8f] hover:bg-[#c97a7b] text-white"
                >
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <XIcon className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Camera Error</h3>
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={startCamera}
                  className="w-full bg-[#df8e8f] hover:bg-[#c97a7b] text-white"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleManualInput}
                  variant="outline"
                  className="w-full"
                >
                  Enter Manually
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};