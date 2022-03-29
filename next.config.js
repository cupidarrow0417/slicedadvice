/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: 'mongodb+srv://alanduong:Blackwalnut1@cluster0.u8raf.mongodb.net/SlicedAdvicePrototype?retryWrites=true&w=majority'
  }
}

module.exports = nextConfig
