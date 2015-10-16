(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = angular.module('foPopover.directive', []).directive('foPopover', foPopover);

foPopover.$inject = ['$rootScope', '$location', '$templateCache', '$document', '$compile'];

function foPopover($rootScope, $location, $templateCache, $document, $compile) {
  return {

    restrict: 'A',
    scope: true,
    link: function link(scope, element, attr) {

      var templateString = $templateCache.get(attr.popoverTemplate);

      var $wrapper = angular.element('<div class="fo-popover"></div>');
      $wrapper[0].id = attr.popoverId;
      $wrapper.addClass(attr.popoverClass);
      $wrapper.css('width', attr.popoverWidth);

      var $popover = angular.element($wrapper).append(templateString);

      var $body = $document.find('body');
      $body.append($popover);

      var positionConfig = attr.popoverPosition.split(' ').join('_');

      var popover = {

        positions: {
          // top
          top_middle: {
            attachment: 'bottom middle',
            targetAttachment: 'top middle'
          },
          top_left: {
            attachment: 'bottom left',
            targetAttachment: 'top left'
          },
          top_right: {
            attachment: 'bottom right',
            targetAttachment: 'top right'
          },

          // bottom
          bottom_middle: {
            attachment: 'top middle',
            targetAttachment: 'bottom middle'
          },
          bottom_left: {
            attachment: 'top left',
            targetAttachment: 'bottom left'
          },
          bottom_right: {
            attachment: 'top right',
            targetAttachment: 'bottom right'
          },

          // left
          left_middle: {
            attachment: 'middle right',
            targetAttachment: 'middle left'
          },
          left_top: {
            attachment: 'top right',
            targetAttachment: 'top left'
          },
          left_bottom: {
            attachment: 'bottom right',
            targetAttachment: 'bottom left'
          },

          // right
          right_middle: {
            attachment: 'middle left',
            targetAttachment: 'middle right'
          },
          right_top: {
            attachment: 'top left',
            targetAttachment: 'top right'
          },
          right_bottom: {
            attachment: 'bottom left',
            targetAttachment: 'bottom right'
          },

          //diagonal
          top_left_diagonal: {
            attachment: 'bottom right',
            targetAttachment: 'top left'
          },
          top_right_diagonal: {
            attachment: 'bottom left',
            targetAttachment: 'top right'
          },
          bottom_left_diagonal: {
            attachment: 'top right',
            targetAttachment: 'bottom left'
          },
          bottom_right_diagonal: {
            attachment: 'top left',
            targetAttachment: 'bottom right'
          }

        },

        isOpened: function isOpened() {
          return $popover.hasClass('open');
        },

        open: function open() {
          var tetherOption = {
            element: $popover[0],
            target: element[0],
            attachment: 'bottom middle',
            targetAttachment: 'top middle',
            offset: attr.popoverOffset
          };

          tetherOption = angular.extend(tetherOption, popover.positions[positionConfig]);

          angular.element(document.querySelectorAll('.fo-popover')).removeClass('open');
          $popover.addClass('open');

          new Tether(tetherOption);
        },

        close: function close() {
          $popover.removeClass('open');
        }
      };

      element.bind('click', function (e) {
        angular.element(document.querySelector('.fo-popover')).removeClass('open');

        if (popover.isOpened()) {
          popover.close();
        } else {
          popover.open();
        }
        e.stopPropagation();
      });

      $compile($popover)(scope);

      scope.closePopover = popover.close;

      $popover.bind('click', function (e) {
        e.stopPropagation();
      });

      angular.element(document).find('a').bind('click', function (e) {
        if ($popover.hasClass('open')) {
          e.preventDefault();
        }
      });

      $document.bind('click', function () {
        popover.close();
      });
    }
  };
}

},{}],2:[function(require,module,exports){
'use strict';

module.exports = angular.module('foPopover.services', []).factory('foPopover', foPopover);

function foPopover() {
  return {
    close: function close(id) {
      angular.element(document.querySelector('.fo-popover.open')).removeClass('open');
    }
  };
}

},{}],3:[function(require,module,exports){
'use strict';

var directives = require('./fo-popover.directives');
var services = require('./fo-popover.services');

module.exports = angular.module('foPopover', [directives.name, services.name]);

},{"./fo-popover.directives":1,"./fo-popover.services":2}]},{},[3]);
