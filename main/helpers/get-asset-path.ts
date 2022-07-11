const getAssetPath = (assetName: string): string => {
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? `../../resources/${assetName}` : `resources/${assetName}`;
};

export default getAssetPath;
