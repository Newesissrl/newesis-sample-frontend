function pictureHelper() {
  const Transform = (url, width, height) => {
    return url.replace(
      "mzinga.io/uploads/",
      `mzinga.io/cdn-cgi/image/fit=cover,h=${height},w=${width},g=auto,f=auto/uploads/`,
    );
  };
  const TransformMedia = (media, size) => {
    const picture = { width: "500", height: "500" };
    if (media.sizes[size].width && media.sizes[size].height) {
      picture.width = media.sizes[size].width;
      picture.height = media.sizes[size].height;
    } else if (size === "hero") {
      picture.width = 1920;
      picture.height = 1080;
    } else if (size === "portrait") {
      picture.width = 768;
      picture.height = 1024;
    }
    return Transform(media.url, picture.width, picture.height);
  };
  return {
    Transform,
    TransformMedia,
  };
}
export default pictureHelper();
