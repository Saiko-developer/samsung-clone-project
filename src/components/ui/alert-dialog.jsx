"use client";

export function AlertDialog({ open, onOpenChange, children, className = "" }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-10 alert-dialog-overlay"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onClick={() => onOpenChange(false)}
    >
      <div className="fixed inset-0 bg-black/50" />
      <div
        className={`relative z-50 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md mx-4 my-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function AlertDialogTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function AlertDialogDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>;
}

export function AlertDialogFooter({ children, className = "" }) {
  return <div className={`flex justify-end gap-2 mt-6 ${className}`}>{children}</div>;
}

export function AlertDialogAction({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition ${className}`}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition ${className}`}
    >
      {children}
    </button>
  );
}
