import { Linking, Platform } from 'react-native';

export async function openExternalLink(url: string) {
  if (Platform.OS === 'web') {
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) throw new Error('The browser blocked opening a new tab.');
    return;
  }
  await Linking.openURL(url);
}
