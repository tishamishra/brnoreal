import { ImageResponse } from 'next/og';

// Image metadata - 512x512 as requested
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

// Favicon URL from ImageKit
const FAVICON_URL = 'https://ik.imagekit.io/affin/brno%20favicon?updatedAt=1766503541628';

// Generate icon by fetching from ImageKit
export default async function Icon() {
  try {
    // Fetch the favicon from ImageKit
    const response = await fetch(FAVICON_URL, {
      cache: 'force-cache', // Cache the favicon
      next: { revalidate: 86400 }, // Revalidate once per day
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favicon');
    }

    const imageBuffer = await response.arrayBuffer();
    
    // Return the image as a Response with proper headers
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Fallback: return a simple icon with solid background
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1d4ed8',
            fontSize: 200,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          BR
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

