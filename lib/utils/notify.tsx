'use client';

import { Id, ToastContent, ToastOptions, UpdateOptions, toast } from 'react-toastify';
import { NotificationMsg } from '@/ui';

// Notifications props
interface NotifProps extends ToastOptions<object> {
  content?: ToastContent<unknown>;
  message?: string;
  subtitle?: string;
}

// Update notifications props
interface UpdateNotifProps extends UpdateOptions<object> {
  content?: ToastContent<unknown>;
  message?: string;
  subtitle?: string;
}

// Success notifications trigger
const success = ({ content, message, subtitle, ...options }: NotifProps) =>
  toast.success(content ? content : <NotificationMsg message={message} subtitle={subtitle} />, {
    icon: false,
    ...options,
  });

// Error notifications trigger
const error = ({ content, message, subtitle, ...options }: NotifProps) =>
  toast.error(
    content ? content : <NotificationMsg message={message} subtitle={subtitle} type="error" />,
    {
      icon: false,
      ...options,
    }
  );

// Update notifications trigger
const update = (id: Id, { content, message, subtitle, ...props }: UpdateNotifProps) =>
  toast.update(id, {
    render: content ? content : <NotificationMsg message={message} subtitle={subtitle} />,
    icon: false,
    ...props,
  });

// Dismiss all notifications
const dismissAll = () => toast.dismiss();

export { success, error, update, dismissAll };
