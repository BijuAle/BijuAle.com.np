const cloudinary = require("cloudinary").v2;

module.exports = async function () {
  const { resources } = await cloudinary.search
    .expression('resource_type:image')
    .with_field('tags')
    .with_field('context')
    .with_field('metadata')
    .with_field('image_metadata')
    .with_field('image_analysis')
    .sort_by('created_at', 'desc')
    .max_results(500)
    .execute();

  const tags = {};
  const photos = resources.map(photo => {
    photo.tags.forEach(tag => {
      if (!tags[tag]) tags[tag] = [];
      tags[tag].push(photo);
    });
    return photo;
  });

  // Sort each tag so the image with context key thumbnail=true comes first.
  // Falls back to most-recently-uploaded if none is marked.
  // thumbnail context value should be the exact tag name, e.g. thumbnail=Beautiful Flower
  // This makes it tag-specific — the same image in multiple tags only wins for its intended tag.
  // Falls back to thumbnail=true for backwards compatibility.
  Object.keys(tags).forEach(tag => {
    const isThumb = photo => {
      const val = photo.context?.thumbnail;
      return val === tag || val === "true";
    };
    tags[tag].sort((a, b) => {
      // Prefer exact tag match over generic "true"
      const aScore = photo => {
        const val = photo.context?.thumbnail;
        return val === tag ? 2 : val === "true" ? 1 : 0;
      };
      return aScore(b) - aScore(a);
    });
  });

  return {
    all: photos,
    byTag: tags,
    tags: Object.keys(tags)
  };
};
