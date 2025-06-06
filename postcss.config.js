import sortMediaQueries from 'postcss-sort-media-queries';

export default {
  plugins: [
    sortMediaQueries({ sort: 'mobile-first' }),
  ],
};
