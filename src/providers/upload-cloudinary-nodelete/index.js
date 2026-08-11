const cloudinary = require('@strapi/provider-upload-cloudinary');

module.exports = {
  init(providerOptions) {
    // Initialize the default Cloudinary provider
    const provider = cloudinary.init(providerOptions);
    
    return {
      ...provider,
      // Override the delete function to do absolutely nothing
      delete(file, customConfig) {
        console.log(`[Safe Cloudinary] Prevented deletion of file: ${file.hash}`);
        return Promise.resolve();
      },
    };
  },
};
