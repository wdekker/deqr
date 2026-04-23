import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('QR Code Generator App', () => {
  it('renders the header and initial empty state', () => {
    render(<App />);
    expect(screen.getByText('DeQR')).toBeInTheDocument();
    expect(screen.getByText('Free. Open-Source. Ad-Free. Privacy-First. No Signups.')).toBeInTheDocument();
    expect(screen.getByText('Enter text to generate QR')).toBeInTheDocument();
    
    const downloadBtn = screen.getByRole('button', { name: /save qr code/i });
    expect(downloadBtn).toBeDisabled();
  });

  it('updates char counter and enables download when user types', () => {
    render(<App />);
    const input = screen.getByLabelText(/Data URL or Text/i);
    
    // Type something
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    
    // Counter should update
    expect(screen.getByText('19/2000')).toBeInTheDocument();
    
    // Canvas should now exist instead of empty state
    const qrCanvas = document.querySelector('canvas');
    expect(qrCanvas).toBeInTheDocument();
    
    // Download should be enabled
    const downloadBtn = screen.getByRole('button', { name: /save qr code/i });
    expect(downloadBtn).not.toBeDisabled();
  });

  it('shows advanced options when toggled', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: /advanced options/i });
    
    // Initially advanced options are hidden
    expect(screen.queryByText('Custom Colors')).not.toBeInTheDocument();
    
    // Toggled on
    fireEvent.click(toggle);
    expect(screen.getByText('Custom Colors')).toBeInTheDocument();
    expect(screen.getByText('Foreground')).toBeInTheDocument();
    
    // Toggled off
    fireEvent.click(toggle);
    expect(screen.queryByText('Custom Colors')).not.toBeInTheDocument();
  });
});
