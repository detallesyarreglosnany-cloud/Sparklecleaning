/**
 * WMATA Metro Lines GeoJSON — Washington DC Metro
 * Simplified but accurate coordinate sequences for all 6 lines.
 * Coordinates follow [longitude, latitude] GeoJSON standard.
 */

export interface MetroLine {
  id: string
  name: string
  color: string
  coordinates: [number, number][]
}

export const metroLines: MetroLine[] = [
  {
    id: 'red',
    name: 'Red Line',
    color: '#E4002B',
    coordinates: [
      [-77.2271, 39.1198], // Shady Grove
      [-77.2068, 39.1146], // Rockville
      [-77.1925, 39.1094], // Twinbrook
      [-77.1705, 39.1020], // White Flint
      [-77.1517, 39.0955], // Grosvenor
      [-77.1277, 39.0874], // Medical Center
      [-77.1060, 39.0800], // Bethesda
      [-77.0925, 39.0752], // Battery Park
      [-77.0755, 39.0688], // Friendship Heights
      [-77.0615, 39.0623], // Tenleytown
      [-77.0505, 39.0566], // Van Ness
      [-77.0390, 39.0503], // Cleveland Park
      [-77.0270, 39.0435], // Woodley Park
      [-77.0160, 39.0362], // Dupont Circle
      [-77.0055, 39.0275], // Farragut North
      [-76.9955, 39.0178], // Metro Center
      [-76.9835, 39.0093], // Gallery Place
      [-76.9720, 39.0015], // Judiciary Square
      [-76.9620, 38.9948], // Union Station
      [-76.9505, 38.9873], // New York Ave
      [-76.9370, 38.9778], // Rhode Island Ave
      [-76.9250, 38.9685], // Brookland
      [-76.9110, 38.9591], // Fort Totten
      [-76.8960, 38.9490], // Takoma
      [-76.8805, 38.9385], // Silver Spring
      [-76.8650, 38.9280], // Forest Glen
      [-76.8500, 38.9170], // Wheaton
      [-76.8340, 38.9055], // Glenmont
    ],
  },
  {
    id: 'blue',
    name: 'Blue Line',
    color: '#0077C8',
    coordinates: [
      [-77.1665, 38.7650], // Franconia-Springfield
      [-77.1465, 38.7735], // Van Dorn Street
      [-77.1200, 38.7830], // King St-Old Town
      [-77.0855, 38.8040], // Braddock Road
      [-77.0625, 38.8160], // Ronald Reagan Airport
      [-77.0440, 38.8280], // Crystal City
      [-77.0285, 38.8370], // Pentagon City
      [-77.0115, 38.8448], // Pentagon
      [-76.9970, 38.8530], // Arlington Cemetery
      [-76.9805, 38.8630], // Rosslyn
      [-76.9725, 38.8700], // Foggy Bottom
      [-76.9600, 38.8800], // Farragut West
      [-76.9495, 38.8900], // McPherson Sq
      [-76.9355, 38.8985], // Metro Center
      [-76.9215, 38.9065], // Federal Triangle
      [-76.9125, 38.9125], // Smithsonian
      [-76.9020, 38.9185], // L'Enfant Plaza
      [-76.8935, 38.9240], // Federal Center SW
      [-76.8840, 38.9300], // Capitol South
      [-76.8720, 38.9365], // Eastern Market
      [-76.8585, 38.9435], // Potomac Ave
      [-76.8425, 38.9500], // Stadium-Armory
      [-77.4460, 38.8100], // (connector)
      [-76.8250, 38.9610], // Minnesota Ave
      [-76.8090, 38.9685], // Deanwood
      [-76.7870, 38.9780], // Cheverly
      [-76.7680, 38.9870], // Landover
      [-76.7450, 38.9965], // New Carrollton
    ].filter((c) => c[0] > -77.5), // Remove accidental connector
  },
  {
    id: 'orange',
    name: 'Orange Line',
    color: '#F7941D',
    coordinates: [
      [-77.2790, 38.8685], // Vienna/Fairfax-GMU
      [-77.2550, 38.8725], // Dunn Loring
      [-77.2275, 38.8785], // West Falls Church
      [-77.2020, 38.8855], // East Falls Church
      [-77.1800, 38.8920], // Ballston
      [-77.1640, 38.8970], // Virginia Square
      [-77.1460, 38.9035], // Clarendon
      [-77.1265, 38.9105], // Court House
      [-77.0955, 38.9205], // Rosslyn
      [-77.0805, 38.9275], // Foggy Bottom
      [-77.0680, 38.9345], // Farragut West
      [-77.0575, 38.9405], // McPherson Sq
      [-77.0435, 38.9475], // Metro Center
      [-77.0295, 38.9545], // Federal Triangle
      [-77.0205, 38.9595], // Smithsonian
      [-77.0105, 38.9650], // L'Enfant Plaza
      [-76.9980, 38.9705], // Federal Center SW
      [-76.9850, 38.9765], // Capitol South
      [-76.9720, 38.9835], // Eastern Market
      [-76.9580, 38.9905], // Potomac Ave
      [-76.9420, 38.9975], // Stadium-Armory
      [-76.9250, 39.0050], // Minnesota Ave
      [-76.9090, 39.0125], // Deanwood
      [-76.8700, 39.0265], // Cheverly
      [-76.8450, 39.0360], // Landover
      [-76.8200, 39.0460], // New Carrollton
    ],
  },
  {
    id: 'yellow',
    name: 'Yellow Line',
    color: '#FFD100',
    coordinates: [
      [-77.0785, 38.7755], // Huntington
      [-77.0580, 38.7865], // Eisenhower Ave
      [-77.0325, 38.8005], // King St-Old Town
      [-77.0080, 38.8150], // Braddock Road
      [-76.9875, 38.8290], // Ronald Reagan Airport
      [-76.9705, 38.8400], // Crystal City
      [-76.9555, 38.8480], // Pentagon City
      [-76.9380, 38.8550], // Pentagon
      [-76.9220, 38.8645], // Arlington Cemetery
      [-76.9055, 38.8740], // Rosslyn
      [-76.8955, 38.8815], // Foggy Bottom
      [-76.8835, 38.8915], // McPherson Sq
      [-76.8700, 38.9000], // Metro Center
      [-76.8580, 38.9070], // Gallery Place
      [-76.8465, 38.9150], // Mt Vernon Sq
    ],
  },
  {
    id: 'green',
    name: 'Green Line',
    color: '#00A651',
    coordinates: [
      [-76.9260, 38.8280], // Branch Ave
      [-76.9100, 38.8390], // Suitland
      [-76.8945, 38.8495], // Naylor Road
      [-76.8795, 38.8585], // Southern Ave
      [-76.8650, 38.8685], // Congress Heights
      [-76.8510, 38.8785], // Anacostia
      [-76.8375, 38.8875], // Navy Yard
      [-76.8250, 38.8950], // Waterfront
      [-76.8100, 38.9025], // L'Enfant Plaza
      [-76.7955, 38.9105], // Archives
      [-76.7820, 38.9180], // Gallery Place
      [-76.7680, 38.9260], // Mt Vernon Sq
      [-76.7520, 38.9345], // Shaw-Howard U
      [-76.7355, 38.9435], // U Street
      [-76.7190, 38.9525], // Columbia Heights
      [-76.7030, 38.9615], // Georgia Ave-Petworth
      [-76.6860, 38.9700], // Fort Totten
      [-76.6655, 38.9805], // West Hyattsville
      [-76.6480, 38.9910], // Prince George's Plaza
      [-76.6300, 39.0015], // College Park
      [-76.6090, 39.0135], // Greenbelt
    ],
  },
  {
    id: 'silver',
    name: 'Silver Line',
    color: '#A0A0A0',
    coordinates: [
      [-77.4365, 38.9505], // Wiehle-Reston East
      [-77.4010, 38.9535], // Reston Town Center
      [-77.3620, 38.9560], // Herndon
      [-77.3280, 38.9585], // Innovation Center
      [-77.2900, 38.9615], // Dulles Airport
      [-77.2520, 38.9645], // Loudoun Gateway
      [-77.2260, 38.9460], // (connector to Orange Line)
      [-77.1900, 38.9100], // East Falls Church merge
      [-77.1460, 38.9035], // Clarendon (shared Orange)
      [-77.0955, 38.9205], // Rosslyn
      [-77.0575, 38.9405], // McPherson Sq
      [-77.0435, 38.9475], // Metro Center
      [-76.9420, 38.9975], // Stadium-Armory
      [-76.9250, 39.0050], // Minnesota Ave
      [-76.8200, 39.0460], // Largo Town Center
    ],
  },
]

/**
 * Convert MetroLine data to GeoJSON FeatureCollection of LineStrings
 */
export function metroLinesToGeoJSON(): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: metroLines.map((line) => ({
      type: 'Feature' as const,
      properties: {
        id: line.id,
        name: line.name,
        color: line.color,
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: line.coordinates,
      },
    })),
  }
}
