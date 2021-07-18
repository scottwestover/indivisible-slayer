export default function openExternalLink(url: string): void {
  const s = window.open(url, '_blank');

  if (s && s.focus) {
    s.focus();
  } else if (!s) {
    window.location.href = url;
  }
}
