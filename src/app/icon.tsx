import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Favicon URL from ImageKit
const FAVICON_URL = 'https://ik.imagekit.io/affin/brno%20favicon.png';

// Generate icon by fetching from ImageKit
export default async function Icon() {
  try {
    // Fetch the favicon from ImageKit
    const response = await fetch(FAVICON_URL, {
      cache: 'force-cache', // Cache the favicon
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favicon');
    }

    const imageBuffer = await response.arrayBuffer();
    
    // Return the image as a Response
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Fallback: return a simple icon
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#1d4ed8',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
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

