import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../redux/uiSlice';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiExclamationTriangle, HiXMark } from 'react-icons/hi2';

const iconMap = {
  success: HiCheckCircle,
  error: HiExclamationCircle,
  info: HiInformationCircle,
  warning: HiExclamationTriangle,
};

const colorMap = {
  success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
};

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500',
};

const ToastItem = ({ toast }) => {
  const dispatch = useDispatch();
  const Icon = iconMap[toast.type] || iconMap.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [dispatch, toast.id, toast.duration]);

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${colorMap[toast.type] || colorMap.info} animate-slide-in-right backdrop-blur-sm`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColorMap[toast.type] || iconColorMap.info}`} />
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Dismiss toast"
      >
        <HiXMark className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const toasts = useSelector((state) => state.ui.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
