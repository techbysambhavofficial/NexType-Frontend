// Remington Gail Hindi Typewriter Layout Mapping
export const remingtonGailMapping = {
  // Lowercase (Normal keys)
  '`': '।', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५',
  '6': '६', '7': '७', '8': '८', '9': '९', '0': '०', '-': '-', '=': '=',
  'q': 'अ', 'w': 'आ', 'e': 'इ', 'r': 'ई', 't': 'उ', 'y': 'ऊ', 
  'u': 'ए', 'i': 'ऐ', 'o': 'ओ', 'p': 'औ', '[': 'र', ']': ']', '\\': '\\',
  'a': 'क', 's': 'ख', 'd': 'ग', 'f': 'घ', 'g': 'ङ', 'h': 'च', 
  'j': 'छ', 'k': 'ज', 'l': 'झ', ';': 'ञ', "'": 'ड',
  'z': 'ट', 'x': 'ठ', 'c': 'ड', 'v': 'ढ', 'b': 'ण', 'n': 'त', 
  'm': 'थ', ',': 'द', '.': 'ध', '/': 'न',
  
  // Shift + keys
  'shift+`': '॥', 'shift+1': '!', 'shift+2': '@', 'shift+3': '#', 
  'shift+4': '$', 'shift+5': '%', 'shift+6': '^', 'shift+7': '&', 
  'shift+8': '*', 'shift+9': '(', 'shift+0': ')', 'shift+-': '_', 
  'shift+=': '+',
  'shift+q': '्', 'shift+w': 'ा', 'shift+e': 'ि', 'shift+r': 'ी', 
  'shift+t': 'ु', 'shift+y': 'ू', 'shift+u': 'ृ', 'shift+i': 'े', 
  'shift+o': 'ै', 'shift+p': 'ो', 'shift+[': 'ौ', 'shift+]': ']', 
  'shift+\\': '|',
  'shift+a': 'ा', 'shift+s': 'ि', 'shift+d': 'ी', 'shift+f': 'ु', 
  'shift+g': 'ू', 'shift+h': 'ृ', 'shift+j': 'े', 'shift+k': 'ै', 
  'shift+l': 'ो', 'shift+;': 'ौ', 'shift+\'': 'ो',
  'shift+z': 'ाँ', 'shift+x': 'ां', 'shift+c': 'ाद', 'shift+v': 'ल', 
  'shift+b': 'ळ', 'shift+n': 'व', 'shift+m': 'श', 'shift+,': 'ष', 
  'shift+.': 'स', 'shift+/': 'ह',
  
  // Special combinations
  'q!': 'अ', 'Q': 'अा', 'W': 'आा', 'E': 'इि', 'R': 'ईी', 'T': 'उु', 
  'Y': 'ऊू', 'U': 'एे', 'I': 'ऐै', 'O': 'ओो', 'P': 'औौ',
  'A!': 'क', 'S!': 'ख', 'D!': 'ग', 'F!': 'घ', 'G!': 'ङ', 'H!': 'च',
  'J!': 'छ', 'K!': 'ज', 'L!': 'झ', ':': 'ञ', '"': 'ड',
  'Z!': 'ट', 'X!': 'ठ', 'C!': 'ड', 'V!': 'ढ', 'B!': 'ण', 'N!': 'त',
  'M!': 'थ', '<': 'द', '>': 'ध', '?': 'न'
};

// Halant (Virama) and Matra processing
export const processMaatra = (char, nextChar) => {
  // Half character (Halant)
  if (nextChar === '्') {
    return char + '्';
  }
  return char;
};