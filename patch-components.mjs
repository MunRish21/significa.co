import fs from 'fs';

const file = 'components.291324130007925.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let modified = 0;
data.components.forEach(comp => {
  if (comp.schema) {
    Object.values(comp.schema).forEach(field => {
      if (field.component_group_whitelist && field.component_group_whitelist.length > 0) {
        field.component_group_whitelist = []; // Clear broken group UUIDs
        // If there's no component whitelist either, remove restriction entirely
        if (!field.component_whitelist || field.component_whitelist.length === 0) {
            field.restrict_components = false;
            field.restrict_type = "";
        }
        modified++;
      }
    });
  }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log(`Patched ${modified} field definitions to remove invalid group UUIDs.`);
