import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Apple icon URL from ImageKit
const APPLE_ICON_URL = 'https://ik.imagekit.io/affin/brno%20favicon.png';

// Generate apple icon by fetching from ImageKit
export default async function AppleIcon() {
  try {
    // Fetch the icon from ImageKit
    const response = await fetch(APPLE_ICON_URL, {
      cache: 'force-cache', // Cache the icon
    });

    if (!response.ok) {
      throw new Error('Failed to fetch apple icon');
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
    console.error('Error fetching apple icon:', error);
    // Fallback: return a simple icon
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
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

