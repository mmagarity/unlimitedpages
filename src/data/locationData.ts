import type { USCity, USState } from '../types/locations';

export const US_STATES: USState[] = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  { name: 'Arizona', abbreviation: 'AZ' },
  { name: 'Arkansas', abbreviation: 'AR' },
  { name: 'California', abbreviation: 'CA' },
  { name: 'Colorado', abbreviation: 'CO' },
  { name: 'Connecticut', abbreviation: 'CT' },
  { name: 'Delaware', abbreviation: 'DE' },
  { name: 'Florida', abbreviation: 'FL' },
  { name: 'Georgia', abbreviation: 'GA' },
  { name: 'Hawaii', abbreviation: 'HI' },
  { name: 'Idaho', abbreviation: 'ID' },
  { name: 'Illinois', abbreviation: 'IL' },
  { name: 'Indiana', abbreviation: 'IN' },
  { name: 'Iowa', abbreviation: 'IA' },
  { name: 'Kansas', abbreviation: 'KS' },
  { name: 'Kentucky', abbreviation: 'KY' },
  { name: 'Louisiana', abbreviation: 'LA' },
  { name: 'Maine', abbreviation: 'ME' },
  { name: 'Maryland', abbreviation: 'MD' },
  { name: 'Massachusetts', abbreviation: 'MA' },
  { name: 'Michigan', abbreviation: 'MI' },
  { name: 'Minnesota', abbreviation: 'MN' },
  { name: 'Mississippi', abbreviation: 'MS' },
  { name: 'Missouri', abbreviation: 'MO' },
  { name: 'Montana', abbreviation: 'MT' },
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Nevada', abbreviation: 'NV' },
  { name: 'New Hampshire', abbreviation: 'NH' },
  { name: 'New Jersey', abbreviation: 'NJ' },
  { name: 'New Mexico', abbreviation: 'NM' },
  { name: 'New York', abbreviation: 'NY' },
  { name: 'North Carolina', abbreviation: 'NC' },
  { name: 'North Dakota', abbreviation: 'ND' },
  { name: 'Ohio', abbreviation: 'OH' },
  { name: 'Oklahoma', abbreviation: 'OK' },
  { name: 'Oregon', abbreviation: 'OR' },
  { name: 'Pennsylvania', abbreviation: 'PA' },
  { name: 'Rhode Island', abbreviation: 'RI' },
  { name: 'South Carolina', abbreviation: 'SC' },
  { name: 'South Dakota', abbreviation: 'SD' },
  { name: 'Tennessee', abbreviation: 'TN' },
  { name: 'Texas', abbreviation: 'TX' },
  { name: 'Utah', abbreviation: 'UT' },
  { name: 'Vermont', abbreviation: 'VT' },
  { name: 'Virginia', abbreviation: 'VA' },
  { name: 'Washington', abbreviation: 'WA' },
  { name: 'West Virginia', abbreviation: 'WV' },
  { name: 'Wisconsin', abbreviation: 'WI' },
  { name: 'Wyoming', abbreviation: 'WY' }
];

