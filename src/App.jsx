import { useState, useRef, useEffect, Component } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode, ChevronDown, ChevronUp } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetDependency !== this.props.resetDependency && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="empty-state">
          <p style={{ color: '#ef4444', fontSize: '0.9rem', padding: '1rem' }}>⚠️ Data too large or complex for a QR code.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [pop, setPop] = useState(false);
  
  const qrRef = useRef(null);
  const MAX_CHARS = 2000;

  const getQRLevel = (length) => {
    if (length > 1600) return 'L';
    if (length > 1000) return 'M';
    if (length > 500) return 'Q';
    return 'H';
  };

  // Safely trigger GoatCounter custom events
  const trackEvent = (path, title) => {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: `deqr.dekker.dev/${path}`,
        title: title,
        event: true,
      });
    }
  };

  // Analytics for generating QR code (debounced to avoid spamming on keystrokes)
  useEffect(() => {
    if (!inputValue) return;
    const timer = setTimeout(() => {
      trackEvent('generate-qr', 'Generated QR Code');
    }, 1500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Trigger brief pop animation when input changes
  useEffect(() => {
    if (inputValue) {
      const startTimer = setTimeout(() => setPop(true), 10);
      const endTimer = setTimeout(() => setPop(false), 310);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [inputValue]);

  const handleDownload = () => {
    trackEvent('download-qr', 'Downloaded QR Code');
    
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>DeQR</h1>
        <p>Free. Open-Source. Ad-Free. Privacy-First. No Signups.</p>
      </div>

      <div className="glass-card">
        <div className="input-group">
          <label htmlFor="qr-input">Data URL or Text</label>
          <div className="input-with-counter">
            <textarea
              id="qr-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.trimStart().slice(0, MAX_CHARS))}
              placeholder="e.g. https://example.com"
              autoComplete="off"
              spellCheck="false"
              maxLength={MAX_CHARS}
              rows={4}
            />
            <div className={`char-counter ${inputValue.length >= MAX_CHARS ? 'limit-reached' : ''}`}>
              {inputValue.length}/{MAX_CHARS}
            </div>
          </div>
        </div>

        <button 
          className="advanced-toggle" 
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          Advanced Options
        </button>

        {showAdvanced && (
          <div className="advanced-content">
            <div className="input-group">
              <label>Custom Colors</label>
              <div className="color-pickers">
                <div className="color-picker">
                  <input 
                    type="color" 
                    value={fgColor} 
                    onChange={(e) => setFgColor(e.target.value)} 
                  />
                  <span>Foreground</span>
                </div>
                <div className="color-picker">
                  <input 
                    type="color" 
                    value={bgColor} 
                    onChange={(e) => setBgColor(e.target.value)} 
                  />
                  <span>Background</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="qr-display-container">
          {inputValue ? (
            <div className={`qr-code-wrapper ${pop ? 'animate-pop' : ''}`} ref={qrRef} style={{ background: bgColor }}>
              <ErrorBoundary resetDependency={inputValue}>
                <QRCodeCanvas
                  value={inputValue}
                  size={200}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={getQRLevel(inputValue.length)}
                  includeMargin={false}
                />
              </ErrorBoundary>
            </div>
          ) : (
            <div className="empty-state">
              <QrCode size={48} strokeWidth={1} />
              <p>Enter text to generate QR</p>
            </div>
          )}
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleDownload}
          disabled={!inputValue}
        >
          <Download size={20} />
          Save image
        </button>
      </div>

      <div className="footer-links">
        <a href="https://github.com/wdekker/deqr" target="_blank" rel="noopener noreferrer">Open Source on GitHub</a>
        <span className="dot">•</span>
        <a href="https://www.dekker.dev/contact/" target="_blank" rel="noopener noreferrer">Contact</a>
      </div>
    </div>
  );
}

export default App;
