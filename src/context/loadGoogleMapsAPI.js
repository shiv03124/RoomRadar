let isScriptLoading = false;

export function loadGoogleMapsScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      return resolve(window.google);
    }

    if (isScriptLoading) {
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      existingScript?.addEventListener('load', () => resolve(window.google));
      return;
    }

    isScriptLoading = true;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
}