// Top 1000 US cities by population
export const TOP_US_CITIES: USCity[] = [
    {
      "name": "New York",
      "state": "New York",
      "stateName": "New York",
      "population": 8405837,
      "rank": 1
    },
    {
      "name": "Los Angeles",
      "state": "California",
      "stateName": "California",
      "population": 3884307,
      "rank": 2
    },
    {
      "name": "Chicago",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 2718782,
      "rank": 3
    },
    {
      "name": "Houston",
      "state": "Texas",
      "stateName": "Texas",
      "population": 2195914,
      "rank": 4
    },
    {
      "name": "Philadelphia",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 1553165,
      "rank": 5
    },
    {
      "name": "Phoenix",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 1513367,
      "rank": 6
    },
    {
      "name": "San Antonio",
      "state": "Texas",
      "stateName": "Texas",
      "population": 1409019,
      "rank": 7
    },
    {
      "name": "San Diego",
      "state": "California",
      "stateName": "California",
      "population": 1355896,
      "rank": 8
    },
    {
      "name": "Dallas",
      "state": "Texas",
      "stateName": "Texas",
      "population": 1257676,
      "rank": 9
    },
    {
      "name": "San Jose",
      "state": "California",
      "stateName": "California",
      "population": 998537,
      "rank": 10
    },
    {
      "name": "Austin",
      "state": "Texas",
      "stateName": "Texas",
      "population": 885400,
      "rank": 11
    },
    {
      "name": "Indianapolis",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 843393,
      "rank": 12
    },
    {
      "name": "Jacksonville",
      "state": "Florida",
      "stateName": "Florida",
      "population": 842583,
      "rank": 13
    },
    {
      "name": "San Francisco",
      "state": "California",
      "stateName": "California",
      "population": 837442,
      "rank": 14
    },
    {
      "name": "Columbus",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 822553,
      "rank": 15
    },
    {
      "name": "Charlotte",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 792862,
      "rank": 16
    },
    {
      "name": "Fort Worth",
      "state": "Texas",
      "stateName": "Texas",
      "population": 792727,
      "rank": 17
    },
    {
      "name": "Detroit",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 688701,
      "rank": 18
    },
    {
      "name": "El Paso",
      "state": "Texas",
      "stateName": "Texas",
      "population": 674433,
      "rank": 19
    },
    {
      "name": "Memphis",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 653450,
      "rank": 20
    },
    {
      "name": "Seattle",
      "state": "Washington",
      "stateName": "Washington",
      "population": 652405,
      "rank": 21
    },
    {
      "name": "Denver",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 649495,
      "rank": 22
    },
    {
      "name": "Washington",
      "state": "District of Columbia",
      "stateName": "District of Columbia",
      "population": 646449,
      "rank": 23
    },
    {
      "name": "Boston",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 645966,
      "rank": 24
    },
    {
      "name": "Nashville-Davidson",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 634464,
      "rank": 25
    },
    {
      "name": "Baltimore",
      "state": "Maryland",
      "stateName": "Maryland",
      "population": 622104,
      "rank": 26
    },
    {
      "name": "Oklahoma City",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 610613,
      "rank": 27
    },
    {
      "name": "Louisville/Jefferson County",
      "state": "Kentucky",
      "stateName": "Kentucky",
      "population": 609893,
      "rank": 28
    },
    {
      "name": "Portland",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 609456,
      "rank": 29
    },
    {
      "name": "Las Vegas",
      "state": "Nevada",
      "stateName": "Nevada",
      "population": 603488,
      "rank": 30
    },
    {
      "name": "Milwaukee",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 599164,
      "rank": 31
    },
    {
      "name": "Albuquerque",
      "state": "New Mexico",
      "stateName": "New Mexico",
      "population": 556495,
      "rank": 32
    },
    {
      "name": "Tucson",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 526116,
      "rank": 33
    },
    {
      "name": "Fresno",
      "state": "California",
      "stateName": "California",
      "population": 509924,
      "rank": 34
    },
    {
      "name": "Sacramento",
      "state": "California",
      "stateName": "California",
      "population": 479686,
      "rank": 35
    },
    {
      "name": "Long Beach",
      "state": "California",
      "stateName": "California",
      "population": 469428,
      "rank": 36
    },
    {
      "name": "Kansas City",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 467007,
      "rank": 37
    },
    {
      "name": "Mesa",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 457587,
      "rank": 38
    },
    {
      "name": "Virginia Beach",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 448479,
      "rank": 39
    },
    {
      "name": "Atlanta",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 447841,
      "rank": 40
    },
    {
      "name": "Colorado Springs",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 439886,
      "rank": 41
    },
    {
      "name": "Omaha",
      "state": "Nebraska",
      "stateName": "Nebraska",
      "population": 434353,
      "rank": 42
    },
    {
      "name": "Raleigh",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 431746,
      "rank": 43
    },
    {
      "name": "Miami",
      "state": "Florida",
      "stateName": "Florida",
      "population": 417650,
      "rank": 44
    },
    {
      "name": "Oakland",
      "state": "California",
      "stateName": "California",
      "population": 406253,
      "rank": 45
    },
    {
      "name": "Minneapolis",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 400070,
      "rank": 46
    },
    {
      "name": "Tulsa",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 398121,
      "rank": 47
    },
    {
      "name": "Cleveland",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 390113,
      "rank": 48
    },
    {
      "name": "Wichita",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 386552,
      "rank": 49
    },
    {
      "name": "Arlington",
      "state": "Texas",
      "stateName": "Texas",
      "population": 379577,
      "rank": 50
    },
    {
      "name": "New Orleans",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 378715,
      "rank": 51
    },
    {
      "name": "Bakersfield",
      "state": "California",
      "stateName": "California",
      "population": 363630,
      "rank": 52
    },
    {
      "name": "Tampa",
      "state": "Florida",
      "stateName": "Florida",
      "population": 352957,
      "rank": 53
    },
    {
      "name": "Honolulu",
      "state": "Hawaii",
      "stateName": "Hawaii",
      "population": 347884,
      "rank": 54
    },
    {
      "name": "Aurora",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 345803,
      "rank": 55
    },
    {
      "name": "Anaheim",
      "state": "California",
      "stateName": "California",
      "population": 345012,
      "rank": 56
    },
    {
      "name": "Santa Ana",
      "state": "California",
      "stateName": "California",
      "population": 334227,
      "rank": 57
    },
    {
      "name": "St. Louis",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 318416,
      "rank": 58
    },
    {
      "name": "Riverside",
      "state": "California",
      "stateName": "California",
      "population": 316619,
      "rank": 59
    },
    {
      "name": "Corpus Christi",
      "state": "Texas",
      "stateName": "Texas",
      "population": 316381,
      "rank": 60
    },
    {
      "name": "Lexington-Fayette",
      "state": "Kentucky",
      "stateName": "Kentucky",
      "population": 308428,
      "rank": 61
    },
    {
      "name": "Pittsburgh",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 305841,
      "rank": 62
    },
    {
      "name": "Anchorage",
      "state": "Alaska",
      "stateName": "Alaska",
      "population": 300950,
      "rank": 63
    },
    {
      "name": "Stockton",
      "state": "California",
      "stateName": "California",
      "population": 298118,
      "rank": 64
    },
    {
      "name": "Cincinnati",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 297517,
      "rank": 65
    },
    {
      "name": "St. Paul",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 294873,
      "rank": 66
    },
    {
      "name": "Toledo",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 282313,
      "rank": 67
    },
    {
      "name": "Greensboro",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 279639,
      "rank": 68
    },
    {
      "name": "Newark",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 278427,
      "rank": 69
    },
    {
      "name": "Plano",
      "state": "Texas",
      "stateName": "Texas",
      "population": 274409,
      "rank": 70
    },
    {
      "name": "Henderson",
      "state": "Nevada",
      "stateName": "Nevada",
      "population": 270811,
      "rank": 71
    },
    {
      "name": "Lincoln",
      "state": "Nebraska",
      "stateName": "Nebraska",
      "population": 268738,
      "rank": 72
    },
    {
      "name": "Buffalo",
      "state": "New York",
      "stateName": "New York",
      "population": 258959,
      "rank": 73
    },
    {
      "name": "Jersey City",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 257342,
      "rank": 74
    },
    {
      "name": "Chula Vista",
      "state": "California",
      "stateName": "California",
      "population": 256780,
      "rank": 75
    },
    {
      "name": "Fort Wayne",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 256496,
      "rank": 76
    },
    {
      "name": "Orlando",
      "state": "Florida",
      "stateName": "Florida",
      "population": 255483,
      "rank": 77
    },
    {
      "name": "St. Petersburg",
      "state": "Florida",
      "stateName": "Florida",
      "population": 249688,
      "rank": 78
    },
    {
      "name": "Chandler",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 249146,
      "rank": 79
    },
    {
      "name": "Laredo",
      "state": "Texas",
      "stateName": "Texas",
      "population": 248142,
      "rank": 80
    },
    {
      "name": "Norfolk",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 246139,
      "rank": 81
    },
    {
      "name": "Durham",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 245475,
      "rank": 82
    },
    {
      "name": "Madison",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 243344,
      "rank": 83
    },
    {
      "name": "Lubbock",
      "state": "Texas",
      "stateName": "Texas",
      "population": 239538,
      "rank": 84
    },
    {
      "name": "Irvine",
      "state": "California",
      "stateName": "California",
      "population": 236716,
      "rank": 85
    },
    {
      "name": "Winston-Salem",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 236441,
      "rank": 86
    },
    {
      "name": "Glendale",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 234632,
      "rank": 87
    },
    {
      "name": "Garland",
      "state": "Texas",
      "stateName": "Texas",
      "population": 234566,
      "rank": 88
    },
    {
      "name": "Hialeah",
      "state": "Florida",
      "stateName": "Florida",
      "population": 233394,
      "rank": 89
    },
    {
      "name": "Reno",
      "state": "Nevada",
      "stateName": "Nevada",
      "population": 233294,
      "rank": 90
    },
    {
      "name": "Chesapeake",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 230571,
      "rank": 91
    },
    {
      "name": "Gilbert",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 229972,
      "rank": 92
    },
    {
      "name": "Baton Rouge",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 229426,
      "rank": 93
    },
    {
      "name": "Irving",
      "state": "Texas",
      "stateName": "Texas",
      "population": 228653,
      "rank": 94
    },
    {
      "name": "Scottsdale",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 226918,
      "rank": 95
    },
    {
      "name": "North Las Vegas",
      "state": "Nevada",
      "stateName": "Nevada",
      "population": 226877,
      "rank": 96
    },
    {
      "name": "Fremont",
      "state": "California",
      "stateName": "California",
      "population": 224922,
      "rank": 97
    },
    {
      "name": "Boise City",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 214237,
      "rank": 98
    },
    {
      "name": "Richmond",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 214114,
      "rank": 99
    },
    {
      "name": "San Bernardino",
      "state": "California",
      "stateName": "California",
      "population": 213708,
      "rank": 100
    },
    {
      "name": "Birmingham",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 212113,
      "rank": 101
    },
    {
      "name": "Spokane",
      "state": "Washington",
      "stateName": "Washington",
      "population": 210721,
      "rank": 102
    },
    {
      "name": "Rochester",
      "state": "New York",
      "stateName": "New York",
      "population": 210358,
      "rank": 103
    },
    {
      "name": "Des Moines",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 207510,
      "rank": 104
    },
    {
      "name": "Modesto",
      "state": "California",
      "stateName": "California",
      "population": 204933,
      "rank": 105
    },
    {
      "name": "Fayetteville",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 204408,
      "rank": 106
    },
    {
      "name": "Tacoma",
      "state": "Washington",
      "stateName": "Washington",
      "population": 203446,
      "rank": 107
    },
    {
      "name": "Oxnard",
      "state": "California",
      "stateName": "California",
      "population": 203007,
      "rank": 108
    },
    {
      "name": "Fontana",
      "state": "California",
      "stateName": "California",
      "population": 203003,
      "rank": 109
    },
    {
      "name": "Columbus",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 202824,
      "rank": 110
    },
    {
      "name": "Montgomery",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 201332,
      "rank": 111
    },
    {
      "name": "Moreno Valley",
      "state": "California",
      "stateName": "California",
      "population": 201175,
      "rank": 112
    },
    {
      "name": "Shreveport",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 200327,
      "rank": 113
    },
    {
      "name": "Aurora",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 199963,
      "rank": 114
    },
    {
      "name": "Yonkers",
      "state": "New York",
      "stateName": "New York",
      "population": 199766,
      "rank": 115
    },
    {
      "name": "Akron",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 198100,
      "rank": 116
    },
    {
      "name": "Huntington Beach",
      "state": "California",
      "stateName": "California",
      "population": 197575,
      "rank": 117
    },
    {
      "name": "Little Rock",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 197357,
      "rank": 118
    },
    {
      "name": "Augusta-Richmond County",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 197350,
      "rank": 119
    },
    {
      "name": "Amarillo",
      "state": "Texas",
      "stateName": "Texas",
      "population": 196429,
      "rank": 120
    },
    {
      "name": "Glendale",
      "state": "California",
      "stateName": "California",
      "population": 196021,
      "rank": 121
    },
    {
      "name": "Mobile",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 194899,
      "rank": 122
    },
    {
      "name": "Grand Rapids",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 192294,
      "rank": 123
    },
    {
      "name": "Salt Lake City",
      "state": "Utah",
      "stateName": "Utah",
      "population": 191180,
      "rank": 124
    },
    {
      "name": "Tallahassee",
      "state": "Florida",
      "stateName": "Florida",
      "population": 186411,
      "rank": 125
    },
    {
      "name": "Huntsville",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 186254,
      "rank": 126
    },
    {
      "name": "Grand Prairie",
      "state": "Texas",
      "stateName": "Texas",
      "population": 183372,
      "rank": 127
    },
    {
      "name": "Knoxville",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 183270,
      "rank": 128
    },
    {
      "name": "Worcester",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 182544,
      "rank": 129
    },
    {
      "name": "Newport News",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 182020,
      "rank": 130
    },
    {
      "name": "Brownsville",
      "state": "Texas",
      "stateName": "Texas",
      "population": 181860,
      "rank": 131
    },
    {
      "name": "Overland Park",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 181260,
      "rank": 132
    },
    {
      "name": "Santa Clarita",
      "state": "California",
      "stateName": "California",
      "population": 179590,
      "rank": 133
    },
    {
      "name": "Providence",
      "state": "Rhode Island",
      "stateName": "Rhode Island",
      "population": 177994,
      "rank": 134
    },
    {
      "name": "Garden Grove",
      "state": "California",
      "stateName": "California",
      "population": 175140,
      "rank": 135
    },
    {
      "name": "Chattanooga",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 173366,
      "rank": 136
    },
    {
      "name": "Oceanside",
      "state": "California",
      "stateName": "California",
      "population": 172794,
      "rank": 137
    },
    {
      "name": "Jackson",
      "state": "Mississippi",
      "stateName": "Mississippi",
      "population": 172638,
      "rank": 138
    },
    {
      "name": "Fort Lauderdale",
      "state": "Florida",
      "stateName": "Florida",
      "population": 172389,
      "rank": 139
    },
    {
      "name": "Santa Rosa",
      "state": "California",
      "stateName": "California",
      "population": 171990,
      "rank": 140
    },
    {
      "name": "Rancho Cucamonga",
      "state": "California",
      "stateName": "California",
      "population": 171386,
      "rank": 141
    },
    {
      "name": "Port St. Lucie",
      "state": "Florida",
      "stateName": "Florida",
      "population": 171016,
      "rank": 142
    },
    {
      "name": "Tempe",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 168228,
      "rank": 143
    },
    {
      "name": "Ontario",
      "state": "California",
      "stateName": "California",
      "population": 167500,
      "rank": 144
    },
    {
      "name": "Vancouver",
      "state": "Washington",
      "stateName": "Washington",
      "population": 167405,
      "rank": 145
    },
    {
      "name": "Cape Coral",
      "state": "Florida",
      "stateName": "Florida",
      "population": 165831,
      "rank": 146
    },
    {
      "name": "Sioux Falls",
      "state": "South Dakota",
      "stateName": "South Dakota",
      "population": 164676,
      "rank": 147
    },
    {
      "name": "Springfield",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 164122,
      "rank": 148
    },
    {
      "name": "Peoria",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 162592,
      "rank": 149
    },
    {
      "name": "Pembroke Pines",
      "state": "Florida",
      "stateName": "Florida",
      "population": 162329,
      "rank": 150
    },
    {
      "name": "Elk Grove",
      "state": "California",
      "stateName": "California",
      "population": 161007,
      "rank": 151
    },
    {
      "name": "Salem",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 160614,
      "rank": 152
    },
    {
      "name": "Lancaster",
      "state": "California",
      "stateName": "California",
      "population": 159523,
      "rank": 153
    },
    {
      "name": "Corona",
      "state": "California",
      "stateName": "California",
      "population": 159503,
      "rank": 154
    },
    {
      "name": "Eugene",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 159190,
      "rank": 155
    },
    {
      "name": "Palmdale",
      "state": "California",
      "stateName": "California",
      "population": 157161,
      "rank": 156
    },
    {
      "name": "Salinas",
      "state": "California",
      "stateName": "California",
      "population": 155662,
      "rank": 157
    },
    {
      "name": "Springfield",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 153703,
      "rank": 158
    },
    {
      "name": "Pasadena",
      "state": "Texas",
      "stateName": "Texas",
      "population": 152735,
      "rank": 159
    },
    {
      "name": "Fort Collins",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 152061,
      "rank": 160
    },
    {
      "name": "Hayward",
      "state": "California",
      "stateName": "California",
      "population": 151574,
      "rank": 161
    },
    {
      "name": "Pomona",
      "state": "California",
      "stateName": "California",
      "population": 151348,
      "rank": 162
    },
    {
      "name": "Cary",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 151088,
      "rank": 163
    },
    {
      "name": "Rockford",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 150251,
      "rank": 164
    },
    {
      "name": "Alexandria",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 148892,
      "rank": 165
    },
    {
      "name": "Escondido",
      "state": "California",
      "stateName": "California",
      "population": 148738,
      "rank": 166
    },
    {
      "name": "McKinney",
      "state": "Texas",
      "stateName": "Texas",
      "population": 148559,
      "rank": 167
    },
    {
      "name": "Kansas City",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 148483,
      "rank": 168
    },
    {
      "name": "Joliet",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 147806,
      "rank": 169
    },
    {
      "name": "Sunnyvale",
      "state": "California",
      "stateName": "California",
      "population": 147559,
      "rank": 170
    },
    {
      "name": "Torrance",
      "state": "California",
      "stateName": "California",
      "population": 147478,
      "rank": 171
    },
    {
      "name": "Bridgeport",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 147216,
      "rank": 172
    },
    {
      "name": "Lakewood",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 147214,
      "rank": 173
    },
    {
      "name": "Hollywood",
      "state": "Florida",
      "stateName": "Florida",
      "population": 146526,
      "rank": 174
    },
    {
      "name": "Paterson",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 145948,
      "rank": 175
    },
    {
      "name": "Naperville",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 144864,
      "rank": 176
    },
    {
      "name": "Syracuse",
      "state": "New York",
      "stateName": "New York",
      "population": 144669,
      "rank": 177
    },
    {
      "name": "Mesquite",
      "state": "Texas",
      "stateName": "Texas",
      "population": 143484,
      "rank": 178
    },
    {
      "name": "Dayton",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 143355,
      "rank": 179
    },
    {
      "name": "Savannah",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 142772,
      "rank": 180
    },
    {
      "name": "Clarksville",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 142357,
      "rank": 181
    },
    {
      "name": "Orange",
      "state": "California",
      "stateName": "California",
      "population": 139969,
      "rank": 182
    },
    {
      "name": "Pasadena",
      "state": "California",
      "stateName": "California",
      "population": 139731,
      "rank": 183
    },
    {
      "name": "Fullerton",
      "state": "California",
      "stateName": "California",
      "population": 138981,
      "rank": 184
    },
    {
      "name": "Killeen",
      "state": "Texas",
      "stateName": "Texas",
      "population": 137147,
      "rank": 185
    },
    {
      "name": "Frisco",
      "state": "Texas",
      "stateName": "Texas",
      "population": 136791,
      "rank": 186
    },
    {
      "name": "Hampton",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 136699,
      "rank": 187
    },
    {
      "name": "McAllen",
      "state": "Texas",
      "stateName": "Texas",
      "population": 136639,
      "rank": 188
    },
    {
      "name": "Warren",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 134873,
      "rank": 189
    },
    {
      "name": "Bellevue",
      "state": "Washington",
      "stateName": "Washington",
      "population": 133992,
      "rank": 190
    },
    {
      "name": "West Valley City",
      "state": "Utah",
      "stateName": "Utah",
      "population": 133579,
      "rank": 191
    },
    {
      "name": "Columbia",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 133358,
      "rank": 192
    },
    {
      "name": "Olathe",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 131885,
      "rank": 193
    },
    {
      "name": "Sterling Heights",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 131224,
      "rank": 194
    },
    {
      "name": "New Haven",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 130660,
      "rank": 195
    },
    {
      "name": "Miramar",
      "state": "Florida",
      "stateName": "Florida",
      "population": 130288,
      "rank": 196
    },
    {
      "name": "Waco",
      "state": "Texas",
      "stateName": "Texas",
      "population": 129030,
      "rank": 197
    },
    {
      "name": "Thousand Oaks",
      "state": "California",
      "stateName": "California",
      "population": 128731,
      "rank": 198
    },
    {
      "name": "Cedar Rapids",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 128429,
      "rank": 199
    },
    {
      "name": "Charleston",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 127999,
      "rank": 200
    },
    {
      "name": "Visalia",
      "state": "California",
      "stateName": "California",
      "population": 127763,
      "rank": 201
    },
    {
      "name": "Topeka",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 127679,
      "rank": 202
    },
    {
      "name": "Elizabeth",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 127558,
      "rank": 203
    },
    {
      "name": "Gainesville",
      "state": "Florida",
      "stateName": "Florida",
      "population": 127488,
      "rank": 204
    },
    {
      "name": "Thornton",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 127359,
      "rank": 205
    },
    {
      "name": "Roseville",
      "state": "California",
      "stateName": "California",
      "population": 127035,
      "rank": 206
    },
    {
      "name": "Carrollton",
      "state": "Texas",
      "stateName": "Texas",
      "population": 126700,
      "rank": 207
    },
    {
      "name": "Coral Springs",
      "state": "Florida",
      "stateName": "Florida",
      "population": 126604,
      "rank": 208
    },
    {
      "name": "Stamford",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 126456,
      "rank": 209
    },
    {
      "name": "Simi Valley",
      "state": "California",
      "stateName": "California",
      "population": 126181,
      "rank": 210
    },
    {
      "name": "Concord",
      "state": "California",
      "stateName": "California",
      "population": 125880,
      "rank": 211
    },
    {
      "name": "Hartford",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 125017,
      "rank": 212
    },
    {
      "name": "Kent",
      "state": "Washington",
      "stateName": "Washington",
      "population": 124435,
      "rank": 213
    },
    {
      "name": "Lafayette",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 124276,
      "rank": 214
    },
    {
      "name": "Midland",
      "state": "Texas",
      "stateName": "Texas",
      "population": 123933,
      "rank": 215
    },
    {
      "name": "Surprise",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 123546,
      "rank": 216
    },
    {
      "name": "Denton",
      "state": "Texas",
      "stateName": "Texas",
      "population": 123099,
      "rank": 217
    },
    {
      "name": "Victorville",
      "state": "California",
      "stateName": "California",
      "population": 121096,
      "rank": 218
    },
    {
      "name": "Evansville",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 120310,
      "rank": 219
    },
    {
      "name": "Santa Clara",
      "state": "California",
      "stateName": "California",
      "population": 120245,
      "rank": 220
    },
    {
      "name": "Abilene",
      "state": "Texas",
      "stateName": "Texas",
      "population": 120099,
      "rank": 221
    },
    {
      "name": "Athens-Clarke County",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 119980,
      "rank": 222
    },
    {
      "name": "Vallejo",
      "state": "California",
      "stateName": "California",
      "population": 118837,
      "rank": 223
    },
    {
      "name": "Allentown",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 118577,
      "rank": 224
    },
    {
      "name": "Norman",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 118197,
      "rank": 225
    },
    {
      "name": "Beaumont",
      "state": "Texas",
      "stateName": "Texas",
      "population": 117796,
      "rank": 226
    },
    {
      "name": "Independence",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 117240,
      "rank": 227
    },
    {
      "name": "Murfreesboro",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 117044,
      "rank": 228
    },
    {
      "name": "Ann Arbor",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 117025,
      "rank": 229
    },
    {
      "name": "Springfield",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 117006,
      "rank": 230
    },
    {
      "name": "Berkeley",
      "state": "California",
      "stateName": "California",
      "population": 116768,
      "rank": 231
    },
    {
      "name": "Peoria",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 116513,
      "rank": 232
    },
    {
      "name": "Provo",
      "state": "Utah",
      "stateName": "Utah",
      "population": 116288,
      "rank": 233
    },
    {
      "name": "El Monte",
      "state": "California",
      "stateName": "California",
      "population": 115708,
      "rank": 234
    },
    {
      "name": "Columbia",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 115276,
      "rank": 235
    },
    {
      "name": "Lansing",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 113972,
      "rank": 236
    },
    {
      "name": "Fargo",
      "state": "North Dakota",
      "stateName": "North Dakota",
      "population": 113658,
      "rank": 237
    },
    {
      "name": "Downey",
      "state": "California",
      "stateName": "California",
      "population": 113242,
      "rank": 238
    },
    {
      "name": "Costa Mesa",
      "state": "California",
      "stateName": "California",
      "population": 112174,
      "rank": 239
    },
    {
      "name": "Wilmington",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 112067,
      "rank": 240
    },
    {
      "name": "Arvada",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 111707,
      "rank": 241
    },
    {
      "name": "Inglewood",
      "state": "California",
      "stateName": "California",
      "population": 111542,
      "rank": 242
    },
    {
      "name": "Miami Gardens",
      "state": "Florida",
      "stateName": "Florida",
      "population": 111378,
      "rank": 243
    },
    {
      "name": "Carlsbad",
      "state": "California",
      "stateName": "California",
      "population": 110972,
      "rank": 244
    },
    {
      "name": "Westminster",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 110945,
      "rank": 245
    },
    {
      "name": "Rochester",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 110742,
      "rank": 246
    },
    {
      "name": "Odessa",
      "state": "Texas",
      "stateName": "Texas",
      "population": 110720,
      "rank": 247
    },
    {
      "name": "Manchester",
      "state": "New Hampshire",
      "stateName": "New Hampshire",
      "population": 110378,
      "rank": 248
    },
    {
      "name": "Elgin",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 110145,
      "rank": 249
    },
    {
      "name": "West Jordan",
      "state": "Utah",
      "stateName": "Utah",
      "population": 110077,
      "rank": 250
    },
    {
      "name": "Round Rock",
      "state": "Texas",
      "stateName": "Texas",
      "population": 109821,
      "rank": 251
    },
    {
      "name": "Clearwater",
      "state": "Florida",
      "stateName": "Florida",
      "population": 109703,
      "rank": 252
    },
    {
      "name": "Waterbury",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 109676,
      "rank": 253
    },
    {
      "name": "Gresham",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 109397,
      "rank": 254
    },
    {
      "name": "Fairfield",
      "state": "California",
      "stateName": "California",
      "population": 109320,
      "rank": 255
    },
    {
      "name": "Billings",
      "state": "Montana",
      "stateName": "Montana",
      "population": 109059,
      "rank": 256
    },
    {
      "name": "Lowell",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 108861,
      "rank": 257
    },
    {
      "name": "San Buenaventura (Ventura)",
      "state": "California",
      "stateName": "California",
      "population": 108817,
      "rank": 258
    },
    {
      "name": "Pueblo",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 108249,
      "rank": 259
    },
    {
      "name": "High Point",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 107741,
      "rank": 260
    },
    {
      "name": "West Covina",
      "state": "California",
      "stateName": "California",
      "population": 107740,
      "rank": 261
    },
    {
      "name": "Richmond",
      "state": "California",
      "stateName": "California",
      "population": 107571,
      "rank": 262
    },
    {
      "name": "Murrieta",
      "state": "California",
      "stateName": "California",
      "population": 107479,
      "rank": 263
    },
    {
      "name": "Cambridge",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 107289,
      "rank": 264
    },
    {
      "name": "Antioch",
      "state": "California",
      "stateName": "California",
      "population": 107100,
      "rank": 265
    },
    {
      "name": "Temecula",
      "state": "California",
      "stateName": "California",
      "population": 106780,
      "rank": 266
    },
    {
      "name": "Norwalk",
      "state": "California",
      "stateName": "California",
      "population": 106589,
      "rank": 267
    },
    {
      "name": "Centennial",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 106114,
      "rank": 268
    },
    {
      "name": "Everett",
      "state": "Washington",
      "stateName": "Washington",
      "population": 105370,
      "rank": 269
    },
    {
      "name": "Palm Bay",
      "state": "Florida",
      "stateName": "Florida",
      "population": 104898,
      "rank": 270
    },
    {
      "name": "Wichita Falls",
      "state": "Texas",
      "stateName": "Texas",
      "population": 104898,
      "rank": 271
    },
    {
      "name": "Green Bay",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 104779,
      "rank": 272
    },
    {
      "name": "Daly City",
      "state": "California",
      "stateName": "California",
      "population": 104739,
      "rank": 273
    },
    {
      "name": "Burbank",
      "state": "California",
      "stateName": "California",
      "population": 104709,
      "rank": 274
    },
    {
      "name": "Richardson",
      "state": "Texas",
      "stateName": "Texas",
      "population": 104475,
      "rank": 275
    },
    {
      "name": "Pompano Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 104410,
      "rank": 276
    },
    {
      "name": "North Charleston",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 104054,
      "rank": 277
    },
    {
      "name": "Broken Arrow",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 103500,
      "rank": 278
    },
    {
      "name": "Boulder",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 103166,
      "rank": 279
    },
    {
      "name": "West Palm Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 102436,
      "rank": 280
    },
    {
      "name": "Santa Maria",
      "state": "California",
      "stateName": "California",
      "population": 102216,
      "rank": 281
    },
    {
      "name": "El Cajon",
      "state": "California",
      "stateName": "California",
      "population": 102211,
      "rank": 282
    },
    {
      "name": "Davenport",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 102157,
      "rank": 283
    },
    {
      "name": "Rialto",
      "state": "California",
      "stateName": "California",
      "population": 101910,
      "rank": 284
    },
    {
      "name": "Las Cruces",
      "state": "New Mexico",
      "stateName": "New Mexico",
      "population": 101324,
      "rank": 285
    },
    {
      "name": "San Mateo",
      "state": "California",
      "stateName": "California",
      "population": 101128,
      "rank": 286
    },
    {
      "name": "Lewisville",
      "state": "Texas",
      "stateName": "Texas",
      "population": 101074,
      "rank": 287
    },
    {
      "name": "South Bend",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 100886,
      "rank": 288
    },
    {
      "name": "Lakeland",
      "state": "Florida",
      "stateName": "Florida",
      "population": 100710,
      "rank": 289
    },
    {
      "name": "Erie",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 100671,
      "rank": 290
    },
    {
      "name": "Tyler",
      "state": "Texas",
      "stateName": "Texas",
      "population": 100223,
      "rank": 291
    },
    {
      "name": "Pearland",
      "state": "Texas",
      "stateName": "Texas",
      "population": 100065,
      "rank": 292
    },
    {
      "name": "College Station",
      "state": "Texas",
      "stateName": "Texas",
      "population": 100050,
      "rank": 293
    },
    {
      "name": "Kenosha",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 99889,
      "rank": 294
    },
    {
      "name": "Sandy Springs",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 99770,
      "rank": 295
    },
    {
      "name": "Clovis",
      "state": "California",
      "stateName": "California",
      "population": 99769,
      "rank": 296
    },
    {
      "name": "Flint",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 99763,
      "rank": 297
    },
    {
      "name": "Roanoke",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 98465,
      "rank": 298
    },
    {
      "name": "Albany",
      "state": "New York",
      "stateName": "New York",
      "population": 98424,
      "rank": 299
    },
    {
      "name": "Jurupa Valley",
      "state": "California",
      "stateName": "California",
      "population": 98030,
      "rank": 300
    },
    {
      "name": "Compton",
      "state": "California",
      "stateName": "California",
      "population": 97877,
      "rank": 301
    },
    {
      "name": "San Angelo",
      "state": "Texas",
      "stateName": "Texas",
      "population": 97492,
      "rank": 302
    },
    {
      "name": "Hillsboro",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 97368,
      "rank": 303
    },
    {
      "name": "Lawton",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 97151,
      "rank": 304
    },
    {
      "name": "Renton",
      "state": "Washington",
      "stateName": "Washington",
      "population": 97003,
      "rank": 305
    },
    {
      "name": "Vista",
      "state": "California",
      "stateName": "California",
      "population": 96929,
      "rank": 306
    },
    {
      "name": "Davie",
      "state": "Florida",
      "stateName": "Florida",
      "population": 96830,
      "rank": 307
    },
    {
      "name": "Greeley",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 96539,
      "rank": 308
    },
    {
      "name": "Mission Viejo",
      "state": "California",
      "stateName": "California",
      "population": 96346,
      "rank": 309
    },
    {
      "name": "Portsmouth",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 96205,
      "rank": 310
    },
    {
      "name": "Dearborn",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 95884,
      "rank": 311
    },
    {
      "name": "South Gate",
      "state": "California",
      "stateName": "California",
      "population": 95677,
      "rank": 312
    },
    {
      "name": "Tuscaloosa",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 95334,
      "rank": 313
    },
    {
      "name": "Livonia",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 95208,
      "rank": 314
    },
    {
      "name": "New Bedford",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 95078,
      "rank": 315
    },
    {
      "name": "Vacaville",
      "state": "California",
      "stateName": "California",
      "population": 94275,
      "rank": 316
    },
    {
      "name": "Brockton",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 94089,
      "rank": 317
    },
    {
      "name": "Roswell",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 94034,
      "rank": 318
    },
    {
      "name": "Beaverton",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 93542,
      "rank": 319
    },
    {
      "name": "Quincy",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 93494,
      "rank": 320
    },
    {
      "name": "Sparks",
      "state": "Nevada",
      "stateName": "Nevada",
      "population": 93282,
      "rank": 321
    },
    {
      "name": "Yakima",
      "state": "Washington",
      "stateName": "Washington",
      "population": 93257,
      "rank": 322
    },
    {
      "name": "Lee's Summit",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 93184,
      "rank": 323
    },
    {
      "name": "Federal Way",
      "state": "Washington",
      "stateName": "Washington",
      "population": 92734,
      "rank": 324
    },
    {
      "name": "Carson",
      "state": "California",
      "stateName": "California",
      "population": 92599,
      "rank": 325
    },
    {
      "name": "Santa Monica",
      "state": "California",
      "stateName": "California",
      "population": 92472,
      "rank": 326
    },
    {
      "name": "Hesperia",
      "state": "California",
      "stateName": "California",
      "population": 92147,
      "rank": 327
    },
    {
      "name": "Allen",
      "state": "Texas",
      "stateName": "Texas",
      "population": 92020,
      "rank": 328
    },
    {
      "name": "Rio Rancho",
      "state": "New Mexico",
      "stateName": "New Mexico",
      "population": 91956,
      "rank": 329
    },
    {
      "name": "Yuma",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 91923,
      "rank": 330
    },
    {
      "name": "Westminster",
      "state": "California",
      "stateName": "California",
      "population": 91739,
      "rank": 331
    },
    {
      "name": "Orem",
      "state": "Utah",
      "stateName": "Utah",
      "population": 91648,
      "rank": 332
    },
    {
      "name": "Lynn",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 91589,
      "rank": 333
    },
    {
      "name": "Redding",
      "state": "California",
      "stateName": "California",
      "population": 91119,
      "rank": 334
    },
    {
      "name": "Spokane Valley",
      "state": "Washington",
      "stateName": "Washington",
      "population": 91113,
      "rank": 335
    },
    {
      "name": "Miami Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 91026,
      "rank": 336
    },
    {
      "name": "League City",
      "state": "Texas",
      "stateName": "Texas",
      "population": 90983,
      "rank": 337
    },
    {
      "name": "Lawrence",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 90811,
      "rank": 338
    },
    {
      "name": "Santa Barbara",
      "state": "California",
      "stateName": "California",
      "population": 90412,
      "rank": 339
    },
    {
      "name": "Plantation",
      "state": "Florida",
      "stateName": "Florida",
      "population": 90268,
      "rank": 340
    },
    {
      "name": "Sandy",
      "state": "Utah",
      "stateName": "Utah",
      "population": 90231,
      "rank": 341
    },
    {
      "name": "Sunrise",
      "state": "Florida",
      "stateName": "Florida",
      "population": 90116,
      "rank": 342
    },
    {
      "name": "Macon",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 89981,
      "rank": 343
    },
    {
      "name": "Longmont",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 89919,
      "rank": 344
    },
    {
      "name": "Boca Raton",
      "state": "Florida",
      "stateName": "Florida",
      "population": 89407,
      "rank": 345
    },
    {
      "name": "San Marcos",
      "state": "California",
      "stateName": "California",
      "population": 89387,
      "rank": 346
    },
    {
      "name": "Greenville",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 89130,
      "rank": 347
    },
    {
      "name": "Waukegan",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 88826,
      "rank": 348
    },
    {
      "name": "Fall River",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 88697,
      "rank": 349
    },
    {
      "name": "Chico",
      "state": "California",
      "stateName": "California",
      "population": 88077,
      "rank": 350
    },
    {
      "name": "Newton",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 87971,
      "rank": 351
    },
    {
      "name": "San Leandro",
      "state": "California",
      "stateName": "California",
      "population": 87965,
      "rank": 352
    },
    {
      "name": "Reading",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 87893,
      "rank": 353
    },
    {
      "name": "Norwalk",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 87776,
      "rank": 354
    },
    {
      "name": "Fort Smith",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 87650,
      "rank": 355
    },
    {
      "name": "Newport Beach",
      "state": "California",
      "stateName": "California",
      "population": 87273,
      "rank": 356
    },
    {
      "name": "Asheville",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 87236,
      "rank": 357
    },
    {
      "name": "Nashua",
      "state": "New Hampshire",
      "stateName": "New Hampshire",
      "population": 87137,
      "rank": 358
    },
    {
      "name": "Edmond",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 87004,
      "rank": 359
    },
    {
      "name": "Whittier",
      "state": "California",
      "stateName": "California",
      "population": 86635,
      "rank": 360
    },
    {
      "name": "Nampa",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 86518,
      "rank": 361
    },
    {
      "name": "Bloomington",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 86319,
      "rank": 362
    },
    {
      "name": "Deltona",
      "state": "Florida",
      "stateName": "Florida",
      "population": 86290,
      "rank": 363
    },
    {
      "name": "Hawthorne",
      "state": "California",
      "stateName": "California",
      "population": 86199,
      "rank": 364
    },
    {
      "name": "Duluth",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 86128,
      "rank": 365
    },
    {
      "name": "Carmel",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 85927,
      "rank": 366
    },
    {
      "name": "Suffolk",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 85728,
      "rank": 367
    },
    {
      "name": "Clifton",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 85390,
      "rank": 368
    },
    {
      "name": "Citrus Heights",
      "state": "California",
      "stateName": "California",
      "population": 85285,
      "rank": 369
    },
    {
      "name": "Livermore",
      "state": "California",
      "stateName": "California",
      "population": 85156,
      "rank": 370
    },
    {
      "name": "Tracy",
      "state": "California",
      "stateName": "California",
      "population": 84691,
      "rank": 371
    },
    {
      "name": "Alhambra",
      "state": "California",
      "stateName": "California",
      "population": 84577,
      "rank": 372
    },
    {
      "name": "Kirkland",
      "state": "Washington",
      "stateName": "Washington",
      "population": 84430,
      "rank": 373
    },
    {
      "name": "Trenton",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 84349,
      "rank": 374
    },
    {
      "name": "Ogden",
      "state": "Utah",
      "stateName": "Utah",
      "population": 84249,
      "rank": 375
    },
    {
      "name": "Hoover",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 84126,
      "rank": 376
    },
    {
      "name": "Cicero",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 84103,
      "rank": 377
    },
    {
      "name": "Fishers",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 83891,
      "rank": 378
    },
    {
      "name": "Sugar Land",
      "state": "Texas",
      "stateName": "Texas",
      "population": 83860,
      "rank": 379
    },
    {
      "name": "Danbury",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 83684,
      "rank": 380
    },
    {
      "name": "Meridian",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 83596,
      "rank": 381
    },
    {
      "name": "Indio",
      "state": "California",
      "stateName": "California",
      "population": 83539,
      "rank": 382
    },
    {
      "name": "Concord",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 83506,
      "rank": 383
    },
    {
      "name": "Menifee",
      "state": "California",
      "stateName": "California",
      "population": 83447,
      "rank": 384
    },
    {
      "name": "Champaign",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 83424,
      "rank": 385
    },
    {
      "name": "Buena Park",
      "state": "California",
      "stateName": "California",
      "population": 82882,
      "rank": 386
    },
    {
      "name": "Troy",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 82821,
      "rank": 387
    },
    {
      "name": "O'Fallon",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 82809,
      "rank": 388
    },
    {
      "name": "Johns Creek",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 82788,
      "rank": 389
    },
    {
      "name": "Bellingham",
      "state": "Washington",
      "stateName": "Washington",
      "population": 82631,
      "rank": 390
    },
    {
      "name": "Westland",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 82578,
      "rank": 391
    },
    {
      "name": "Bloomington",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 82575,
      "rank": 392
    },
    {
      "name": "Sioux City",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 82459,
      "rank": 393
    },
    {
      "name": "Warwick",
      "state": "Rhode Island",
      "stateName": "Rhode Island",
      "population": 81971,
      "rank": 394
    },
    {
      "name": "Hemet",
      "state": "California",
      "stateName": "California",
      "population": 81750,
      "rank": 395
    },
    {
      "name": "Longview",
      "state": "Texas",
      "stateName": "Texas",
      "population": 81443,
      "rank": 396
    },
    {
      "name": "Farmington Hills",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 81295,
      "rank": 397
    },
    {
      "name": "Bend",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 81236,
      "rank": 398
    },
    {
      "name": "Lakewood",
      "state": "California",
      "stateName": "California",
      "population": 81121,
      "rank": 399
    },
    {
      "name": "Merced",
      "state": "California",
      "stateName": "California",
      "population": 81102,
      "rank": 400
    },
    {
      "name": "Mission",
      "state": "Texas",
      "stateName": "Texas",
      "population": 81050,
      "rank": 401
    },
    {
      "name": "Chino",
      "state": "California",
      "stateName": "California",
      "population": 80988,
      "rank": 402
    },
    {
      "name": "Redwood City",
      "state": "California",
      "stateName": "California",
      "population": 80872,
      "rank": 403
    },
    {
      "name": "Edinburg",
      "state": "Texas",
      "stateName": "Texas",
      "population": 80836,
      "rank": 404
    },
    {
      "name": "Cranston",
      "state": "Rhode Island",
      "stateName": "Rhode Island",
      "population": 80566,
      "rank": 405
    },
    {
      "name": "Parma",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 80429,
      "rank": 406
    },
    {
      "name": "New Rochelle",
      "state": "New York",
      "stateName": "New York",
      "population": 79446,
      "rank": 407
    },
    {
      "name": "Lake Forest",
      "state": "California",
      "stateName": "California",
      "population": 79312,
      "rank": 408
    },
    {
      "name": "Napa",
      "state": "California",
      "stateName": "California",
      "population": 79068,
      "rank": 409
    },
    {
      "name": "Hammond",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 78967,
      "rank": 410
    },
    {
      "name": "Fayetteville",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 78960,
      "rank": 411
    },
    {
      "name": "Bloomington",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 78902,
      "rank": 412
    },
    {
      "name": "Avondale",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 78822,
      "rank": 413
    },
    {
      "name": "Somerville",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 78804,
      "rank": 414
    },
    {
      "name": "Palm Coast",
      "state": "Florida",
      "stateName": "Florida",
      "population": 78740,
      "rank": 415
    },
    {
      "name": "Bryan",
      "state": "Texas",
      "stateName": "Texas",
      "population": 78709,
      "rank": 416
    },
    {
      "name": "Gary",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 78450,
      "rank": 417
    },
    {
      "name": "Largo",
      "state": "Florida",
      "stateName": "Florida",
      "population": 78409,
      "rank": 418
    },
    {
      "name": "Brooklyn Park",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 78373,
      "rank": 419
    },
    {
      "name": "Tustin",
      "state": "California",
      "stateName": "California",
      "population": 78327,
      "rank": 420
    },
    {
      "name": "Racine",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 78199,
      "rank": 421
    },
    {
      "name": "Deerfield Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 78041,
      "rank": 422
    },
    {
      "name": "Lynchburg",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 78014,
      "rank": 423
    },
    {
      "name": "Mountain View",
      "state": "California",
      "stateName": "California",
      "population": 77846,
      "rank": 424
    },
    {
      "name": "Medford",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 77677,
      "rank": 425
    },
    {
      "name": "Lawrence",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 77657,
      "rank": 426
    },
    {
      "name": "Bellflower",
      "state": "California",
      "stateName": "California",
      "population": 77593,
      "rank": 427
    },
    {
      "name": "Melbourne",
      "state": "Florida",
      "stateName": "Florida",
      "population": 77508,
      "rank": 428
    },
    {
      "name": "St. Joseph",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 77147,
      "rank": 429
    },
    {
      "name": "Camden",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 76903,
      "rank": 430
    },
    {
      "name": "St. George",
      "state": "Utah",
      "stateName": "Utah",
      "population": 76817,
      "rank": 431
    },
    {
      "name": "Kennewick",
      "state": "Washington",
      "stateName": "Washington",
      "population": 76762,
      "rank": 432
    },
    {
      "name": "Baldwin Park",
      "state": "California",
      "stateName": "California",
      "population": 76635,
      "rank": 433
    },
    {
      "name": "Chino Hills",
      "state": "California",
      "stateName": "California",
      "population": 76572,
      "rank": 434
    },
    {
      "name": "Alameda",
      "state": "California",
      "stateName": "California",
      "population": 76419,
      "rank": 435
    },
    {
      "name": "Albany",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 76185,
      "rank": 436
    },
    {
      "name": "Arlington Heights",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 75994,
      "rank": 437
    },
    {
      "name": "Scranton",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 75806,
      "rank": 438
    },
    {
      "name": "Evanston",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 75570,
      "rank": 439
    },
    {
      "name": "Kalamazoo",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 75548,
      "rank": 440
    },
    {
      "name": "Baytown",
      "state": "Texas",
      "stateName": "Texas",
      "population": 75418,
      "rank": 441
    },
    {
      "name": "Upland",
      "state": "California",
      "stateName": "California",
      "population": 75413,
      "rank": 442
    },
    {
      "name": "Springdale",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 75229,
      "rank": 443
    },
    {
      "name": "Bethlehem",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 75018,
      "rank": 444
    },
    {
      "name": "Schaumburg",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 74907,
      "rank": 445
    },
    {
      "name": "Mount Pleasant",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 74885,
      "rank": 446
    },
    {
      "name": "Auburn",
      "state": "Washington",
      "stateName": "Washington",
      "population": 74860,
      "rank": 447
    },
    {
      "name": "Decatur",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 74710,
      "rank": 448
    },
    {
      "name": "San Ramon",
      "state": "California",
      "stateName": "California",
      "population": 74513,
      "rank": 449
    },
    {
      "name": "Pleasanton",
      "state": "California",
      "stateName": "California",
      "population": 74110,
      "rank": 450
    },
    {
      "name": "Wyoming",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 74100,
      "rank": 451
    },
    {
      "name": "Lake Charles",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 74024,
      "rank": 452
    },
    {
      "name": "Plymouth",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 73987,
      "rank": 453
    },
    {
      "name": "Bolingbrook",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 73936,
      "rank": 454
    },
    {
      "name": "Pharr",
      "state": "Texas",
      "stateName": "Texas",
      "population": 73790,
      "rank": 455
    },
    {
      "name": "Appleton",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 73596,
      "rank": 456
    },
    {
      "name": "Gastonia",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 73209,
      "rank": 457
    },
    {
      "name": "Folsom",
      "state": "California",
      "stateName": "California",
      "population": 73098,
      "rank": 458
    },
    {
      "name": "Southfield",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 73006,
      "rank": 459
    },
    {
      "name": "Rochester Hills",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 72952,
      "rank": 460
    },
    {
      "name": "New Britain",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 72939,
      "rank": 461
    },
    {
      "name": "Goodyear",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 72864,
      "rank": 462
    },
    {
      "name": "Canton",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 72535,
      "rank": 463
    },
    {
      "name": "Warner Robins",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 72531,
      "rank": 464
    },
    {
      "name": "Union City",
      "state": "California",
      "stateName": "California",
      "population": 72528,
      "rank": 465
    },
    {
      "name": "Perris",
      "state": "California",
      "stateName": "California",
      "population": 72326,
      "rank": 466
    },
    {
      "name": "Manteca",
      "state": "California",
      "stateName": "California",
      "population": 71948,
      "rank": 467
    },
    {
      "name": "Iowa City",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 71591,
      "rank": 468
    },
    {
      "name": "Jonesboro",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 71551,
      "rank": 469
    },
    {
      "name": "Wilmington",
      "state": "Delaware",
      "stateName": "Delaware",
      "population": 71525,
      "rank": 470
    },
    {
      "name": "Lynwood",
      "state": "California",
      "stateName": "California",
      "population": 71371,
      "rank": 471
    },
    {
      "name": "Loveland",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 71334,
      "rank": 472
    },
    {
      "name": "Pawtucket",
      "state": "Rhode Island",
      "stateName": "Rhode Island",
      "population": 71172,
      "rank": 473
    },
    {
      "name": "Boynton Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 71097,
      "rank": 474
    },
    {
      "name": "Waukesha",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 71016,
      "rank": 475
    },
    {
      "name": "Gulfport",
      "state": "Mississippi",
      "stateName": "Mississippi",
      "population": 71012,
      "rank": 476
    },
    {
      "name": "Apple Valley",
      "state": "California",
      "stateName": "California",
      "population": 70924,
      "rank": 477
    },
    {
      "name": "Passaic",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 70868,
      "rank": 478
    },
    {
      "name": "Rapid City",
      "state": "South Dakota",
      "stateName": "South Dakota",
      "population": 70812,
      "rank": 479
    },
    {
      "name": "Layton",
      "state": "Utah",
      "stateName": "Utah",
      "population": 70790,
      "rank": 480
    },
    {
      "name": "Lafayette",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 70373,
      "rank": 481
    },
    {
      "name": "Turlock",
      "state": "California",
      "stateName": "California",
      "population": 70365,
      "rank": 482
    },
    {
      "name": "Muncie",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 70316,
      "rank": 483
    },
    {
      "name": "Temple",
      "state": "Texas",
      "stateName": "Texas",
      "population": 70190,
      "rank": 484
    },
    {
      "name": "Missouri City",
      "state": "Texas",
      "stateName": "Texas",
      "population": 70185,
      "rank": 485
    },
    {
      "name": "Redlands",
      "state": "California",
      "stateName": "California",
      "population": 69999,
      "rank": 486
    },
    {
      "name": "Santa Fe",
      "state": "New Mexico",
      "stateName": "New Mexico",
      "population": 69976,
      "rank": 487
    },
    {
      "name": "Lauderhill",
      "state": "Florida",
      "stateName": "Florida",
      "population": 69813,
      "rank": 488
    },
    {
      "name": "Milpitas",
      "state": "California",
      "stateName": "California",
      "population": 69783,
      "rank": 489
    },
    {
      "name": "Palatine",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 69350,
      "rank": 490
    },
    {
      "name": "Missoula",
      "state": "Montana",
      "stateName": "Montana",
      "population": 69122,
      "rank": 491
    },
    {
      "name": "Rock Hill",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 69103,
      "rank": 492
    },
    {
      "name": "Jacksonville",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 69079,
      "rank": 493
    },
    {
      "name": "Franklin",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 68886,
      "rank": 494
    },
    {
      "name": "Flagstaff",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 68667,
      "rank": 495
    },
    {
      "name": "Flower Mound",
      "state": "Texas",
      "stateName": "Texas",
      "population": 68609,
      "rank": 496
    },
    {
      "name": "Weston",
      "state": "Florida",
      "stateName": "Florida",
      "population": 68388,
      "rank": 497
    },
    {
      "name": "Waterloo",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 68366,
      "rank": 498
    },
    {
      "name": "Union City",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 68247,
      "rank": 499
    },
    {
      "name": "Mount Vernon",
      "state": "New York",
      "stateName": "New York",
      "population": 68224,
      "rank": 500
    },
    {
      "name": "Fort Myers",
      "state": "Florida",
      "stateName": "Florida",
      "population": 68190,
      "rank": 501
    },
    {
      "name": "Dothan",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 68001,
      "rank": 502
    },
    {
      "name": "Rancho Cordova",
      "state": "California",
      "stateName": "California",
      "population": 67911,
      "rank": 503
    },
    {
      "name": "Redondo Beach",
      "state": "California",
      "stateName": "California",
      "population": 67815,
      "rank": 504
    },
    {
      "name": "Jackson",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 67685,
      "rank": 505
    },
    {
      "name": "Pasco",
      "state": "Washington",
      "stateName": "Washington",
      "population": 67599,
      "rank": 506
    },
    {
      "name": "St. Charles",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 67569,
      "rank": 507
    },
    {
      "name": "Eau Claire",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 67545,
      "rank": 508
    },
    {
      "name": "North Richland Hills",
      "state": "Texas",
      "stateName": "Texas",
      "population": 67317,
      "rank": 509
    },
    {
      "name": "Bismarck",
      "state": "North Dakota",
      "stateName": "North Dakota",
      "population": 67034,
      "rank": 510
    },
    {
      "name": "Yorba Linda",
      "state": "California",
      "stateName": "California",
      "population": 67032,
      "rank": 511
    },
    {
      "name": "Kenner",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 66975,
      "rank": 512
    },
    {
      "name": "Walnut Creek",
      "state": "California",
      "stateName": "California",
      "population": 66900,
      "rank": 513
    },
    {
      "name": "Frederick",
      "state": "Maryland",
      "stateName": "Maryland",
      "population": 66893,
      "rank": 514
    },
    {
      "name": "Oshkosh",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 66778,
      "rank": 515
    },
    {
      "name": "Pittsburg",
      "state": "California",
      "stateName": "California",
      "population": 66695,
      "rank": 516
    },
    {
      "name": "Palo Alto",
      "state": "California",
      "stateName": "California",
      "population": 66642,
      "rank": 517
    },
    {
      "name": "Bossier City",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 66333,
      "rank": 518
    },
    {
      "name": "Portland",
      "state": "Maine",
      "stateName": "Maine",
      "population": 66318,
      "rank": 519
    },
    {
      "name": "St. Cloud",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 66297,
      "rank": 520
    },
    {
      "name": "Davis",
      "state": "California",
      "stateName": "California",
      "population": 66205,
      "rank": 521
    },
    {
      "name": "South San Francisco",
      "state": "California",
      "stateName": "California",
      "population": 66174,
      "rank": 522
    },
    {
      "name": "Camarillo",
      "state": "California",
      "stateName": "California",
      "population": 66086,
      "rank": 523
    },
    {
      "name": "North Little Rock",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 66075,
      "rank": 524
    },
    {
      "name": "Schenectady",
      "state": "New York",
      "stateName": "New York",
      "population": 65902,
      "rank": 525
    },
    {
      "name": "Gaithersburg",
      "state": "Maryland",
      "stateName": "Maryland",
      "population": 65690,
      "rank": 526
    },
    {
      "name": "Harlingen",
      "state": "Texas",
      "stateName": "Texas",
      "population": 65665,
      "rank": 527
    },
    {
      "name": "Woodbury",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 65656,
      "rank": 528
    },
    {
      "name": "Eagan",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 65453,
      "rank": 529
    },
    {
      "name": "Yuba City",
      "state": "California",
      "stateName": "California",
      "population": 65416,
      "rank": 530
    },
    {
      "name": "Maple Grove",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 65415,
      "rank": 531
    },
    {
      "name": "Youngstown",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 65184,
      "rank": 532
    },
    {
      "name": "Skokie",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 65176,
      "rank": 533
    },
    {
      "name": "Kissimmee",
      "state": "Florida",
      "stateName": "Florida",
      "population": 65173,
      "rank": 534
    },
    {
      "name": "Johnson City",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 65123,
      "rank": 535
    },
    {
      "name": "Victoria",
      "state": "Texas",
      "stateName": "Texas",
      "population": 65098,
      "rank": 536
    },
    {
      "name": "San Clemente",
      "state": "California",
      "stateName": "California",
      "population": 65040,
      "rank": 537
    },
    {
      "name": "Bayonne",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 65028,
      "rank": 538
    },
    {
      "name": "Laguna Niguel",
      "state": "California",
      "stateName": "California",
      "population": 64652,
      "rank": 539
    },
    {
      "name": "East Orange",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 64544,
      "rank": 540
    },
    {
      "name": "Shawnee",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 64323,
      "rank": 541
    },
    {
      "name": "Homestead",
      "state": "Florida",
      "stateName": "Florida",
      "population": 64079,
      "rank": 542
    },
    {
      "name": "Rockville",
      "state": "Maryland",
      "stateName": "Maryland",
      "population": 64072,
      "rank": 544
    },
    {
      "name": "Delray Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 64072,
      "rank": 543
    },
    {
      "name": "Janesville",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 63820,
      "rank": 545
    },
    {
      "name": "Conway",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 63816,
      "rank": 546
    },
    {
      "name": "Pico Rivera",
      "state": "California",
      "stateName": "California",
      "population": 63771,
      "rank": 547
    },
    {
      "name": "Lorain",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 63710,
      "rank": 548
    },
    {
      "name": "Montebello",
      "state": "California",
      "stateName": "California",
      "population": 63495,
      "rank": 549
    },
    {
      "name": "Lodi",
      "state": "California",
      "stateName": "California",
      "population": 63338,
      "rank": 550
    },
    {
      "name": "New Braunfels",
      "state": "Texas",
      "stateName": "Texas",
      "population": 63279,
      "rank": 551
    },
    {
      "name": "Marysville",
      "state": "Washington",
      "stateName": "Washington",
      "population": 63269,
      "rank": 552
    },
    {
      "name": "Tamarac",
      "state": "Florida",
      "stateName": "Florida",
      "population": 63155,
      "rank": 553
    },
    {
      "name": "Madera",
      "state": "California",
      "stateName": "California",
      "population": 63105,
      "rank": 554
    },
    {
      "name": "Conroe",
      "state": "Texas",
      "stateName": "Texas",
      "population": 63032,
      "rank": 555
    },
    {
      "name": "Santa Cruz",
      "state": "California",
      "stateName": "California",
      "population": 62864,
      "rank": 556
    },
    {
      "name": "Eden Prairie",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 62603,
      "rank": 557
    },
    {
      "name": "Cheyenne",
      "state": "Wyoming",
      "stateName": "Wyoming",
      "population": 62448,
      "rank": 558
    },
    {
      "name": "Daytona Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 62316,
      "rank": 559
    },
    {
      "name": "Alpharetta",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 62298,
      "rank": 560
    },
    {
      "name": "Hamilton",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 62258,
      "rank": 561
    },
    {
      "name": "Waltham",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 62227,
      "rank": 562
    },
    {
      "name": "Coon Rapids",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 62103,
      "rank": 563
    },
    {
      "name": "Haverhill",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 62088,
      "rank": 564
    },
    {
      "name": "Council Bluffs",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 61969,
      "rank": 565
    },
    {
      "name": "Taylor",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 61817,
      "rank": 566
    },
    {
      "name": "Utica",
      "state": "New York",
      "stateName": "New York",
      "population": 61808,
      "rank": 567
    },
    {
      "name": "Ames",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 61792,
      "rank": 568
    },
    {
      "name": "La Habra",
      "state": "California",
      "stateName": "California",
      "population": 61653,
      "rank": 569
    },
    {
      "name": "Encinitas",
      "state": "California",
      "stateName": "California",
      "population": 61588,
      "rank": 570
    },
    {
      "name": "Bowling Green",
      "state": "Kentucky",
      "stateName": "Kentucky",
      "population": 61488,
      "rank": 571
    },
    {
      "name": "Burnsville",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 61434,
      "rank": 572
    },
    {
      "name": "Greenville",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 61397,
      "rank": 573
    },
    {
      "name": "West Des Moines",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 61255,
      "rank": 574
    },
    {
      "name": "Cedar Park",
      "state": "Texas",
      "stateName": "Texas",
      "population": 61238,
      "rank": 575
    },
    {
      "name": "Tulare",
      "state": "California",
      "stateName": "California",
      "population": 61170,
      "rank": 576
    },
    {
      "name": "Monterey Park",
      "state": "California",
      "stateName": "California",
      "population": 61085,
      "rank": 577
    },
    {
      "name": "Vineland",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 61050,
      "rank": 578
    },
    {
      "name": "Terre Haute",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 61025,
      "rank": 579
    },
    {
      "name": "North Miami",
      "state": "Florida",
      "stateName": "Florida",
      "population": 61007,
      "rank": 580
    },
    {
      "name": "Mansfield",
      "state": "Texas",
      "stateName": "Texas",
      "population": 60872,
      "rank": 581
    },
    {
      "name": "West Allis",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 60697,
      "rank": 582
    },
    {
      "name": "Bristol",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 60568,
      "rank": 583
    },
    {
      "name": "Taylorsville",
      "state": "Utah",
      "stateName": "Utah",
      "population": 60519,
      "rank": 584
    },
    {
      "name": "Malden",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 60509,
      "rank": 585
    },
    {
      "name": "Meriden",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 60456,
      "rank": 586
    },
    {
      "name": "Blaine",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 60407,
      "rank": 587
    },
    {
      "name": "Wellington",
      "state": "Florida",
      "stateName": "Florida",
      "population": 60202,
      "rank": 588
    },
    {
      "name": "Cupertino",
      "state": "California",
      "stateName": "California",
      "population": 60189,
      "rank": 589
    },
    {
      "name": "Springfield",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 60177,
      "rank": 590
    },
    {
      "name": "Rogers",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 60112,
      "rank": 591
    },
    {
      "name": "St. Clair Shores",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 60070,
      "rank": 592
    },
    {
      "name": "Gardena",
      "state": "California",
      "stateName": "California",
      "population": 59957,
      "rank": 593
    },
    {
      "name": "Pontiac",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 59887,
      "rank": 594
    },
    {
      "name": "National City",
      "state": "California",
      "stateName": "California",
      "population": 59834,
      "rank": 595
    },
    {
      "name": "Grand Junction",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 59778,
      "rank": 596
    },
    {
      "name": "Rocklin",
      "state": "California",
      "stateName": "California",
      "population": 59738,
      "rank": 597
    },
    {
      "name": "Chapel Hill",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 59635,
      "rank": 598
    },
    {
      "name": "Casper",
      "state": "Wyoming",
      "stateName": "Wyoming",
      "population": 59628,
      "rank": 599
    },
    {
      "name": "Broomfield",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 59471,
      "rank": 600
    },
    {
      "name": "Petaluma",
      "state": "California",
      "stateName": "California",
      "population": 59440,
      "rank": 601
    },
    {
      "name": "South Jordan",
      "state": "Utah",
      "stateName": "Utah",
      "population": 59366,
      "rank": 602
    },
    {
      "name": "Springfield",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 59357,
      "rank": 603
    },
    {
      "name": "Great Falls",
      "state": "Montana",
      "stateName": "Montana",
      "population": 59351,
      "rank": 604
    },
    {
      "name": "Lancaster",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 59325,
      "rank": 605
    },
    {
      "name": "North Port",
      "state": "Florida",
      "stateName": "Florida",
      "population": 59212,
      "rank": 606
    },
    {
      "name": "Lakewood",
      "state": "Washington",
      "stateName": "Washington",
      "population": 59097,
      "rank": 607
    },
    {
      "name": "Marietta",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 59089,
      "rank": 608
    },
    {
      "name": "San Rafael",
      "state": "California",
      "stateName": "California",
      "population": 58994,
      "rank": 609
    },
    {
      "name": "Royal Oak",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 58946,
      "rank": 610
    },
    {
      "name": "Des Plaines",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 58918,
      "rank": 611
    },
    {
      "name": "Huntington Park",
      "state": "California",
      "stateName": "California",
      "population": 58879,
      "rank": 612
    },
    {
      "name": "La Mesa",
      "state": "California",
      "stateName": "California",
      "population": 58642,
      "rank": 613
    },
    {
      "name": "Orland Park",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 58590,
      "rank": 614
    },
    {
      "name": "Auburn",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 58582,
      "rank": 615
    },
    {
      "name": "Lakeville",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 58562,
      "rank": 616
    },
    {
      "name": "Owensboro",
      "state": "Kentucky",
      "stateName": "Kentucky",
      "population": 58416,
      "rank": 617
    },
    {
      "name": "Moore",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 58414,
      "rank": 618
    },
    {
      "name": "Jupiter",
      "state": "Florida",
      "stateName": "Florida",
      "population": 58298,
      "rank": 619
    },
    {
      "name": "Idaho Falls",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 58292,
      "rank": 620
    },
    {
      "name": "Dubuque",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 58253,
      "rank": 621
    },
    {
      "name": "Bartlett",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 58226,
      "rank": 622
    },
    {
      "name": "Rowlett",
      "state": "Texas",
      "stateName": "Texas",
      "population": 58043,
      "rank": 623
    },
    {
      "name": "Novi",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 57960,
      "rank": 624
    },
    {
      "name": "White Plains",
      "state": "New York",
      "stateName": "New York",
      "population": 57866,
      "rank": 625
    },
    {
      "name": "Arcadia",
      "state": "California",
      "stateName": "California",
      "population": 57639,
      "rank": 626
    },
    {
      "name": "Redmond",
      "state": "Washington",
      "stateName": "Washington",
      "population": 57530,
      "rank": 627
    },
    {
      "name": "Lake Elsinore",
      "state": "California",
      "stateName": "California",
      "population": 57525,
      "rank": 628
    },
    {
      "name": "Ocala",
      "state": "Florida",
      "stateName": "Florida",
      "population": 57468,
      "rank": 629
    },
    {
      "name": "Tinley Park",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 57282,
      "rank": 630
    },
    {
      "name": "Port Orange",
      "state": "Florida",
      "stateName": "Florida",
      "population": 57203,
      "rank": 631
    },
    {
      "name": "Medford",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 57170,
      "rank": 632
    },
    {
      "name": "Oak Lawn",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 57073,
      "rank": 633
    },
    {
      "name": "Rocky Mount",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 56954,
      "rank": 634
    },
    {
      "name": "Kokomo",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 56895,
      "rank": 635
    },
    {
      "name": "Coconut Creek",
      "state": "Florida",
      "stateName": "Florida",
      "population": 56792,
      "rank": 636
    },
    {
      "name": "Bowie",
      "state": "Maryland",
      "stateName": "Maryland",
      "population": 56759,
      "rank": 637
    },
    {
      "name": "Berwyn",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 56758,
      "rank": 638
    },
    {
      "name": "Midwest City",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 56756,
      "rank": 639
    },
    {
      "name": "Fountain Valley",
      "state": "California",
      "stateName": "California",
      "population": 56707,
      "rank": 640
    },
    {
      "name": "Buckeye",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 56683,
      "rank": 641
    },
    {
      "name": "Dearborn Heights",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 56620,
      "rank": 642
    },
    {
      "name": "Woodland",
      "state": "California",
      "stateName": "California",
      "population": 56590,
      "rank": 643
    },
    {
      "name": "Noblesville",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 56540,
      "rank": 644
    },
    {
      "name": "Valdosta",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 56481,
      "rank": 645
    },
    {
      "name": "Diamond Bar",
      "state": "California",
      "stateName": "California",
      "population": 56449,
      "rank": 646
    },
    {
      "name": "Manhattan",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 56143,
      "rank": 647
    },
    {
      "name": "Santee",
      "state": "California",
      "stateName": "California",
      "population": 56105,
      "rank": 648
    },
    {
      "name": "Taunton",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 56069,
      "rank": 649
    },
    {
      "name": "Sanford",
      "state": "Florida",
      "stateName": "Florida",
      "population": 56002,
      "rank": 650
    },
    {
      "name": "Kettering",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 55870,
      "rank": 651
    },
    {
      "name": "New Brunswick",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 55831,
      "rank": 652
    },
    {
      "name": "Decatur",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 55816,
      "rank": 653
    },
    {
      "name": "Chicopee",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 55717,
      "rank": 654
    },
    {
      "name": "Anderson",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 55670,
      "rank": 655
    },
    {
      "name": "Margate",
      "state": "Florida",
      "stateName": "Florida",
      "population": 55456,
      "rank": 656
    },
    {
      "name": "Weymouth Town",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 55419,
      "rank": 657
    },
    {
      "name": "Hempstead",
      "state": "New York",
      "stateName": "New York",
      "population": 55361,
      "rank": 658
    },
    {
      "name": "Corvallis",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 55298,
      "rank": 659
    },
    {
      "name": "Eastvale",
      "state": "California",
      "stateName": "California",
      "population": 55191,
      "rank": 660
    },
    {
      "name": "Porterville",
      "state": "California",
      "stateName": "California",
      "population": 55174,
      "rank": 661
    },
    {
      "name": "West Haven",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 55046,
      "rank": 662
    },
    {
      "name": "Brentwood",
      "state": "California",
      "stateName": "California",
      "population": 55000,
      "rank": 663
    },
    {
      "name": "Paramount",
      "state": "California",
      "stateName": "California",
      "population": 54980,
      "rank": 664
    },
    {
      "name": "Grand Forks",
      "state": "North Dakota",
      "stateName": "North Dakota",
      "population": 54932,
      "rank": 665
    },
    {
      "name": "Georgetown",
      "state": "Texas",
      "stateName": "Texas",
      "population": 54898,
      "rank": 666
    },
    {
      "name": "St. Peters",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 54842,
      "rank": 667
    },
    {
      "name": "Shoreline",
      "state": "Washington",
      "stateName": "Washington",
      "population": 54790,
      "rank": 668
    },
    {
      "name": "Mount Prospect",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 54771,
      "rank": 669
    },
    {
      "name": "Hanford",
      "state": "California",
      "stateName": "California",
      "population": 54686,
      "rank": 670
    },
    {
      "name": "Normal",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 54664,
      "rank": 671
    },
    {
      "name": "Rosemead",
      "state": "California",
      "stateName": "California",
      "population": 54561,
      "rank": 672
    },
    {
      "name": "Lehi",
      "state": "Utah",
      "stateName": "Utah",
      "population": 54382,
      "rank": 673
    },
    {
      "name": "Pocatello",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 54350,
      "rank": 674
    },
    {
      "name": "Highland",
      "state": "California",
      "stateName": "California",
      "population": 54291,
      "rank": 675
    },
    {
      "name": "Novato",
      "state": "California",
      "stateName": "California",
      "population": 54194,
      "rank": 676
    },
    {
      "name": "Port Arthur",
      "state": "Texas",
      "stateName": "Texas",
      "population": 54135,
      "rank": 677
    },
    {
      "name": "Carson City",
      "state": "Nevada",
      "stateName": "Nevada",
      "population": 54080,
      "rank": 678
    },
    {
      "name": "San Marcos",
      "state": "Texas",
      "stateName": "Texas",
      "population": 54076,
      "rank": 679
    },
    {
      "name": "Hendersonville",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 54068,
      "rank": 680
    },
    {
      "name": "Elyria",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 53956,
      "rank": 681
    },
    {
      "name": "Revere",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 53756,
      "rank": 682
    },
    {
      "name": "Pflugerville",
      "state": "Texas",
      "stateName": "Texas",
      "population": 53752,
      "rank": 683
    },
    {
      "name": "Greenwood",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 53665,
      "rank": 684
    },
    {
      "name": "Bellevue",
      "state": "Nebraska",
      "stateName": "Nebraska",
      "population": 53663,
      "rank": 685
    },
    {
      "name": "Wheaton",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 53648,
      "rank": 686
    },
    {
      "name": "Smyrna",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 53438,
      "rank": 687
    },
    {
      "name": "Sarasota",
      "state": "Florida",
      "stateName": "Florida",
      "population": 53326,
      "rank": 688
    },
    {
      "name": "Blue Springs",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 53294,
      "rank": 689
    },
    {
      "name": "Colton",
      "state": "California",
      "stateName": "California",
      "population": 53243,
      "rank": 690
    },
    {
      "name": "Euless",
      "state": "Texas",
      "stateName": "Texas",
      "population": 53224,
      "rank": 691
    },
    {
      "name": "Castle Rock",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 53063,
      "rank": 692
    },
    {
      "name": "Cathedral City",
      "state": "California",
      "stateName": "California",
      "population": 52977,
      "rank": 693
    },
    {
      "name": "Kingsport",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 52962,
      "rank": 694
    },
    {
      "name": "Lake Havasu City",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 52844,
      "rank": 695
    },
    {
      "name": "Pensacola",
      "state": "Florida",
      "stateName": "Florida",
      "population": 52703,
      "rank": 696
    },
    {
      "name": "Hoboken",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 52575,
      "rank": 697
    },
    {
      "name": "Yucaipa",
      "state": "California",
      "stateName": "California",
      "population": 52536,
      "rank": 698
    },
    {
      "name": "Watsonville",
      "state": "California",
      "stateName": "California",
      "population": 52477,
      "rank": 699
    },
    {
      "name": "Richland",
      "state": "Washington",
      "stateName": "Washington",
      "population": 52413,
      "rank": 700
    },
    {
      "name": "Delano",
      "state": "California",
      "stateName": "California",
      "population": 52403,
      "rank": 701
    },
    {
      "name": "Hoffman Estates",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 52398,
      "rank": 702
    },
    {
      "name": "Florissant",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 52363,
      "rank": 703
    },
    {
      "name": "Placentia",
      "state": "California",
      "stateName": "California",
      "population": 52206,
      "rank": 704
    },
    {
      "name": "West New York",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 52122,
      "rank": 705
    },
    {
      "name": "Dublin",
      "state": "California",
      "stateName": "California",
      "population": 52105,
      "rank": 706
    },
    {
      "name": "Oak Park",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 52066,
      "rank": 707
    },
    {
      "name": "Peabody",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 52044,
      "rank": 708
    },
    {
      "name": "Perth Amboy",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 51982,
      "rank": 709
    },
    {
      "name": "Battle Creek",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 51848,
      "rank": 710
    },
    {
      "name": "Bradenton",
      "state": "Florida",
      "stateName": "Florida",
      "population": 51763,
      "rank": 711
    },
    {
      "name": "Gilroy",
      "state": "California",
      "stateName": "California",
      "population": 51701,
      "rank": 712
    },
    {
      "name": "Milford",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 51644,
      "rank": 713
    },
    {
      "name": "Albany",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 51583,
      "rank": 714
    },
    {
      "name": "Ankeny",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 51567,
      "rank": 715
    },
    {
      "name": "La Crosse",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 51522,
      "rank": 716
    },
    {
      "name": "Burlington",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 51510,
      "rank": 717
    },
    {
      "name": "DeSoto",
      "state": "Texas",
      "stateName": "Texas",
      "population": 51483,
      "rank": 718
    },
    {
      "name": "Harrisonburg",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 51395,
      "rank": 719
    },
    {
      "name": "Minnetonka",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 51368,
      "rank": 720
    },
    {
      "name": "Elkhart",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 51265,
      "rank": 721
    },
    {
      "name": "Lakewood",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 51143,
      "rank": 722
    },
    {
      "name": "Glendora",
      "state": "California",
      "stateName": "California",
      "population": 51074,
      "rank": 723
    },
    {
      "name": "Southaven",
      "state": "Mississippi",
      "stateName": "Mississippi",
      "population": 50997,
      "rank": 724
    },
    {
      "name": "Charleston",
      "state": "West Virginia",
      "stateName": "West Virginia",
      "population": 50821,
      "rank": 725
    },
    {
      "name": "Joplin",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 50789,
      "rank": 726
    },
    {
      "name": "Enid",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 50725,
      "rank": 727
    },
    {
      "name": "Palm Beach Gardens",
      "state": "Florida",
      "stateName": "Florida",
      "population": 50699,
      "rank": 728
    },
    {
      "name": "Brookhaven",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 50603,
      "rank": 729
    },
    {
      "name": "Plainfield",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 50588,
      "rank": 730
    },
    {
      "name": "Grand Island",
      "state": "Nebraska",
      "stateName": "Nebraska",
      "population": 50550,
      "rank": 731
    },
    {
      "name": "Palm Desert",
      "state": "California",
      "stateName": "California",
      "population": 50508,
      "rank": 732
    },
    {
      "name": "Huntersville",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 50458,
      "rank": 733
    },
    {
      "name": "Tigard",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 50444,
      "rank": 734
    },
    {
      "name": "Lenexa",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 50344,
      "rank": 735
    },
    {
      "name": "Saginaw",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 50303,
      "rank": 736
    },
    {
      "name": "Kentwood",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 50233,
      "rank": 737
    },
    {
      "name": "Doral",
      "state": "Florida",
      "stateName": "Florida",
      "population": 50213,
      "rank": 738
    },
    {
      "name": "Apple Valley",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 50201,
      "rank": 739
    },
    {
      "name": "Grapevine",
      "state": "Texas",
      "stateName": "Texas",
      "population": 50195,
      "rank": 740
    },
    {
      "name": "Aliso Viejo",
      "state": "California",
      "stateName": "California",
      "population": 50175,
      "rank": 741
    },
    {
      "name": "Sammamish",
      "state": "Washington",
      "stateName": "Washington",
      "population": 50169,
      "rank": 742
    },
    {
      "name": "Casa Grande",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 50111,
      "rank": 743
    },
    {
      "name": "Pinellas Park",
      "state": "Florida",
      "stateName": "Florida",
      "population": 49998,
      "rank": 744
    },
    {
      "name": "Troy",
      "state": "New York",
      "stateName": "New York",
      "population": 49974,
      "rank": 745
    },
    {
      "name": "West Sacramento",
      "state": "California",
      "stateName": "California",
      "population": 49891,
      "rank": 746
    },
    {
      "name": "Burien",
      "state": "Washington",
      "stateName": "Washington",
      "population": 49858,
      "rank": 747
    },
    {
      "name": "Commerce City",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 49799,
      "rank": 748
    },
    {
      "name": "Monroe",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 49761,
      "rank": 749
    },
    {
      "name": "Cerritos",
      "state": "California",
      "stateName": "California",
      "population": 49707,
      "rank": 750
    },
    {
      "name": "Downers Grove",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 49670,
      "rank": 751
    },
    {
      "name": "Coral Gables",
      "state": "Florida",
      "stateName": "Florida",
      "population": 49631,
      "rank": 752
    },
    {
      "name": "Wilson",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 49628,
      "rank": 753
    },
    {
      "name": "Niagara Falls",
      "state": "New York",
      "stateName": "New York",
      "population": 49468,
      "rank": 754
    },
    {
      "name": "Poway",
      "state": "California",
      "stateName": "California",
      "population": 49417,
      "rank": 755
    },
    {
      "name": "Edina",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 49376,
      "rank": 756
    },
    {
      "name": "Cuyahoga Falls",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 49267,
      "rank": 757
    },
    {
      "name": "Rancho Santa Margarita",
      "state": "California",
      "stateName": "California",
      "population": 49228,
      "rank": 758
    },
    {
      "name": "Harrisburg",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 49188,
      "rank": 759
    },
    {
      "name": "Huntington",
      "state": "West Virginia",
      "stateName": "West Virginia",
      "population": 49177,
      "rank": 760
    },
    {
      "name": "La Mirada",
      "state": "California",
      "stateName": "California",
      "population": 49133,
      "rank": 761
    },
    {
      "name": "Cypress",
      "state": "California",
      "stateName": "California",
      "population": 49087,
      "rank": 762
    },
    {
      "name": "Caldwell",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 48957,
      "rank": 763
    },
    {
      "name": "Logan",
      "state": "Utah",
      "stateName": "Utah",
      "population": 48913,
      "rank": 764
    },
    {
      "name": "Galveston",
      "state": "Texas",
      "stateName": "Texas",
      "population": 48733,
      "rank": 765
    },
    {
      "name": "Sheboygan",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 48725,
      "rank": 766
    },
    {
      "name": "Middletown",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 48630,
      "rank": 767
    },
    {
      "name": "Murray",
      "state": "Utah",
      "stateName": "Utah",
      "population": 48612,
      "rank": 768
    },
    {
      "name": "Roswell",
      "state": "New Mexico",
      "stateName": "New Mexico",
      "population": 48611,
      "rank": 769
    },
    {
      "name": "Parker",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 48608,
      "rank": 770
    },
    {
      "name": "Bedford",
      "state": "Texas",
      "stateName": "Texas",
      "population": 48592,
      "rank": 771
    },
    {
      "name": "East Lansing",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 48554,
      "rank": 772
    },
    {
      "name": "Methuen",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 48514,
      "rank": 773
    },
    {
      "name": "Covina",
      "state": "California",
      "stateName": "California",
      "population": 48508,
      "rank": 774
    },
    {
      "name": "Alexandria",
      "state": "Louisiana",
      "stateName": "Louisiana",
      "population": 48426,
      "rank": 775
    },
    {
      "name": "Olympia",
      "state": "Washington",
      "stateName": "Washington",
      "population": 48338,
      "rank": 776
    },
    {
      "name": "Euclid",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 48139,
      "rank": 777
    },
    {
      "name": "Mishawaka",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 47989,
      "rank": 778
    },
    {
      "name": "Salina",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 47846,
      "rank": 779
    },
    {
      "name": "Azusa",
      "state": "California",
      "stateName": "California",
      "population": 47842,
      "rank": 780
    },
    {
      "name": "Newark",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 47777,
      "rank": 781
    },
    {
      "name": "Chesterfield",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 47749,
      "rank": 782
    },
    {
      "name": "Leesburg",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 47673,
      "rank": 783
    },
    {
      "name": "Dunwoody",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 47591,
      "rank": 784
    },
    {
      "name": "Hattiesburg",
      "state": "Mississippi",
      "stateName": "Mississippi",
      "population": 47556,
      "rank": 785
    },
    {
      "name": "Roseville",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 47555,
      "rank": 786
    },
    {
      "name": "Bonita Springs",
      "state": "Florida",
      "stateName": "Florida",
      "population": 47547,
      "rank": 787
    },
    {
      "name": "Portage",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 47523,
      "rank": 788
    },
    {
      "name": "St. Louis Park",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 47411,
      "rank": 789
    },
    {
      "name": "Collierville",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 47333,
      "rank": 790
    },
    {
      "name": "Middletown",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 47333,
      "rank": 791
    },
    {
      "name": "Stillwater",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 47186,
      "rank": 792
    },
    {
      "name": "East Providence",
      "state": "Rhode Island",
      "stateName": "Rhode Island",
      "population": 47149,
      "rank": 793
    },
    {
      "name": "Lawrence",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 47135,
      "rank": 794
    },
    {
      "name": "Wauwatosa",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 47134,
      "rank": 795
    },
    {
      "name": "Mentor",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 46979,
      "rank": 796
    },
    {
      "name": "Ceres",
      "state": "California",
      "stateName": "California",
      "population": 46714,
      "rank": 797
    },
    {
      "name": "Cedar Hill",
      "state": "Texas",
      "stateName": "Texas",
      "population": 46663,
      "rank": 798
    },
    {
      "name": "Mansfield",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 46454,
      "rank": 799
    },
    {
      "name": "Binghamton",
      "state": "New York",
      "stateName": "New York",
      "population": 46444,
      "rank": 800
    },
    {
      "name": "Coeur d'Alene",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 46402,
      "rank": 801
    },
    {
      "name": "San Luis Obispo",
      "state": "California",
      "stateName": "California",
      "population": 46377,
      "rank": 802
    },
    {
      "name": "Minot",
      "state": "North Dakota",
      "stateName": "North Dakota",
      "population": 46321,
      "rank": 803
    },
    {
      "name": "Palm Springs",
      "state": "California",
      "stateName": "California",
      "population": 46281,
      "rank": 804
    },
    {
      "name": "Pine Bluff",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 46094,
      "rank": 805
    },
    {
      "name": "Texas City",
      "state": "Texas",
      "stateName": "Texas",
      "population": 46081,
      "rank": 806
    },
    {
      "name": "Summerville",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 46074,
      "rank": 807
    },
    {
      "name": "Twin Falls",
      "state": "Idaho",
      "stateName": "Idaho",
      "population": 45981,
      "rank": 808
    },
    {
      "name": "Jeffersonville",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 45929,
      "rank": 809
    },
    {
      "name": "San Jacinto",
      "state": "California",
      "stateName": "California",
      "population": 45851,
      "rank": 810
    },
    {
      "name": "Madison",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 45799,
      "rank": 811
    },
    {
      "name": "Altoona",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 45796,
      "rank": 812
    },
    {
      "name": "Columbus",
      "state": "Indiana",
      "stateName": "Indiana",
      "population": 45775,
      "rank": 813
    },
    {
      "name": "Beavercreek",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 45712,
      "rank": 814
    },
    {
      "name": "Apopka",
      "state": "Florida",
      "stateName": "Florida",
      "population": 45587,
      "rank": 815
    },
    {
      "name": "Elmhurst",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 45556,
      "rank": 816
    },
    {
      "name": "Maricopa",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 45508,
      "rank": 817
    },
    {
      "name": "Farmington",
      "state": "New Mexico",
      "stateName": "New Mexico",
      "population": 45426,
      "rank": 818
    },
    {
      "name": "Glenview",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 45417,
      "rank": 819
    },
    {
      "name": "Cleveland Heights",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 45394,
      "rank": 820
    },
    {
      "name": "Draper",
      "state": "Utah",
      "stateName": "Utah",
      "population": 45285,
      "rank": 821
    },
    {
      "name": "Lincoln",
      "state": "California",
      "stateName": "California",
      "population": 45237,
      "rank": 822
    },
    {
      "name": "Sierra Vista",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 45129,
      "rank": 823
    },
    {
      "name": "Lacey",
      "state": "Washington",
      "stateName": "Washington",
      "population": 44919,
      "rank": 824
    },
    {
      "name": "Biloxi",
      "state": "Mississippi",
      "stateName": "Mississippi",
      "population": 44820,
      "rank": 825
    },
    {
      "name": "Strongsville",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 44730,
      "rank": 826
    },
    {
      "name": "Barnstable Town",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 44641,
      "rank": 827
    },
    {
      "name": "Wylie",
      "state": "Texas",
      "stateName": "Texas",
      "population": 44575,
      "rank": 828
    },
    {
      "name": "Sayreville",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 44412,
      "rank": 829
    },
    {
      "name": "Kannapolis",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 44359,
      "rank": 830
    },
    {
      "name": "Charlottesville",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 44349,
      "rank": 831
    },
    {
      "name": "Littleton",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 44275,
      "rank": 832
    },
    {
      "name": "Titusville",
      "state": "Florida",
      "stateName": "Florida",
      "population": 44206,
      "rank": 833
    },
    {
      "name": "Hackensack",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 44113,
      "rank": 834
    },
    {
      "name": "Newark",
      "state": "California",
      "stateName": "California",
      "population": 44096,
      "rank": 835
    },
    {
      "name": "Pittsfield",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 44057,
      "rank": 836
    },
    {
      "name": "York",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 43935,
      "rank": 837
    },
    {
      "name": "Lombard",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 43907,
      "rank": 838
    },
    {
      "name": "Attleboro",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 43886,
      "rank": 839
    },
    {
      "name": "DeKalb",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 43849,
      "rank": 840
    },
    {
      "name": "Blacksburg",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 43609,
      "rank": 841
    },
    {
      "name": "Dublin",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 43607,
      "rank": 842
    },
    {
      "name": "Haltom City",
      "state": "Texas",
      "stateName": "Texas",
      "population": 43580,
      "rank": 843
    },
    {
      "name": "Lompoc",
      "state": "California",
      "stateName": "California",
      "population": 43509,
      "rank": 844
    },
    {
      "name": "El Centro",
      "state": "California",
      "stateName": "California",
      "population": 43363,
      "rank": 845
    },
    {
      "name": "Danville",
      "state": "California",
      "stateName": "California",
      "population": 43341,
      "rank": 846
    },
    {
      "name": "Jefferson City",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 43330,
      "rank": 847
    },
    {
      "name": "Cutler Bay",
      "state": "Florida",
      "stateName": "Florida",
      "population": 43328,
      "rank": 848
    },
    {
      "name": "Oakland Park",
      "state": "Florida",
      "stateName": "Florida",
      "population": 43286,
      "rank": 849
    },
    {
      "name": "North Miami Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 43250,
      "rank": 850
    },
    {
      "name": "Freeport",
      "state": "New York",
      "stateName": "New York",
      "population": 43167,
      "rank": 851
    },
    {
      "name": "Moline",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 43116,
      "rank": 852
    },
    {
      "name": "Coachella",
      "state": "California",
      "stateName": "California",
      "population": 43092,
      "rank": 853
    },
    {
      "name": "Fort Pierce",
      "state": "Florida",
      "stateName": "Florida",
      "population": 43074,
      "rank": 854
    },
    {
      "name": "Smyrna",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 43060,
      "rank": 855
    },
    {
      "name": "Bountiful",
      "state": "Utah",
      "stateName": "Utah",
      "population": 43023,
      "rank": 856
    },
    {
      "name": "Fond du Lac",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 42970,
      "rank": 857
    },
    {
      "name": "Everett",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 42935,
      "rank": 858
    },
    {
      "name": "Danville",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 42907,
      "rank": 859
    },
    {
      "name": "Keller",
      "state": "Texas",
      "stateName": "Texas",
      "population": 42907,
      "rank": 860
    },
    {
      "name": "Belleville",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 42895,
      "rank": 861
    },
    {
      "name": "Bell Gardens",
      "state": "California",
      "stateName": "California",
      "population": 42889,
      "rank": 862
    },
    {
      "name": "Cleveland",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 42774,
      "rank": 863
    },
    {
      "name": "North Lauderdale",
      "state": "Florida",
      "stateName": "Florida",
      "population": 42757,
      "rank": 864
    },
    {
      "name": "Fairfield",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 42635,
      "rank": 865
    },
    {
      "name": "Salem",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 42544,
      "rank": 866
    },
    {
      "name": "Rancho Palos Verdes",
      "state": "California",
      "stateName": "California",
      "population": 42448,
      "rank": 867
    },
    {
      "name": "San Bruno",
      "state": "California",
      "stateName": "California",
      "population": 42443,
      "rank": 868
    },
    {
      "name": "Concord",
      "state": "New Hampshire",
      "stateName": "New Hampshire",
      "population": 42419,
      "rank": 869
    },
    {
      "name": "Burlington",
      "state": "Vermont",
      "stateName": "Vermont",
      "population": 42284,
      "rank": 870
    },
    {
      "name": "Apex",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 42214,
      "rank": 871
    },
    {
      "name": "Midland",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 42181,
      "rank": 872
    },
    {
      "name": "Altamonte Springs",
      "state": "Florida",
      "stateName": "Florida",
      "population": 42150,
      "rank": 873
    },
    {
      "name": "Hutchinson",
      "state": "Kansas",
      "stateName": "Kansas",
      "population": 41889,
      "rank": 874
    },
    {
      "name": "Buffalo Grove",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 41778,
      "rank": 875
    },
    {
      "name": "Urbandale",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 41776,
      "rank": 876
    },
    {
      "name": "State College",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 41757,
      "rank": 877
    },
    {
      "name": "Urbana",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 41752,
      "rank": 878
    },
    {
      "name": "Plainfield",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 41734,
      "rank": 879
    },
    {
      "name": "Manassas",
      "state": "Virginia",
      "stateName": "Virginia",
      "population": 41705,
      "rank": 880
    },
    {
      "name": "Bartlett",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 41679,
      "rank": 881
    },
    {
      "name": "Kearny",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 41664,
      "rank": 882
    },
    {
      "name": "Oro Valley",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 41627,
      "rank": 883
    },
    {
      "name": "Findlay",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 41512,
      "rank": 884
    },
    {
      "name": "Rohnert Park",
      "state": "California",
      "stateName": "California",
      "population": 41398,
      "rank": 885
    },
    {
      "name": "Westfield",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 41301,
      "rank": 887
    },
    {
      "name": "Linden",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 41301,
      "rank": 886
    },
    {
      "name": "Sumter",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 41190,
      "rank": 888
    },
    {
      "name": "Wilkes-Barre",
      "state": "Pennsylvania",
      "stateName": "Pennsylvania",
      "population": 41108,
      "rank": 889
    },
    {
      "name": "Woonsocket",
      "state": "Rhode Island",
      "stateName": "Rhode Island",
      "population": 41026,
      "rank": 890
    },
    {
      "name": "Leominster",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 41002,
      "rank": 891
    },
    {
      "name": "Shelton",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 40999,
      "rank": 892
    },
    {
      "name": "Brea",
      "state": "California",
      "stateName": "California",
      "population": 40963,
      "rank": 893
    },
    {
      "name": "Covington",
      "state": "Kentucky",
      "stateName": "Kentucky",
      "population": 40956,
      "rank": 894
    },
    {
      "name": "Rockwall",
      "state": "Texas",
      "stateName": "Texas",
      "population": 40922,
      "rank": 895
    },
    {
      "name": "Meridian",
      "state": "Mississippi",
      "stateName": "Mississippi",
      "population": 40921,
      "rank": 896
    },
    {
      "name": "Riverton",
      "state": "Utah",
      "stateName": "Utah",
      "population": 40921,
      "rank": 897
    },
    {
      "name": "St. Cloud",
      "state": "Florida",
      "stateName": "Florida",
      "population": 40918,
      "rank": 898
    },
    {
      "name": "Quincy",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 40915,
      "rank": 899
    },
    {
      "name": "Morgan Hill",
      "state": "California",
      "stateName": "California",
      "population": 40836,
      "rank": 900
    },
    {
      "name": "Warren",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 40768,
      "rank": 901
    },
    {
      "name": "Edmonds",
      "state": "Washington",
      "stateName": "Washington",
      "population": 40727,
      "rank": 902
    },
    {
      "name": "Burleson",
      "state": "Texas",
      "stateName": "Texas",
      "population": 40714,
      "rank": 903
    },
    {
      "name": "Beverly",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 40664,
      "rank": 904
    },
    {
      "name": "Mankato",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 40641,
      "rank": 905
    },
    {
      "name": "Hagerstown",
      "state": "Maryland",
      "stateName": "Maryland",
      "population": 40612,
      "rank": 906
    },
    {
      "name": "Prescott",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 40590,
      "rank": 907
    },
    {
      "name": "Campbell",
      "state": "California",
      "stateName": "California",
      "population": 40584,
      "rank": 908
    },
    {
      "name": "Cedar Falls",
      "state": "Iowa",
      "stateName": "Iowa",
      "population": 40566,
      "rank": 909
    },
    {
      "name": "Beaumont",
      "state": "California",
      "stateName": "California",
      "population": 40481,
      "rank": 910
    },
    {
      "name": "La Puente",
      "state": "California",
      "stateName": "California",
      "population": 40435,
      "rank": 911
    },
    {
      "name": "Crystal Lake",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 40388,
      "rank": 912
    },
    {
      "name": "Fitchburg",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 40383,
      "rank": 913
    },
    {
      "name": "Carol Stream",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 40379,
      "rank": 914
    },
    {
      "name": "Hickory",
      "state": "North Carolina",
      "stateName": "North Carolina",
      "population": 40361,
      "rank": 915
    },
    {
      "name": "Streamwood",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 40351,
      "rank": 916
    },
    {
      "name": "Norwich",
      "state": "Connecticut",
      "stateName": "Connecticut",
      "population": 40347,
      "rank": 917
    },
    {
      "name": "Coppell",
      "state": "Texas",
      "stateName": "Texas",
      "population": 40342,
      "rank": 918
    },
    {
      "name": "San Gabriel",
      "state": "California",
      "stateName": "California",
      "population": 40275,
      "rank": 919
    },
    {
      "name": "Holyoke",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 40249,
      "rank": 920
    },
    {
      "name": "Bentonville",
      "state": "Arkansas",
      "stateName": "Arkansas",
      "population": 40167,
      "rank": 921
    },
    {
      "name": "Florence",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 40059,
      "rank": 922
    },
    {
      "name": "Peachtree Corners",
      "state": "Georgia",
      "stateName": "Georgia",
      "population": 40059,
      "rank": 923
    },
    {
      "name": "Brentwood",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 40021,
      "rank": 924
    },
    {
      "name": "Bozeman",
      "state": "Montana",
      "stateName": "Montana",
      "population": 39860,
      "rank": 925
    },
    {
      "name": "New Berlin",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 39834,
      "rank": 926
    },
    {
      "name": "Goose Creek",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 39823,
      "rank": 927
    },
    {
      "name": "Huntsville",
      "state": "Texas",
      "stateName": "Texas",
      "population": 39795,
      "rank": 928
    },
    {
      "name": "Prescott Valley",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 39791,
      "rank": 929
    },
    {
      "name": "Maplewood",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 39765,
      "rank": 930
    },
    {
      "name": "Romeoville",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 39650,
      "rank": 931
    },
    {
      "name": "Duncanville",
      "state": "Texas",
      "stateName": "Texas",
      "population": 39605,
      "rank": 932
    },
    {
      "name": "Atlantic City",
      "state": "New Jersey",
      "stateName": "New Jersey",
      "population": 39551,
      "rank": 933
    },
    {
      "name": "Clovis",
      "state": "New Mexico",
      "stateName": "New Mexico",
      "population": 39508,
      "rank": 934
    },
    {
      "name": "The Colony",
      "state": "Texas",
      "stateName": "Texas",
      "population": 39458,
      "rank": 935
    },
    {
      "name": "Culver City",
      "state": "California",
      "stateName": "California",
      "population": 39428,
      "rank": 936
    },
    {
      "name": "Marlborough",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 39414,
      "rank": 937
    },
    {
      "name": "Hilton Head Island",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 39412,
      "rank": 938
    },
    {
      "name": "Moorhead",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 39398,
      "rank": 939
    },
    {
      "name": "Calexico",
      "state": "California",
      "stateName": "California",
      "population": 39389,
      "rank": 940
    },
    {
      "name": "Bullhead City",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 39383,
      "rank": 941
    },
    {
      "name": "Germantown",
      "state": "Tennessee",
      "stateName": "Tennessee",
      "population": 39375,
      "rank": 942
    },
    {
      "name": "La Quinta",
      "state": "California",
      "stateName": "California",
      "population": 39331,
      "rank": 943
    },
    {
      "name": "Lancaster",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 39325,
      "rank": 944
    },
    {
      "name": "Wausau",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 39309,
      "rank": 945
    },
    {
      "name": "Sherman",
      "state": "Texas",
      "stateName": "Texas",
      "population": 39296,
      "rank": 946
    },
    {
      "name": "Ocoee",
      "state": "Florida",
      "stateName": "Florida",
      "population": 39172,
      "rank": 947
    },
    {
      "name": "Shakopee",
      "state": "Minnesota",
      "stateName": "Minnesota",
      "population": 39167,
      "rank": 948
    },
    {
      "name": "Woburn",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 39083,
      "rank": 949
    },
    {
      "name": "Bremerton",
      "state": "Washington",
      "stateName": "Washington",
      "population": 39056,
      "rank": 950
    },
    {
      "name": "Rock Island",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 38877,
      "rank": 951
    },
    {
      "name": "Muskogee",
      "state": "Oklahoma",
      "stateName": "Oklahoma",
      "population": 38863,
      "rank": 952
    },
    {
      "name": "Cape Girardeau",
      "state": "Missouri",
      "stateName": "Missouri",
      "population": 38816,
      "rank": 953
    },
    {
      "name": "Annapolis",
      "state": "Maryland",
      "stateName": "Maryland",
      "population": 38722,
      "rank": 954
    },
    {
      "name": "Greenacres",
      "state": "Florida",
      "stateName": "Florida",
      "population": 38696,
      "rank": 955
    },
    {
      "name": "Ormond Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 38661,
      "rank": 956
    },
    {
      "name": "Hallandale Beach",
      "state": "Florida",
      "stateName": "Florida",
      "population": 38632,
      "rank": 957
    },
    {
      "name": "Stanton",
      "state": "California",
      "stateName": "California",
      "population": 38623,
      "rank": 958
    },
    {
      "name": "Puyallup",
      "state": "Washington",
      "stateName": "Washington",
      "population": 38609,
      "rank": 959
    },
    {
      "name": "Pacifica",
      "state": "California",
      "stateName": "California",
      "population": 38606,
      "rank": 960
    },
    {
      "name": "Hanover Park",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 38510,
      "rank": 961
    },
    {
      "name": "Hurst",
      "state": "Texas",
      "stateName": "Texas",
      "population": 38448,
      "rank": 962
    },
    {
      "name": "Lima",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 38355,
      "rank": 963
    },
    {
      "name": "Marana",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 38290,
      "rank": 964
    },
    {
      "name": "Carpentersville",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 38241,
      "rank": 965
    },
    {
      "name": "Oakley",
      "state": "California",
      "stateName": "California",
      "population": 38194,
      "rank": 966
    },
    {
      "name": "Huber Heights",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 38142,
      "rank": 967
    },
    {
      "name": "Lancaster",
      "state": "Texas",
      "stateName": "Texas",
      "population": 38071,
      "rank": 968
    },
    {
      "name": "Montclair",
      "state": "California",
      "stateName": "California",
      "population": 38027,
      "rank": 969
    },
    {
      "name": "Wheeling",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 38015,
      "rank": 970
    },
    {
      "name": "Brookfield",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 37999,
      "rank": 971
    },
    {
      "name": "Park Ridge",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 37839,
      "rank": 972
    },
    {
      "name": "Florence",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 37792,
      "rank": 973
    },
    {
      "name": "Roy",
      "state": "Utah",
      "stateName": "Utah",
      "population": 37733,
      "rank": 974
    },
    {
      "name": "Winter Garden",
      "state": "Florida",
      "stateName": "Florida",
      "population": 37711,
      "rank": 975
    },
    {
      "name": "Chelsea",
      "state": "Massachusetts",
      "stateName": "Massachusetts",
      "population": 37670,
      "rank": 976
    },
    {
      "name": "Valley Stream",
      "state": "New York",
      "stateName": "New York",
      "population": 37659,
      "rank": 977
    },
    {
      "name": "Spartanburg",
      "state": "South Carolina",
      "stateName": "South Carolina",
      "population": 37647,
      "rank": 978
    },
    {
      "name": "Lake Oswego",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 37610,
      "rank": 979
    },
    {
      "name": "Friendswood",
      "state": "Texas",
      "stateName": "Texas",
      "population": 37587,
      "rank": 980
    },
    {
      "name": "Westerville",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 37530,
      "rank": 981
    },
    {
      "name": "Northglenn",
      "state": "Colorado",
      "stateName": "Colorado",
      "population": 37499,
      "rank": 982
    },
    {
      "name": "Phenix City",
      "state": "Alabama",
      "stateName": "Alabama",
      "population": 37498,
      "rank": 983
    },
    {
      "name": "Grove City",
      "state": "Ohio",
      "stateName": "Ohio",
      "population": 37490,
      "rank": 984
    },
    {
      "name": "Texarkana",
      "state": "Texas",
      "stateName": "Texas",
      "population": 37442,
      "rank": 985
    },
    {
      "name": "Addison",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 37385,
      "rank": 986
    },
    {
      "name": "Dover",
      "state": "Delaware",
      "stateName": "Delaware",
      "population": 37366,
      "rank": 987
    },
    {
      "name": "Lincoln Park",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 37313,
      "rank": 988
    },
    {
      "name": "Calumet City",
      "state": "Illinois",
      "stateName": "Illinois",
      "population": 37240,
      "rank": 989
    },
    {
      "name": "Muskegon",
      "state": "Michigan",
      "stateName": "Michigan",
      "population": 37213,
      "rank": 990
    },
    {
      "name": "Aventura",
      "state": "Florida",
      "stateName": "Florida",
      "population": 37199,
      "rank": 991
    },
    {
      "name": "Martinez",
      "state": "California",
      "stateName": "California",
      "population": 37165,
      "rank": 992
    },
    {
      "name": "Greenfield",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 37159,
      "rank": 993
    },
    {
      "name": "Apache Junction",
      "state": "Arizona",
      "stateName": "Arizona",
      "population": 37130,
      "rank": 994
    },
    {
      "name": "Monrovia",
      "state": "California",
      "stateName": "California",
      "population": 37101,
      "rank": 995
    },
    {
      "name": "Weslaco",
      "state": "Texas",
      "stateName": "Texas",
      "population": 37093,
      "rank": 996
    },
    {
      "name": "Keizer",
      "state": "Oregon",
      "stateName": "Oregon",
      "population": 37064,
      "rank": 997
    },
    {
      "name": "Spanish Fork",
      "state": "Utah",
      "stateName": "Utah",
      "population": 36956,
      "rank": 998
    },
    {
      "name": "Beloit",
      "state": "Wisconsin",
      "stateName": "Wisconsin",
      "population": 36888,
      "rank": 999
    },
    {
      "name": "Panama City",
      "state": "Florida",
      "stateName": "Florida",
      "population": 36877,
      "rank": 1000
    }
];

export function formatPopulation(population: number): string {
  if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  }
  if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  return population.toString();
}

export function getStateByAbbreviation(abbreviation: string): USState | undefined {
  return US_STATES.find(state => state.abbreviation === abbreviation);
}

export function getStateByName(name: string): USState | undefined {
  return US_STATES.find(state => state.name === name);
}

export function getCitiesByState(stateAbbr: string): USCity[] {
  return TOP_US_CITIES.filter(city => city.state === stateAbbr);
}

export function getCitiesByPopulation(minPopulation: number): USCity[] {
  return TOP_US_CITIES.filter(city => city.population >= minPopulation);
}

export function formatCityState(city: USCity, format: 'full' | 'abbreviated' = 'abbreviated'): string {
  if (format === 'full') {
    return `${city.name}, ${city.stateName}`;
  }
  return `${city.name}, ${city.state}`;
}