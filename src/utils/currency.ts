export const formatPrice = (priceInIdr: number, language: 'EN' | 'ID'): string => {
  if (language === 'ID') {
    // Format Indonesia (Miliar / Juta)
    if (priceInIdr >= 1000000000) {
      return `IDR ${(priceInIdr / 1000000000).toFixed(1)} M`;
    } else if (priceInIdr >= 1000000) {
      return `IDR ${(priceInIdr / 1000000).toFixed(0)} Jt`;
    }
    return `IDR ${priceInIdr.toLocaleString('id-ID')}`;
  } else {
    // Format Inggris (Konversi kasar ke USD, kurs 15.000)
    const priceInUsd = priceInIdr / 15000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 3,
    }).format(priceInUsd);
  }
};