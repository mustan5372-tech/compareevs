/**
 * Official Vehicle Imagery API Integration (api.vehicleimagery.com)
 * Fetches real vehicle photographs and renders via the vehicleimagery.com API endpoint.
 */

export const VEHICLE_IMAGERY_BASE_URL = "https://api.vehicleimagery.com";

/**
 * Returns exact vehicle image URL from https://api.vehicleimagery.com
 * @param {string} brand - Vehicle Manufacturer (e.g. Tata, MG, Mahindra, BYD, Hyundai, BMW)
 * @param {string} modelName - EV Model Name (e.g. Nexon EV, Windsor EV, BE 6e, IONIQ 5)
 */
export function getVehicleImageryApiUrl(brand, modelName) {
  let make = brand.toLowerCase().replace(/ motors| auto| motor/g, '').trim();
  let model = modelName.toLowerCase()
    .replace(brand.toLowerCase(), '')
    .replace('ev', '')
    .replace('gen 2', '')
    .replace('facelift', '')
    .replace('(', '').replace(')', '')
    .trim()
    .replace(/\s+/g, '-');

  // Normalize model names for Vehicle Imagery API
  if (make === 'tata') {
    if (model.includes('nexon')) model = 'nexon';
    else if (model.includes('punch')) model = 'punch';
    else if (model.includes('curvv')) model = 'curvv';
    else if (model.includes('tiago')) model = 'tiago';
    else if (model.includes('tigor')) model = 'tigor';
  } else if (make === 'mg') {
    if (model.includes('windsor')) model = 'windsor';
    else if (model.includes('comet')) model = 'comet';
    else if (model.includes('zs')) model = 'zs';
  } else if (make === 'mahindra') {
    if (model.includes('be') || model.includes('6e')) model = 'be-6e';
    else if (model.includes('xev') || model.includes('9e')) model = 'xev-9e';
    else if (model.includes('xuv400')) model = 'xuv400';
  } else if (make === 'byd') {
    if (model.includes('seal')) model = 'seal';
    else if (model.includes('atto')) model = 'atto-3';
    else if (model.includes('emax') || model.includes('e6')) model = 'emax-7';
  } else if (make === 'hyundai') {
    if (model.includes('ioniq')) model = 'ioniq-5';
  } else if (make === 'bmw') {
    if (model.includes('i4')) model = 'i4';
  } else if (make === 'ola') {
    model = 's1-pro';
  } else if (make === 'ather') {
    model = '450-apex';
  } else if (make === 'tvs') {
    model = 'iqube';
  }

  return `${VEHICLE_IMAGERY_BASE_URL}/v1/image?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=2025`;
}

/**
 * Imagin.Studio 3D Vehicle Render API helper
 */
export function getImaginStudioUrl(brand, modelName) {
  let make = brand.toLowerCase().replace(/ motors| auto| motor/g, '').trim();
  let model = modelName.toLowerCase()
    .replace(brand.toLowerCase(), '')
    .replace('ev', '')
    .replace('gen 2', '')
    .replace('facelift', '')
    .replace('(', '').replace(')', '')
    .trim()
    .replace(/\s+/g, '-');

  return `https://cdn.imagin.studio/getimage?customer=img&make=${encodeURIComponent(make)}&modelFamily=${encodeURIComponent(model)}&angle=01&zoomType=fullscreen&width=800`;
}
