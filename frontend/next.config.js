const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/icons-material',
]); // 必要に応じて他の@muiモジュールを追加

module.exports = withTM({
  reactStrictMode: false,
  images: {
    domains: [
      's3-ap-northeast-1.amazonaws.com',
      'gears-images.s3.ap-northeast-1.amazonaws.com',
      'gears-item-images.s3.ap-northeast-1.amazonaws.com',
    ],
  },
});
