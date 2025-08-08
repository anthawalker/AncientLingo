module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // If you decide to use NativeWind or another Tailwind‑in‑React‑Native library,
    // enable the plugin here.  See the NativeWind docs for configuration.
    plugins: []
  };
};