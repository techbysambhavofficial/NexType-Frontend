// Complete Original Kruti Dev Hindi Typing Mapping
// As per the correct mapping table provided

export const kurtiDevMapping = {
  // ==================== Number Row ====================
  '1': '१', 'shift+1': '!',
  '2': '२', 'shift+2': '@',
  '3': '३', 'shift+3': '#',
  '4': '४', 'shift+4': '$',
  '5': '५', 'shift+5': '%',
  '6': '६', 'shift+6': '^',
  '7': '७', 'shift+7': '&',
  '8': '८', 'shift+8': '*',
  '9': '९', 'shift+9': '(',
  '0': '०', 'shift+0': ')',
  '-': '-', 'shift+-': '_',
  '=': '=', 'shift+=': '+',

  // ==================== Top Row ====================
  'q': 'ु', 'shift+q': 'फ',
  'w': 'ू', 'shift+w': 'ँ',
  'e': 'म', 'shift+e': 'ं',
  'r': 'त', 'shift+r': 'थ',
  't': 'ज', 'shift+t': 'ज्ञ',
  'y': 'ल', 'shift+y': 'ळ',
  'u': 'न', 'shift+u': 'ऩ',
  'i': 'प', 'shift+i': 'फ',
  'o': 'व', 'shift+o': 'ॉ',
  'p': 'च', 'shift+p': 'छ',
  '[': 'ड', 'shift+[': 'ड़',
  ']': 'ढ', 'shift+]': 'ढ़',
  '\\': 'ॉ', 'shift+\\': 'ऋ',

  // ==================== Home Row ====================
  'a': 'ो', 'shift+a': 'ओ',
  's': 'े', 'shift+s': 'ए',
  'd': 'क', 'shift+d': 'क्',
  'f': 'ि', 'shift+f': 'ी',
  'g': 'ह', 'shift+g': 'ह्',
  'h': 'ी', 'shift+h': 'भ',
  'j': 'र', 'shift+j': 'श्र',
  'k': 'ा', 'shift+k': 'ज्ञ',
  'l': 'स', 'shift+l': 'ष',
  ';': 'य', 'shift+;': 'य',
  "'": 'श', 'shift+"': 'ष',

  // ==================== Bottom Row ====================
  'z': '्', 'shift+z': 'त्र',
  'x': 'ग', 'shift+x': 'ग्',
  'c': 'ब', 'shift+c': 'ब्',
  'v': 'अ', 'shift+v': 'ट',
  'b': 'इ', 'shift+b': 'ठ',
  'n': 'द', 'shift+n': 'छ',
  'm': 'उ', 'shift+m': 'ड',
  ',': 'ए', 'shift+,': 'ढ',
  '.': 'ण', 'shift+.': 'झ',
  '/': 'ध', 'shift+/': 'ध्',

  // ==================== Special Characters ====================
  ' ': ' ',
  '\n': '\n'
};

// Alt Codes Mapping for additional characters
export const altCodesMapping = {
  'alt+143': 'ऊ',
  'alt+171': ')',
  'alt+172': '(',
  'alt+173': '॰',
  'alt+132': 'फ',
  'alt+0170': '^',
  'alt+0182': 'ष',
  'alt+0190': '=',
  'alt+0222': '"',
  'alt+0205': 'छ',
  'alt+0206': 'ठ',
  'alt+0231': 'ऋ',
  'alt+0165': 'ग',
  'alt+0207': 'ड़',
  'alt+0209': 'ह',
  'alt+0151': 'ह',
  'alt+0211': 'ज',
  'alt+0130': 'ऐ',
  'alt+0223': '"',
  'alt+0214': 'इ',
  'alt+0216': 'क्र',
  'alt+0217': 'र',
  'alt+0221': 'फ',
  'alt+0184': 'र',
  'alt+0225': 'ह्य',
  'alt+0226': 'हृ',
  'alt+0131': 'ं',
  'alt+0163': 'ख',
  'alt+0228': 'क',
  'alt+0186': 'र',
  'alt+0240': 'ठ',
  'alt+0244': 'ङ',
  'alt+0204': 'द्व',
  'alt+0212': 'झ',
  'alt+0227': 'ह',
  'alt+0150': 'द',
  'alt+0179': 'ऊ'
};

