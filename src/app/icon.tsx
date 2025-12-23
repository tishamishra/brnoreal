// Favicon URL from ImageKit
const FAVICON_URL = 'https://ik.imagekit.io/affin/brno%20favicon?updatedAt=1766503541628';

// Image metadata - actual image is 500x500 JPEG
export const size = {
  width: 500,
  height: 500,
};
export const contentType = 'image/jpeg';

// Generate icon by fetching from ImageKit
export default async function Icon() {
  try {
    // Fetch the favicon from ImageKit
    const response = await fetch(FAVICON_URL, {
      cache: 'force-cache',
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch favicon: ${response.status}`);
    }

    // Get the actual content type from response
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await response.arrayBuffer();
    
    // Return the image as a Response with proper headers
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Return a simple fallback - but this shouldn't happen in production
    return new Response(
      JSON.stringify({ error: 'Favicon not available' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

