"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  uploadedBy: {
    name?: string;
    email: string;
  };
}

export default function MediaLibraryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && !['ADMIN', 'WRITER'].includes(session.user.role)) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch('/api/dashboard/writer/media');
        if (response.ok) {
          const data = await response.json();
          setMediaFiles(data);
        }
      } catch (error) {
        console.error('Error fetching media files:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session && ['ADMIN', 'WRITER'].includes(session.user.role)) {
      fetchMediaFiles();
    }
  }, [session]);

  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return;

    setUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/dashboard/writer/media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploadedFiles = await response.json();
        setMediaFiles(prev => [...uploadedFiles, ...prev]);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const deleteSelectedFiles = async () => {
    if (selectedFiles.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) return;

    try {
      const response = await fetch('/api/dashboard/writer/media', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileIds: selectedFiles }),
      });

      if (response.ok) {
        setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error('Error deleting files:', error);
    }
  };

  const copyToClipboard = (fileOrUrl: any) => {
    // Handle both file object and URL string
    const url = typeof fileOrUrl === 'string' ? fileOrUrl : fileOrUrl.publicUrl || fileOrUrl.url;

    // Get the full URL with domain
    const fullUrl = window.location.origin + url;

    navigator.clipboard.writeText(fullUrl);

    // Update copied state for visual feedback
    if (typeof fileOrUrl === 'object' && fileOrUrl.id) {
      setCopiedUrl(fileOrUrl.id);
      setTimeout(() => setCopiedUrl(''), 2000);
    } else {
      alert('URL copied to clipboard: ' + fullUrl);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('video/')) return '🎥';
    if (mimeType.startsWith('audio/')) return '🎵';
    if (mimeType.includes('pdf')) return '📄';
    return '📁';
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="text-white">Loading media library...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#121417' }}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #4A8E55 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[20%] w-[350px] h-[350px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #C3A355 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 20, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b" style={{ borderColor: 'rgba(74, 142, 85, 0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm mb-2 hover:opacity-80 transition-opacity"
                style={{ color: '#8A94A6' }}
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-light tracking-wider" style={{ color: '#E8ECEF' }}>
                Media Library
              </h1>
              <p className="text-sm mt-1" style={{ color: '#8A94A6' }}>
                Manage your media assets
              </p>
            </div>

            <div className="flex gap-3">
              {selectedFiles.length > 0 && (
                <button
                  onClick={deleteSelectedFiles}
                  className="px-4 py-2 rounded-lg font-light transition-all duration-300 hover:opacity-80"
                  style={{
                    background: 'rgba(220, 38, 38, 0.2)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    color: '#DC2626',
                  }}
                >
                  Delete Selected ({selectedFiles.length})
                </button>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #4A8E55 0%, #C3A355 100%)',
                  color: '#121417',
                }}
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg w-64"
                style={{
                  background: 'rgba(42, 46, 53, 0.8)',
                  border: '1px solid rgba(74, 142, 85, 0.2)',
                  color: '#E8ECEF',
                }}
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
                  style={{
                    background: 'rgba(74, 142, 85, 0.2)',
                    border: '1px solid rgba(74, 142, 85, 0.3)',
                    color: '#4A8E55',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
                  style={{
                    background: 'rgba(74, 142, 85, 0.2)',
                    border: '1px solid rgba(74, 142, 85, 0.3)',
                    color: '#4A8E55',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-sm" style={{ color: '#8A94A6' }}>
              {filteredFiles.length} of {mediaFiles.length} files
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {filteredFiles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-light mb-2" style={{ color: '#E8ECEF' }}>
                {mediaFiles.length === 0 ? 'No media files yet' : 'No files match your search'}
              </h3>
              <p className="text-sm mb-6" style={{ color: '#8A94A6' }}>
                {mediaFiles.length === 0 ? 'Upload your first media file to get started' : 'Try adjusting your search terms'}
              </p>
              {mediaFiles.length === 0 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 rounded-lg font-light transition-all duration-300 hover:opacity-80"
                  style={{
                    background: 'linear-gradient(135deg, #4A8E55 0%, #C3A355 100%)',
                    color: '#121417',
                  }}
                >
                  Upload First File
                </button>
              )}
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={`rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedFiles.includes(file.id) ? 'ring-2 ring-[#4A8E55]' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(74, 142, 85, 0.2)',
                  }}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  {/* File Preview */}
                  <div className="aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                    {file.mimeType.startsWith('image/') ? (
                      <img
                        src={file.url}
                        alt={file.filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">
                        {getFileIcon(file.mimeType)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="text-sm">
                    <div className="font-light mb-1 truncate" style={{ color: '#E8ECEF' }}>
                      {file.filename}
                    </div>
                    <div className="text-xs mb-2" style={{ color: '#8A94A6' }}>
                      {formatFileSize(file.size)}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(file.url);
                        }}
                        className="flex-1 px-2 py-1 rounded text-xs transition-all hover:opacity-80"
                        style={{
                          background: 'rgba(74, 142, 85, 0.2)',
                          color: '#4A8E55',
                        }}
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(42, 46, 53, 0.8) 0%, rgba(42, 46, 53, 0.4) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(74, 142, 85, 0.2)',
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(74, 142, 85, 0.2)' }}>
                      <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                        <input
                          type="checkbox"
                          checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFiles(filteredFiles.map(f => f.id));
                            } else {
                              setSelectedFiles([]);
                            }
                          }}
                          className="rounded"
                          style={{ accentColor: '#4A8E55' }}
                        />
                      </th>
                      <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                        File
                      </th>
                      <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                        Size
                      </th>
                      <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                        Uploaded
                      </th>
                      <th className="text-left p-4 text-sm font-light" style={{ color: '#8A94A6' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <motion.tr
                        key={file.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ borderBottom: '1px solid rgba(74, 142, 85, 0.1)' }}
                        className="hover:bg-black/20 transition-colors"
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => toggleFileSelection(file.id)}
                            className="rounded"
                            style={{ accentColor: '#4A8E55' }}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                              {file.mimeType.startsWith('image/') ? (
                                <img
                                  src={file.url}
                                  alt={file.filename}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="text-xl">
                                  {getFileIcon(file.mimeType)}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-light" style={{ color: '#E8ECEF' }}>
                                {file.filename}
                              </div>
                              <div className="text-xs" style={{ color: '#8A94A6' }}>
                                {file.mimeType}
                                {file.width && file.height && (
                                  <span className="ml-2">{file.width}×{file.height}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm" style={{ color: '#8A94A6' }}>
                          {formatFileSize(file.size)}
                        </td>
                        <td className="p-4 text-sm" style={{ color: '#8A94A6' }}>
                          <div>{new Date(file.uploadedAt).toLocaleDateString()}</div>
                          <div className="text-xs">by {file.uploadedBy.name || 'Unknown'}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => copyToClipboard(file)}
                              className="px-3 py-1 rounded text-xs transition-all hover:opacity-80"
                              style={{
                                background: copiedUrl === file.id ? 'rgba(195, 163, 85, 0.2)' : 'rgba(74, 142, 85, 0.2)',
                                color: copiedUrl === file.id ? '#C3A355' : '#4A8E55',
                              }}
                            >
                              {copiedUrl === file.id ? (
                                <span className="flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Copied!
                                </span>
                              ) : (
                                'Copy URL'
                              )}
                            </button>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded text-xs transition-all hover:opacity-80"
                              style={{
                                background: 'rgba(138, 148, 166, 0.2)',
                                color: '#8A94A6',
                              }}
                            >
                              View
                            </a>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        className="hidden"
      />
    </div>
  );
}