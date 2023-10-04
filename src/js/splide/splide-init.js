document.addEventListener("DOMContentLoaded", function () {
  // new Splide("#image-slider", {
  //   autoplay: true,
  // }).mount();
  // new Splide("#thumbnail-slider", {
  //   fixedWidth: 100,
  //   fixedHeight: 60,
  //   gap: 10,
  //   rewind: true,
  //   pagination: false,
  //   cover: true,
  //   isNavigation: true,
  //   breakpoints: {
  //     600: {
  //       fixedWidth: 60,
  //       fixedHeight: 44,
  //     },
  //   },
  // }).mount();

  var main = new Splide("#image-slider", {
    autoplay: true,
  });
  var thumbnails = new Splide("#thumbnail-slider", {
    fixedWidth: 100,
    fixedHeight: 60,
    gap: 10,
    rewind: true,
    pagination: false,
    cover: true,
    isNavigation: true,
    breakpoints: {
      600: {
        fixedWidth: 60,
        fixedHeight: 44,
      },
    },
  });
  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
});
