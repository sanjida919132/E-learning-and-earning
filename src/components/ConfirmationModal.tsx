import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete Record',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="p-5 pb-4 flex items-start space-x-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isDestructive ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="flex-1 pr-6">
            <h3 className="text-lg font-bold text-slate-900">
              {title}
            </h3>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Callout */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-b border-slate-100 text-xs text-slate-500 font-medium flex items-center justify-between">
          <span>Action cannot be undone once confirmed.</span>
          <span className="font-semibold text-rose-600 uppercase text-[10px] tracking-wider">Permanent</span>
        </div>

        {/* Actions */}
        <div className="p-4 bg-white flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-sm transition-all ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800'
                : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
