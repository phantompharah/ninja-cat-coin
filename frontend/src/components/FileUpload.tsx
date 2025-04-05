import React, { useState, useRef, useCallback } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

interface FileUploadProps {
  onUploadSuccess?: (fileData: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    // Check if file is an image
    if (!selectedFile.type.match(/^image\/(jpg|jpeg|png|gif)$/)) {
      setError('Please upload an image file (jpg, jpeg, png, gif)');
      return;
    }

    // Check file size (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setSuccess(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('File uploaded successfully!');
      if (onUploadSuccess) {
        onUploadSuccess(response.data.file);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="bg-dark text-light">
      <Card.Body>
        <Card.Title>Upload Image</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <div
          className={`upload-area p-5 text-center border rounded ${isDragging ? 'border-primary' : 'border-secondary'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ 
            backgroundColor: isDragging ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
            cursor: 'pointer'
          }}
          onClick={handleBrowseClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/gif"
            style={{ display: 'none' }}
          />
          
          {preview ? (
            <div>
              <img 
                src={preview} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '1rem' }} 
              />
              <p className="mb-2">{file?.name}</p>
              <Button 
                variant="primary" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload();
                }}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Uploading...</span>
                  </>
                ) : (
                  'Upload'
                )}
              </Button>
            </div>
          ) : (
            <div>
              <i className="bi bi-cloud-upload fs-1 mb-3"></i>
              <p>Drag and drop an image here, or click to browse</p>
              <p className="text-muted small">Supported formats: JPG, JPEG, PNG, GIF (max 10MB)</p>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default FileUpload; 