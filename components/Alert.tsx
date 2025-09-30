"use client";

interface AlertProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
  show: boolean;
}

export default function Alert({ type, message, onClose, show }: AlertProps) {
  if (!show) return null;

  const alertStyles = {
    success: "bg-green-500/10 border-green-500/20 text-green-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  };

  const iconStyles = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div
        className={`${alertStyles[type]} border rounded-lg p-4 flex items-center gap-3 shadow-lg backdrop-blur-sm`}
      >
        <span className="text-lg">{iconStyles[type]}</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
