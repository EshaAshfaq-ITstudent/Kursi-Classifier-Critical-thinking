import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setImage(reader.result);
          analyzeImage(img);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const analyzeImage = (img) => {
    setIsAnalyzing(true);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let totalBrightness = 0;
    let colorCount = {};
    let pixelCount = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (data[i + 3] < 128) continue;

      const brightness = (r + g + b) / 3;
      totalBrightness += brightness;

      const colorGroup = `${Math.round(r / 32)},${Math.round(g / 32)},${Math.round(b / 32)}`;
      colorCount[colorGroup] = (colorCount[colorGroup] || 0) + 1;

      pixelCount++;
    }

    const avgBrightness = totalBrightness / pixelCount;

    let classification;
    if (avgBrightness > 200) {
      classification = 'transparent';
    } else if (avgBrightness < 60) {
      classification = 'black';
    } else {
      const colorGroups = Object.entries(colorCount).sort((a, b) => b[1] - a[1]);
      const dominantColorPercentage = colorGroups[0][1] / pixelCount;

      if (dominantColorPercentage > 0.7) {
        classification = 'black';
      } else {
        classification = 'colorful';
      }
    }

    setResult(classification);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <>
      <div className="hero-banner">
        <h1>KURSI CLASSIFIER</h1>
      </div>

      <div className="main-container">
        <p className="subheading">Check if your image is Transparent, Black, or Colorful!</p>

        {!image && (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>📂 Drag & drop an image here, or click to select</p>
          </div>
        )}

        {isAnalyzing && <p className="analyzing-text">Analyzing image...</p>}

        <div className="belt-container">
          <div className="belt">
            <h3>Transparent</h3>
            {result === 'transparent' && <img src={image} alt="Result Transparent" />}
          </div>
          <div className="belt">
            <h3>Black</h3>
            {result === 'black' && <img src={image} alt="Result Black" />}
          </div>
          <div className="belt">
            <h3>Colorful</h3>
            {result === 'colorful' && <img src={image} alt="Result Colorful" />}
          </div>
        </div>

        {result && (
          <div className="result-section">
            <p>🧠 Final Classification: <strong>{result.toUpperCase()}</strong></p>
            <button onClick={reset}>Try Another Image</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
