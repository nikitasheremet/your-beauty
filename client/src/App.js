import React, { useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const App = () => {
  const [scanning, setScanning] = useState(false);
  const [barCodeResult, setBarcodeResult] = useState("")
  const [error, setError] = useState(undefined)
  const [result, setResult] = useState({
    name: '',
    brand: ''
  })

  const handleScan = async (result) => {
    try {
      if (result) {
        const scannedBarcode = result.getText()
        // setBarcodeResult(scannedBarcode)
        const response = await fetch(`https://world.openbeautyfacts.org/api/v0/product/${scannedBarcode}.json`)
        const beautyFactsResult = await response.json()
        setBarcodeResult(scannedBarcode)
        setResult({
         name: beautyFactsResult?.product?.product_name_en,
         brand: beautyFactsResult?.product?.brands_tags?.[0]
      })
        setScanning(false);
      }
    } catch (err) {
      setError(JSON.stringify(err))
    }
    
  };

  const startScan = async () => {
    setScanning(true);

    const codeReader = new BrowserMultiFormatReader();
    try {
      const videoInputDevices = await codeReader.listVideoInputDevices();
      const constraints = {
        video: {
          deviceId: videoInputDevices[0].deviceId,
          width: { ideal: 500 },
          height: { ideal: 500 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.getElementById('video-preview');
      videoElement.srcObject = stream;
      codeReader.decodeFromVideoDevice(undefined, videoElement, handleScan);
    } catch (error) {
      //setResult(error.getText())
      console.error(error);
      setScanning(false);
    }
  };

  return (
    <div>
      <h1>I am here</h1>
      {error && <p>Error is: {error}</p>}
      <p>result is: {barCodeResult}</p>
      <p>Name: {result.name}</p>
      <p>Brand: {result.brand}</p>
      {!scanning && (
        <button onClick={startScan}>Scan Barcode</button>
      )}
      {scanning && (
        <div>
          <video
            id="video-preview"
            style={{ width: '500px', height: '500px' }}
            autoPlay
            muted
            playsInline
          />
          <button onClick={() => setScanning(false)}>Stop Scanning</button>
        </div>
      )}
    </div>
  );
};

export default App;

