import React, { useState } from 'react';
import { Bell, Calendar, Upload, X, File, Image as ImageIcon } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: 'image' | 'pdf';
  }[];
}

export default function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    type: 'Academic',
    attachments: [] as { id: string; name: string; url: string; type: 'image' | 'pdf' }[]
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('image/') ? 'image' : 'pdf';
        
        setNewNotice(prev => ({
          ...prev,
          attachments: [
            ...prev.attachments,
            {
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              url,
              type
            }
          ]
        }));
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const notice: Notice = {
      id: Math.random().toString(36).substr(2, 9),
      ...newNotice,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices(prev => [notice, ...prev]);
    setIsModalOpen(false);
    setNewNotice({ title: '', content: '', type: 'Academic', attachments: [] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Notices</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create Notice
        </button>
      </div>

      <div className="grid gap-6">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Bell className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{notice.title}</h3>
                  <p className="text-sm text-gray-500">{notice.type}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">{notice.date}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{notice.content}</p>
            
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                <div className="grid grid-cols-2 gap-4">
                  {notice.attachments.map(attachment => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                    >
                      {attachment.type === 'image' ? (
                        <ImageIcon className="h-5 w-5 text-gray-400 mr-2" />
                      ) : (
                        <File className="h-5 w-5 text-gray-400 mr-2" />
                      )}
                      <span className="text-sm text-gray-600 truncate">{attachment.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create New Notice</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newNotice.type}
                  onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option>Academic</option>
                  <option>Event</option>
                  <option>Meeting</option>
                  <option>General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  required
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>

                {newNotice.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {newNotice.attachments.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => setNewNotice(prev => ({
                            ...prev,
                            attachments: prev.attachments.filter(f => f.id !== file.id)
                          }))} 
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
