import type { Core } from '@strapi/strapi';

import seed from './seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Run the seed script to populate quick links and other default data
    if (process.env.RUN_SEED === 'true') {
      strapi.log.info('Running database seeding...');
      await seed(strapi);
    } else {
      strapi.log.info('Database seeding is skipped. Set RUN_SEED=true to run it.');
    }
  },
};
