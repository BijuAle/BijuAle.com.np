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

  return {
    all: photos,
    byTag: tags,
    tags: Object.keys(tags)
  };
};