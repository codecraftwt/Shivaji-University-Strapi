const strapi = require('@strapi/strapi');

(async () => {
  const app = await strapi({ distDir: './dist' }).load();
  await app.start();

  try {
    const navbar = await strapi.documents('api::main-navbar.main-navbar').findFirst({
      populate: {
        menu_items: {
          populate: {
            dropdown_items: {
              populate: {
                sub_items: true
              }
            }
          }
        }
      }
    });

    if (navbar) {
      const updatedMenuItems = navbar.menu_items.map(menuItem => {
        if (menuItem.label.toLowerCase() === 'about us' && menuItem.dropdown_items) {
          menuItem.dropdown_items = menuItem.dropdown_items.map(dropdownItem => {
            if (dropdownItem.label === 'About Kolhapur') {
              dropdownItem.href = '/about_suk/About-Kolhapur';
            }
            return dropdownItem;
          });
        }
        return menuItem;
      });

      await strapi.documents('api::main-navbar.main-navbar').update({
        documentId: navbar.documentId,
        data: {
          menu_items: updatedMenuItems
        }
      });
      console.log('Navbar updated successfully.');
    } else {
      console.log('Navbar not found.');
    }
  } catch (error) {
    console.error('Error updating navbar:', error);
  }
  
  process.exit(0);
})();
