-- Update all property images with fresh, working Unsplash URLs
-- These are high-quality property images that should load properly

UPDATE listings
SET image = CASE slug
  -- Featured properties with premium images
  WHEN 'masarykova-garden-villa' THEN 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  WHEN 'svratka-riverside-loft' THEN 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  WHEN 'kralovo-pole-skyline-residence' THEN 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80'
  WHEN 'zabovresky-townhouse' THEN 'https://images.unsplash.com/photo-1600566753190-17f0baa2a74c?auto=format&fit=crop&w=1200&q=80'
  WHEN 'vinohrady-design-penthouse' THEN 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
  WHEN 'spilberk-investment-palace' THEN 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  WHEN 'olomouc-heritage-residence' THEN 'https://images.unsplash.com/photo-1600607688969-a5fcd326165d?auto=format&fit=crop&w=1200&q=80'
  WHEN 'brno-tech-campus-lofts' THEN 'https://images.unsplash.com/photo-1600607688787-1c67f31ac874?auto=format&fit=crop&w=1200&q=80'
  
  -- Fallback for any other listings
  ELSE 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
END
WHERE slug IN (
  'masarykova-garden-villa',
  'svratka-riverside-loft',
  'kralovo-pole-skyline-residence',
  'zabovresky-townhouse',
  'vinohrady-design-penthouse',
  'spilberk-investment-palace',
  'olomouc-heritage-residence',
  'brno-tech-campus-lofts'
);

-- Alternative: Update all listings with a single high-quality image URL
-- Uncomment below if you want all listings to use the same image template
-- UPDATE listings
-- SET image = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
-- WHERE image IS NULL OR image = '';
