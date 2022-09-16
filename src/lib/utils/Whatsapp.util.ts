export function sendWpMessage(text: string) {
  window.open(`https://api.whatsapp.com/send?phone=573145241813&text=${encodeURIComponent(text)}`, '_blank', 'noopener=true,noreferrer=true');
}
