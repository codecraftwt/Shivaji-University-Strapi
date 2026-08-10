const fs = require('fs');
const path = require('path');

const apis = [
  {
    name: 'announcement',
    singularName: 'announcement',
    pluralName: 'announcements',
    displayName: 'Announcement',
    attributes: {
      text: { type: 'string', required: true },
      link: { type: 'string' }
    }
  },
  {
    name: 'department',
    singularName: 'department',
    pluralName: 'departments',
    displayName: 'Department',
    attributes: {
      name: { type: 'string', required: true },
      link: { type: 'string' }
    }
  },
  {
    name: 'leadership',
    singularName: 'leadership',
    pluralName: 'leaderships',
    displayName: 'Leadership',
    attributes: {
      name: { type: 'string', required: true },
      title: { type: 'string' },
      image: { type: 'media', multiple: false, required: false, allowedTypes: ['images'] }
    }
  },
  {
    name: 'update',
    singularName: 'update',
    pluralName: 'updates',
    displayName: 'Update',
    attributes: {
      title: { type: 'string', required: true },
      link: { type: 'string' }
    }
  },
  {
    name: 'event',
    singularName: 'event',
    pluralName: 'events',
    displayName: 'Event',
    attributes: {
      title: { type: 'string', required: true },
      link: { type: 'string' },
      date: { type: 'date' }
    }
  },
  {
    name: 'achievement',
    singularName: 'achievement',
    pluralName: 'achievements',
    displayName: 'Achievement',
    attributes: {
      title: { type: 'string', required: true },
      link: { type: 'string' }
    }
  },
  {
    name: 'circular',
    singularName: 'circular',
    pluralName: 'circulars',
    displayName: 'Circular',
    attributes: {
      title: { type: 'string', required: true },
      link: { type: 'string' },
      category: { type: 'enumeration', enum: ['General Administration', 'Affiliation', 'Examination', 'Finance', 'Board of Research'] }
    }
  },
  {
    name: 'video',
    singularName: 'video',
    pluralName: 'videos',
    displayName: 'Video',
    attributes: {
      title: { type: 'string', required: true },
      link: { type: 'string' }
    }
  }
];

const basePath = path.join(__dirname, 'src', 'api');

apis.forEach(api => {
  const apiPath = path.join(basePath, api.name);
  
  // Content Type
  const ctPath = path.join(apiPath, 'content-types', api.name);
  fs.mkdirSync(ctPath, { recursive: true });
  
  const schema = {
    kind: 'collectionType',
    collectionName: api.pluralName,
    info: {
      singularName: api.singularName,
      pluralName: api.pluralName,
      displayName: api.displayName,
    },
    options: { draftAndPublish: true },
    pluginOptions: {},
    attributes: api.attributes
  };
  fs.writeFileSync(path.join(ctPath, 'schema.json'), JSON.stringify(schema, null, 2));

  // Controllers
  const ctrlPath = path.join(apiPath, 'controllers');
  fs.mkdirSync(ctrlPath, { recursive: true });
  fs.writeFileSync(path.join(ctrlPath, `${api.name}.js`), `'use strict';\n\nconst { createCoreController } = require('@strapi/strapi').factories;\n\nmodule.exports = createCoreController('api::${api.name}.${api.name}');\n`);

  // Routes
  const routePath = path.join(apiPath, 'routes');
  fs.mkdirSync(routePath, { recursive: true });
  fs.writeFileSync(path.join(routePath, `${api.name}.js`), `'use strict';\n\nconst { createCoreRouter } = require('@strapi/strapi').factories;\n\nmodule.exports = createCoreRouter('api::${api.name}.${api.name}');\n`);

  // Services
  const servPath = path.join(apiPath, 'services');
  fs.mkdirSync(servPath, { recursive: true });
  fs.writeFileSync(path.join(servPath, `${api.name}.js`), `'use strict';\n\nconst { createCoreService } = require('@strapi/strapi').factories;\n\nmodule.exports = createCoreService('api::${api.name}.${api.name}');\n`);
  
  console.log(`Generated API: ${api.name}`);
});

console.log('All APIs generated successfully.');
