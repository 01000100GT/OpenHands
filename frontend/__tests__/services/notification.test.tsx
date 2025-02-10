import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { sendNotification } from '../../src/services/notification';

interface NotificationConstructor {
  new (title: string, options?: NotificationOptions): Notification;
  readonly permission: NotificationPermission;
  readonly maxActions: number;
  requestPermission(): Promise<NotificationPermission>;
}

describe('sendNotification', () => {
  let mockNotification: Mock & {
    permission: NotificationPermission;
    requestPermission: () => Promise<NotificationPermission>;
  };

  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = vi.fn();
    Storage.prototype.setItem = vi.fn();

    // Mock Notification API
    mockNotification = vi.fn((title: string, options?: NotificationOptions) => ({
      title,
      ...options,
    })) as Mock & {
      permission: NotificationPermission;
      requestPermission: () => Promise<NotificationPermission>;
    };
    Object.defineProperty(mockNotification, 'permission', {
      get: () => 'granted',
      configurable: true
    });
    mockNotification.requestPermission = vi.fn().mockResolvedValue('granted');

    // Set up the window.Notification mock
    const NotificationMock = mockNotification as unknown as NotificationConstructor;
    Object.defineProperty(window, 'Notification', {
      value: NotificationMock,
      writable: true,
    });
  });

  it('should send notification when notifications are enabled', () => {
    // Mock notifications being enabled
    vi.mocked(Storage.prototype.getItem).mockReturnValue('true');

    const title = 'Test Title';
    const options = {
      body: 'Test Body',
      icon: '/test-icon.png'
    };

    sendNotification(title, options);

    expect(mockNotification).toHaveBeenCalledWith(title, options);
  });

  it('should not send notification when notifications are disabled', () => {
    // Mock notifications being disabled
    vi.mocked(Storage.prototype.getItem).mockReturnValue('false');

    sendNotification('Test Title', { body: 'Test Body' });

    expect(mockNotification).not.toHaveBeenCalled();
  });

  it('should not send notification when permission is not granted', () => {
    // Mock notifications being enabled but permission not granted
    vi.mocked(Storage.prototype.getItem).mockReturnValue('true');

    // Change permission to denied
    Object.defineProperty(mockNotification, 'permission', {
      get: () => 'denied',
      configurable: true
    });

    sendNotification('Test Title', { body: 'Test Body' });

    expect(mockNotification).not.toHaveBeenCalled();
  });

  it('should request permission and send notification when permission is default', async () => {
    // Mock notifications being enabled
    vi.mocked(Storage.prototype.getItem).mockReturnValue('true');

    // Set permission to default
    Object.defineProperty(mockNotification, 'permission', {
      get: () => 'default',
      configurable: true
    });

    const title = 'Test Title';
    const options = {
      body: 'Test Body',
      icon: '/test-icon.png'
    };

    await sendNotification(title, options);

    expect(mockNotification.requestPermission).toHaveBeenCalled();
    expect(mockNotification).toHaveBeenCalledWith(title, options);
  });
});