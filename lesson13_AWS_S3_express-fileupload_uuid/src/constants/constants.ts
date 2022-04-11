export const constants = {
    AUTHORIZATION: 'Authorization',

    EMAIL_REGEXP: /.+@[^@]+\.[^@]{2,}$/,

    EMAIL_TEMPLATES_DIR: 'email-templates',

    FRONTEND_URL: 'https://google.com',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,

    PHOTOS_MIMETYPE: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
    ],

    VIDEO_MIMETYPE: [
        'video/mp4',
        'video/x-msvideo',
    ],
};
