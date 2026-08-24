import { EV_DATABASE } from '../data/evDatabase';

// Simulated API Endpoints for MyNewCar and CarDekho
export const API_SOURCES = {
  ALL: { id: "all", name: "Unified API (MyNewCar + CarDekho Feed)", status: "Active", latency: 32 },
  MYNEWCAR: { id: "mynewcar", name: "MyNewCar EV Data API v2", status: "Connected", latency: 45 },
  CARDEKHO: { id: "cardekho", name: "CarDekho EV Specs Service", status: "Connected", latency: 28 }
};

class EvApiService {
  constructor() {
    this.currentSource = 'all';
    this.lastResponse = null;
    this.apiStats = {
      totalRequests: 1420,
      activeEndpoint: "https://api.mynewcar.in/v2/ev/specs",
      latencyMs: 32,
      lastSync: new Date().toLocaleTimeString()
    };
  }

  setSource(sourceId) {
    this.currentSource = sourceId;
  }

  getSource() {
    return this.currentSource;
  }

  async getAllEvs(filters = {}) {
    const startTime = performance.now();
    let data = [...EV_DATABASE];

    // Filter by Category (4W / 2W)
    if (filters.category && filters.category !== 'all') {
      data = data.filter(ev => ev.category === filters.category);
    }

    // Filter by Body Type
    if (filters.bodyType && filters.bodyType !== 'all') {
      data = data.filter(ev => ev.bodyType === filters.bodyType);
    }

    // Filter by Search Query
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(ev => 
        ev.name.toLowerCase().includes(q) || 
        ev.brand.toLowerCase().includes(q) ||
        ev.bodyType.toLowerCase().includes(q)
      );
    }

    // Filter by Max Price
    if (filters.maxPrice) {
      data = data.filter(ev => ev.priceMin <= filters.maxPrice);
    }

    // Filter by Min Range
    if (filters.minRange) {
      data = data.filter(ev => ev.realWorldRange >= filters.minRange);
    }

    // Filter by Brand
    if (filters.brand && filters.brand !== 'all') {
      data = data.filter(ev => ev.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    // Sort
    if (filters.sortBy) {
      if (filters.sortBy === 'price-low') data.sort((a, b) => a.priceMin - b.priceMin);
      else if (filters.sortBy === 'price-high') data.sort((a, b) => b.priceMin - a.priceMin);
      else if (filters.sortBy === 'range-high') data.sort((a, b) => b.realWorldRange - a.realWorldRange);
      else if (filters.sortBy === 'score-high') data.sort((a, b) => b.score - a.score);
      else if (filters.sortBy === 'accel-fast') data.sort((a, b) => a.acceleration - b.acceleration);
    }

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime + Math.random() * 20);

    // Save formatted API payload for inspector modal
    this.lastResponse = {
      status: 200,
      source: this.currentSource,
      endpoint: this.currentSource === 'mynewcar' 
        ? 'https://api.mynewcar.in/v2/ev/catalog' 
        : this.currentSource === 'cardekho' 
          ? 'https://api.cardekho.com/v1/ev-specs/search' 
          : 'https://compareevs.api/v1/unified-feed',
      requestTimeMs: duration,
      resultCount: data.length,
      timestamp: new Date().toISOString(),
      samplePayload: data.slice(0, 2).map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price_range: item.displayPrice,
        battery_kwh: item.batteryCapacity,
        arai_range_km: item.araiRange,
        real_range_km: item.realWorldRange,
        dc_fast_charge_min: item.fastChargingTime,
        api_ref: this.currentSource === 'mynewcar' ? item.myNewCarId : item.carDekhoId
      }))
    };

    return {
      data,
      meta: {
        total: data.length,
        latencyMs: duration,
        source: this.currentSource
      }
    };
  }

  async getEvById(id) {
    const item = EV_DATABASE.find(ev => ev.id === id);
    return item || null;
  }

  async compareEvs(ids = []) {
    const selected = EV_DATABASE.filter(ev => ids.includes(ev.id));
    return {
      compared: selected,
      totalCompared: selected.length,
      timestamp: new Date().toISOString()
    };
  }

  getLastApiResponse() {
    return this.lastResponse;
  }
}

export const evApi = new EvApiService();
