"use strict";
/* Basic JS/CSS Accordion (c) cwsoft. Published under MIT license. */
/**
 * Initilizes the accordion using userOptions or default options.
 * @param {IUserOptions} userOptions Object with user defined options
 * @returns {boolean} Returns true on sucess, otherwise false
 */
function initializeAccordion(userOptions) {
  // Accordion default configuration settings.
  const defaults = {
    accContainerId: "#accordion",
    accHeaderElement: "h2",
    accContentElement: "div",
    startItem: 1,
    expandStartItem: true,
    allowMultipleExpandedItems: false,
    allowCollapsingItemsOnClick: true,
    scrollIntoView: true,
  };
  // Merge user options with defaults.
  const options = _mergeUserOptions(defaults, userOptions);
  // Setup entire accordion and quit.
  return _setup();
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+ Internal helper functions defined below (not part of the public API).
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /**
   * Setup accordion script based on user defined options.
   * @returns {boolean} Returns true on sucess, otherwise false
   */
  function _setup() {
    // Extract accordion header elements from document.
    const accHeaderSelector = options.accContainerId + " " + options.accHeaderElement;
    const accHeaders = document.querySelectorAll(accHeaderSelector);
    // Ensure at least one valid accordion header element exists.
    const accItems = accHeaders.length;
    if (accItems === 0) {
      console.log("Err: No matching '" + accHeaderSelector + "' elements found. Adapt config values to your site markup.");
      return false;
    }
    // Work out valid start item.
    const accStartItem = _getStartItem(accItems);
    // Initialize accordion (set default classes, add event handler).
    let accItem = 1;
    accHeaders.forEach((accHeader) => {
      // Set item number as data attribute.
      accHeader.setAttribute("data-item", accItem.toString());
      // Collapse all items (except startItem) on startup.
      if (options.expandStartItem && accItem === accStartItem) {
        accHeader.classList.add("expanded");
      } else {
        accHeader.classList.add("collapsed");
      }
      // Add click event listener to all items.
      accHeader.addEventListener("click", (event) => {
        const clickedElement = event.target;
        _autoCollapseExpandedItems(clickedElement);
        _toggleItemState(clickedElement);
        _scrollIntoView(clickedElement);
      });
      accItem++;
    });
    return true;
  }
  /**
   * Merges optional userOption with defaults.
   * @param {any} defaults Object literal with default options.
   * @param {any} userOptions Object literal with userOptions.
   * @returns {any} Object literal where userOptions are merged into defaults.
   */
  function _mergeUserOptions(defaults, userOptions) {
    // Short circuit in case no valid config object is defined.
    if (userOptions === null || typeof userOptions !== "object") {
      return defaults;
    }
    // Overwrite default with config if key exists and types match.
    for (let key in userOptions) {
      if (key in defaults) {
        if (typeof defaults[key] === typeof userOptions[key]) {
          defaults[key] = userOptions[key];
        }
      }
    }
    return defaults;
  }
  /**
   * Work out valid startItem defined in userOptions or as optional ?item=N get parameter.
   * @param {number} nbrItems Total number of accordion items on the page.
   * @returns {number} Returns a validated start item number [Default: 1]
   */
  function _getStartItem(nbrItems) {
    // Check if a start item was defined via optional ?item=N get parameter.
    let matches = new RegExp("[?&]item=([^&#]*)").exec(window.location.href);
    let startItem = matches !== null ? parseInt(matches[1]) || options.startItem : options.startItem;
    // Convert negative start items (?item=-N -> N-th last item).
    if (startItem < 0) {
      startItem = startItem + nbrItems + 1;
    }
    // Ensure we always have a valid start item.
    if (startItem < 1 || startItem > nbrItems) {
      startItem = 1;
    }
    return startItem;
  }
  /**
   * Collapse previous expanded items depending on user settings.
   * @param {HTMLElement} clickedElement Element which triggered the click event.
   */
  function _autoCollapseExpandedItems(clickedElement) {
    if (options.allowMultipleExpandedItems) {
      return;
    }
    // Extract expanded headers and data-item attribute of clicked item.
    let expandedHeaders = document.querySelectorAll(options.accContainerId + " " + options.accHeaderElement + ".expanded");
    const dataItem = clickedElement.getAttribute("data-item");
    // Only proceed if clicked element has a valid data-item attribute.
    if (expandedHeaders.length == 0 || dataItem === null) return;
    // Collapse expanded items except clicked one.
    expandedHeaders.forEach((expandedHeader) => {
      if (expandedHeader.getAttribute("data-item") !== dataItem) {
        expandedHeader.classList.toggle("collapsed");
        expandedHeader.classList.toggle("expanded");
      }
    });
  }
  /**
   * Toggle visibility state of actual clicked item depending on user settings.
   * @param {HTMLElement} clickedElement Element which triggered the click event.
   */
  function _toggleItemState(clickedElement) {
    if (!options.allowCollapsingItemsOnClick && clickedElement.classList.contains("expanded")) {
      return;
    }
    clickedElement.classList.toggle("collapsed");
    clickedElement.classList.toggle("expanded");
  }
  /**
   * Scroll viewport to actual clicked item depending on user settings.
   * @param {HTMLElement} clickedElement Element which triggered the click event.
   */
  function _scrollIntoView(clickedElement) {
    if (options.scrollIntoView) {
      clickedElement.scrollIntoView();
    }
  }
}
