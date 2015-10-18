let positions = require('./positions');

module.exports = function($templateCache, element, attr) {

  function createPopoverELement() {
    let templateString = $templateCache.get(attr.popoverTemplate);
    let $wrapper = angular.element('<div class="fo-popover"></div>');
    $wrapper[0].id = attr.popoverId;
    $wrapper.addClass(attr.popoverClass);
    $wrapper.css('width', attr.popoverWidth);

    return angular.element($wrapper).append(templateString);
  }

  function closeAllPopover() {
    angular.element(document.querySelectorAll('.fo-popover')).removeClass('open');
  }

  function placePopover(popoverElement) {
    let tetherOption = {
      element: popoverElement[0],
      target: element[0]
    };
    let currentPosition = getCurrentPosition();
    tetherOption = angular.extend(tetherOption, currentPosition);
    new Tether(tetherOption);
  }

  function getCurrentPosition() {
    var position = attr.popoverPosition.split(' ').join('_');
    if (attr.popoverOffset) {
      return angular.extend(positions[position], {offset: attr.popoverOffset});
    };
    return positions[position];
  }

  this.element = createPopoverELement();

  this.isOpened = function() {
    return this.element.hasClass('open');
  }.bind(this);

  this.open = function() {
    closeAllPopover();
    this.element.addClass('open');
    placePopover(this.element)
  }.bind(this);

  this.close = function() {
    this.element.removeClass('open');
  }.bind(this);


};
