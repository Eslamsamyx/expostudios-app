const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../i18n/messages');
const enFile = path.join(messagesDir, 'en.json');
const languages = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'zh'];

// Read English (source) translations
const enTranslations = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Function to get all keys from nested object
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], newKey));
    } else {
      keys.push(newKey);
    }
  }
  return keys;
}

// Function to get value from nested object using dot notation
function getValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Function to set value in nested object using dot notation
function setValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

// Get all English keys
const allKeys = getAllKeys(enTranslations);
console.log(`Total keys in English: ${allKeys.length}`);

// Process each language
languages.forEach(lang => {
  const langFile = path.join(messagesDir, `${lang}.json`);

  let langTranslations = {};

  // Load existing translations if file exists
  if (fs.existsSync(langFile)) {
    langTranslations = JSON.parse(fs.readFileSync(langFile, 'utf8'));
    console.log(`\n${lang.toUpperCase()}: Loading existing translations`);
  } else {
    console.log(`\n${lang.toUpperCase()}: Creating new file`);
  }

  const existingKeys = getAllKeys(langTranslations);
  let missingCount = 0;
  let addedCount = 0;

  // Add missing keys with English values (to be translated later)
  allKeys.forEach(key => {
    const value = getValue(langTranslations, key);
    if (value === undefined) {
      const enValue = getValue(enTranslations, key);
      setValue(langTranslations, key, `[${lang.toUpperCase()}] ${enValue}`);
      missingCount++;
      addedCount++;
    }
  });

  console.log(`  Existing keys: ${existingKeys.length}`);
  console.log(`  Missing keys: ${missingCount}`);
  console.log(`  Added keys: ${addedCount}`);
  console.log(`  Total keys: ${getAllKeys(langTranslations).length}`);

  // Write updated translations
  fs.writeFileSync(
    langFile,
    JSON.stringify(langTranslations, null, 2) + '\n',
    'utf8'
  );
  console.log(`  ✅ Saved to ${lang}.json`);
});

console.log('\n✅ All translations synced!');
console.log('\n⚠️  Note: Keys marked with [LANG] prefix need professional translation.');