// Convert English text to Kurti Dev Hindi (Direct mapping)
export const convertToKurtiDev = (englishText) => {
  let hindiText = '';
  let i = 0;
  let isShift = false;
  
  while (i < englishText.length) {
    let currentChar = englishText[i];
    
    // Handle space
    if (currentChar === ' ') {
      hindiText += ' ';
      i++;
      continue;
    }
    
    // Handle new line
    if (currentChar === '\n') {
      hindiText += '\n';
      i++;
      continue;
    }
    
    // Check if shift is pressed (capital letter)
    isShift = (currentChar >= 'A' && currentChar <= 'Z');
    let lookupChar = currentChar.toLowerCase();
    let lookupKey = isShift ? `shift+${lookupChar}` : lookupChar;
    
    // Handle special bracket keys
    if (currentChar === '[' || currentChar === '{') {
      lookupKey = isShift ? 'shift+[' : '[';
    }
    if (currentChar === ']' || currentChar === '}') {
      lookupKey = isShift ? 'shift+]' : ']';
    }
    if (currentChar === '\\' || currentChar === '|') {
      lookupKey = isShift ? 'shift+\\' : '\\';
    }
    if (currentChar === ';' || currentChar === ':') {
      lookupKey = isShift ? 'shift+;' : ';';
    }
    if (currentChar === "'" || currentChar === '"') {
      lookupKey = isShift ? 'shift+"' : "'";
    }
    if (currentChar === ',' || currentChar === '<') {
      lookupKey = isShift ? 'shift+,' : ',';
    }
    if (currentChar === '.' || currentChar === '>') {
      lookupKey = isShift ? 'shift+.' : '.';
    }
    if (currentChar === '/' || currentChar === '?') {
      lookupKey = isShift ? 'shift+/' : '/';
    }
    
    // Single character mapping
    if (kurtiDevMapping[lookupKey]) {
      hindiText += kurtiDevMapping[lookupKey];
    } else {
      hindiText += currentChar;
    }
    i++;
  }
  
  return hindiText;
};

// Convert English text to Kurti Dev Hindi with Matra combination
/*export const convertToKurtiDev = (englishText) => {
  let hindiText = '';
  let i = 0;
  
  while (i < englishText.length) {
    let currentKey = englishText[i];
    let nextKey = englishText[i + 1] || '';
    let isShift = (currentKey >= 'A' && currentKey <= 'Z');
    let lookupChar = currentKey.toLowerCase();
    let lookupKey = isShift ? `shift+${lookupChar}` : lookupChar;
    
    let currentChar = kurtiDevMapping[lookupKey] || currentKey;
    
    // Check if next key is a matra (vowel sign)
    let isMatra = false;
    let matraChar = '';
    
    if (nextKey) {
      let nextIsShift = (nextKey >= 'A' && nextKey <= 'Z');
      let nextLookupChar = nextKey.toLowerCase();
      let nextLookupKey = nextIsShift ? `shift+${nextLookupChar}` : nextLookupChar;
      let nextChar = kurtiDevMapping[nextLookupKey] || nextKey;
      
      // List of matras (vowel signs)
      const matras = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'];
      if (matras.includes(nextChar)) {
        isMatra = true;
        matraChar = nextChar;
      }
    }
    
    // If current char is a consonant and next is matra, combine them
    if (isMatra && currentChar !== ' ' && currentChar !== '\n') {
      // Combine consonant with matra
      const combined = currentChar + matraChar;
      hindiText += combined;
      i += 2; // Skip both keys
    } else {
      hindiText += currentChar;
      i++;
    }
  }
  
  return hindiText;
};*/

// Get mapping guide for UI display
export const getKeyboardGuide = () => {
  return {
    topRow: [
      { key: 'q', normal: 'ु', shift: 'फ' },
      { key: 'w', normal: 'ू', shift: 'ँ' },
      { key: 'e', normal: 'म', shift: 'ं' },
      { key: 'r', normal: 'त', shift: 'थ' },
      { key: 't', normal: 'ज', shift: 'ज्ञ' },
      { key: 'y', normal: 'ल', shift: 'ळ' },
      { key: 'u', normal: 'न', shift: 'ऩ' },
      { key: 'i', normal: 'प', shift: 'फ' },
      { key: 'o', normal: 'व', shift: 'ॉ' },
      { key: 'p', normal: 'च', shift: 'छ' }
    ],
    homeRow: [
      { key: 'a', normal: 'ो', shift: 'ओ' },
      { key: 's', normal: 'े', shift: 'ए' },
      { key: 'd', normal: 'क', shift: 'क्' },
      { key: 'f', normal: 'ि', shift: 'ी' },
      { key: 'g', normal: 'ह', shift: 'ह्' },
      { key: 'h', normal: 'ी', shift: 'भ' },
      { key: 'j', normal: 'र', shift: 'श्र' },
      { key: 'k', normal: 'ा', shift: 'ज्ञ' },
      { key: 'l', normal: 'स', shift: 'ष' },
      { key: ';', normal: 'य', shift: 'य' },
      { key: "'", normal: 'श', shift: 'ष' }
    ],
    bottomRow: [
      { key: 'z', normal: '्', shift: 'त्र' },
      { key: 'x', normal: 'ग', shift: 'ग्' },
      { key: 'c', normal: 'ब', shift: 'ब्' },
      { key: 'v', normal: 'अ', shift: 'ट' },
      { key: 'b', normal: 'इ', shift: 'ठ' },
      { key: 'n', normal: 'द', shift: 'छ' },
      { key: 'm', normal: 'उ', shift: 'ड' },
      { key: ',', normal: 'ए', shift: 'ढ' },
      { key: '.', normal: 'ण', shift: 'झ' },
      { key: '/', normal: 'ध', shift: '।' }
    ]
  };
};