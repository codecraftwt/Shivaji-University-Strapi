import type { Core } from '@strapi/strapi';
import path from 'path';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      provider: (() => {
        const isDist = __dirname.includes('dist');
        const relPath = isDist ? '../../src/providers/upload-cloudinary-nodelete' : '../src/providers/upload-cloudinary-nodelete';
        return require.resolve(path.resolve(__dirname, relPath));
      })(),
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: env('CLOUDINARY_FOLDER', 'Unishivaji_website'),
          upload_preset: env('CLOUDINARY_PRESET', 'Unishivaji_uploads'),
        },
        uploadStream: {
          folder: env('CLOUDINARY_FOLDER', 'Unishivaji_website'),
          upload_preset: env('CLOUDINARY_PRESET', 'Unishivaji_uploads'),
        },
        delete: {},
      },
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes: deniedExecutableTypes,
      },
    },
  },
});

export default config;
