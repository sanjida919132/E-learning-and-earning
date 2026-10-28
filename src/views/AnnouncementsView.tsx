import React, { useState } from 'react';
import { Announcement } from '../types/elearning';
import { useAuth } from '../context/AuthContext';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Calendar, 
  Pin, 
  Tag, 
  X, 
  Search,
  CheckCircle2,
  AlertCircle,
  Megaphone
} from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  onAddAnnouncement,
  onDeleteAnnouncement
}) => {
  const { hasRole, currentUser } = useAuth();
  const isAdmin = hasRole(['ADMIN']);

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<Announcement['category']>('Batch Announcement');
  const [formDescription, setFormDescription] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) {
      setFormError('Please fill in both title and description.');
      return;
    }

    const newAnn: Announcement = {
      id: `ANN-SRJ-${Date.now().toString().slice(-4)}`,
      title: formTitle.trim(),
      category: formCategory,
      description: formDescription.trim(),
      date: formDate,
      author: currentUser ? currentUser.name : 'Branch Administration',
      isPinned: formIsPinned
    };

    onAddAnnouncement(newAnn);
    setIsAddModalOpen(false);
    setFormTitle('');
    setFormDescription('');
  };

  const filteredAnnouncements = announcements.filter(ann => {
    if (categoryFilter !== 'ALL' && ann.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ann.title.toLowerCase().includes(q);
      const matchDesc = ann.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            News, Updates & Center Circulars
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official announcements from E-Learning and Earning, Sirajganj Center
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setFormTitle('');
              setFormDescription('');
              setFormDate(new Date().toISOString().split('T')[0]);
              setFormIsPinned(false);
              setFormError(null);
              setIsAddModalOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Circular</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars by keyword..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 px-3 py-2 rounded-xl outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs text-slate-800 px-3 py-2 rounded-xl outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Batch Announcement">Batch Announcement</option>
            <option value="Course Registration">Course Registration</option>
            <option value="Class Schedule">Class Schedule</option>
            <option value="Exam / Certification">Exam / Certification</option>
            <option value="Notice">Notice</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className={`p-5 rounded-2xl border bg-white shadow-xs transition-all hover:shadow-md relative overflow-hidden ${
              ann.isPinned ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200/80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {ann.category}
                  </span>

                  {ann.isPinned && (
                    <span className="flex items-center space-x-1 font-bold text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      <Pin className="w-3 h-3 text-amber-700" />
                      <span>Pinned Circular</span>
                    </span>
                  )}

                  <span className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{ann.date}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {ann.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed max-w-4xl whitespace-pre-line">
                  {ann.description}
                </p>

                <div className="pt-2 text-[11px] text-slate-400">
                  Published by: <strong className="text-slate-700">{ann.author}</strong>
                </div>
              </div>

              {/* Admin delete */}
              {isAdmin && (
                <button
                  onClick={() => onDeleteAnnouncement(ann.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors self-end sm:self-start shrink-0"
                  title="Remove Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Announcement Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Publish New Announcement</h3>
                <p className="text-xs text-slate-400">Sirajganj Center Notice Board</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 font-medium rounded-xl">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Circular Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Schedule Update for Batch 02"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  >
                    <option value="Batch Announcement">Batch Announcement</option>
                    <option value="Course Registration">Course Registration</option>
                    <option value="Class Schedule">Class Schedule</option>
                    <option value="Exam / Certification">Exam / Certification</option>
                    <option value="Notice">Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Announcement Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Write full circular text..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 text-slate-900 px-3 py-2 rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pinNotice"
                  checked={formIsPinned}
                  onChange={(e) => setFormIsPinned(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <label htmlFor="pinNotice" className="text-slate-700 font-semibold cursor-pointer">
                  Pin to top of notice board
                </label>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
