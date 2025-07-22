const fs = require('fs');

// Check package.json for merge conflicts
const packageJson = fs.readFileSync('package.json', 'utf8');

// Check for merge conflict markers
const conflictMarkers = ['<<<<<<<', '=======', '>>>>>>>'];
const hasConflicts = conflictMarkers.some(marker => packageJson.includes(marker));

if (hasConflicts) {
  console.error('❌ MERGE CONFLICT DETECTED in package.json!');
  console.error('Found conflict markers in package.json');
  process.exit(1);
}

// Validate JSON
try {
  JSON.parse(packageJson);
  console.log('✅ package.json is valid JSON');
  console.log('✅ No merge conflicts detected');
} catch (error) {
  console.error('❌ Invalid JSON in package.json:', error.message);
  process.exit(1);
}
