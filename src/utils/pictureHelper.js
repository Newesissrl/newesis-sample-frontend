function pictureHelper() {
  const Transform = (url, width, height) => {
    return url.replace(
      "mzinga.io/uploads/",
      `mzinga.io/cdn-cgi/image/fit=cover,h=${height},w=${width},g=auto,f=auto/uploads/`,
    );
  };
  const TransformMedia = (media, size) => {
    console.log(media, size);
    const { width = 500, height = 500 } =
      size && media.sizes[size] ? media.sizes[size] : {};
    return Transform(media.url, width, height);
  };
  return {
    Transform,
    TransformMedia,
  };
}
export default pictureHelper();
