export async function calculateDistance(
  origin: string,
  destination: string
): Promise<{ distanceKm: number; duration: string } | null> {
  return new Promise((resolve) => {
    if (!window.google) {
      resolve(null);
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (
          status === "OK" &&
          response?.rows[0]?.elements[0]?.status === "OK"
        ) {
          const element = response.rows[0].elements[0];
          const distanceKm = Math.round(element.distance.value / 1000);
          const duration = element.duration.text;
          resolve({ distanceKm, duration });
        } else {
          resolve(null);
        }
      }
    );
  });
}
