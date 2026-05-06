export const slugify = (text) => {
  if (!text) return '';
  let processed = text.toString().toLowerCase()
    .replace(/^\d+\s+days?\s+/i, '') // Strip duration like "7 Days " or "14 Days "
    .trim();
    
  return processed
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export const tourImages = {
  // Main Packages (based on slugified titles)
  'magical-kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop',
  'grand-southern-heritage': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop',
  'munnar-weekend-escape': 'https://images.unsplash.com/photo-1596484552993-9d4cb733eb0c?q=80&w=1000&auto=format&fit=crop',
  'backwater-beach-bliss': 'https://images.unsplash.com/photo-1593693175869-79a83441589c?q=80&w=1000&auto=format&fit=crop',
  'temple-city-tour': 'https://images.unsplash.com/photo-1588698511634-80cf2a4d9435?q=80&w=1000&auto=format&fit=crop',
  'ooty-kodaikanal': 'https://images.unsplash.com/photo-1627448833912-7043329007cb?q=80&w=1000&auto=format&fit=crop',
  'rameshwaram-pilgrimage': 'https://images.unsplash.com/photo-1624641982705-021021bc69ba?q=80&w=1000&auto=format&fit=crop',
  'wayanad-wilderness': 'https://images.unsplash.com/photo-1589146914589-9fc6bbf200b3?q=80&w=1000&auto=format&fit=crop',
  'pondicherry-retreat': 'https://images.unsplash.com/photo-1621516087532-6b9c97b25203?q=80&w=1000&auto=format&fit=crop',
  'yercaud-kolli-hills': 'https://images.unsplash.com/photo-1592598375127-ec1642861a4c?q=80&w=1000&auto=format&fit=crop',
  'chikmagalur-coffee-trails': 'https://images.unsplash.com/photo-1602490807664-8df6322ad44a?q=80&w=1000&auto=format&fit=crop',
  'trivandrum-coastal-vibe': 'https://images.unsplash.com/photo-1589201584449-74e8a8e3d09e?q=80&w=1000&auto=format&fit=crop',
  'historical-hampi': 'https://images.unsplash.com/photo-1600080645604-db80cb70e30d?q=80&w=1000&auto=format&fit=crop',
  'andaman-escape': 'https://images.unsplash.com/photo-1605553950269-026048d08cb5?q=80&w=1000&auto=format&fit=crop',
  'golden-amritsar': 'https://images.unsplash.com/photo-1601058269781-a9f9479b1df0?q=80&w=1000&auto=format&fit=crop',
  'golden-triangle-heritage': 'https://images.unsplash.com/photo-1585145889600-410a5605f63d?q=80&w=1000&auto=format&fit=crop',
  'royal-rajasthan-odyssey': 'https://images.unsplash.com/photo-1477584262148-1916ee094db7?q=80&w=1000&auto=format&fit=crop',
  'kashmir-paradise': 'https://images.unsplash.com/photo-1566371486490-560ded239dae?q=80&w=1000&auto=format&fit=crop',
  'himalayan-escapade': 'https://images.unsplash.com/photo-1584285418504-004110ca410b?q=80&w=1000&auto=format&fit=crop',
  'uttarakhand-spiritual': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop',
  'sikkim-darjeeling': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop',
  'meghalaya-wonders': 'https://images.unsplash.com/photo-1610427845344-93825700778c?q=80&w=1000&auto=format&fit=crop',
  'gujarat-cultural-safari': 'https://images.unsplash.com/photo-1596765799797-2a1f81d4a034?q=80&w=1000&auto=format&fit=crop',
  'heart-of-india': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000&auto=format&fit=crop',
  'goa-coastal-tour': 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?q=80&w=1000&auto=format&fit=crop',

  // Fallbacks for States
  'kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1280&auto=format&fit=crop',
  'tamil-nadu': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1280&auto=format&fit=crop',
  'karnataka': 'https://images.unsplash.com/photo-1600080645604-db80cb70e30d?q=80&w=1280&auto=format&fit=crop',
  'rajasthan': 'https://images.unsplash.com/photo-1477584262148-1916ee094db7?q=80&w=1280&auto=format&fit=crop',
  'gujarat': 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1280&auto=format&fit=crop',
  'goa': 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?q=80&w=1280&auto=format&fit=crop',
  'andaman-nicobar': 'https://images.unsplash.com/photo-1605553950269-026048d08cb5?q=80&w=1280&auto=format&fit=crop',
  'madhya-pradesh': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1280&auto=format&fit=crop'
};

export const getTourImage = (destination) => {
  if (!destination) return null;
  const slug = slugify(destination);
  return tourImages[slug] || null;
};
