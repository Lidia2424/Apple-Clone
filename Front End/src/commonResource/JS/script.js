$(function () {
  togglerActiveClass();
  // DOM Ready - do your stuff
});
$(document).on("click", ".active h3", function () {
  $(this).next("ul").slideToggle();
  $(this).toggleClass("expanded");
});
function togglerActiveClass() {
  $(window).on("resize", function () {
    if ($(window).width() <= 768) {
      $(".footer-links-wrapper").addClass("active");
      $(".footer-links-wrapper ul").hide();
    } else {
      $(".footer-links-wrapper").removeClass("active");
      $(".footer-links-wrapper ul").show();
      $(".footer-links-wrapper h3").removeClass("expanded");
    }
  });
}
