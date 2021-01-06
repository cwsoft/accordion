# 👀 Basic Accordion (HTML5, CSS3, Javascript)

Basic Accordion script without dependencies. Requires a "modern" browser (2016+) with CSS3 and ES5/6 support. A live demo is available at [http://die-laderin.de](http://die-laderin.de/kultur.html).

## Installation

Simply clone this repo or just copy the CSS and JS files of interest to your computer to start. Customization can be done by editing the relevant CSS and JS files. If you want to contribute or to heavily customize the script to your needs, consider installing the Node package `SASS` in conjunction with an editor like VS Code. Details about setting up a free development environment for Windows can be found in my [WDEV](https://github.com/cwsoft/WDEV) repo at Github.

```bash
# Clone this repo to your computer.
git clone https://github.com/cwsoft/accordion.git

# Recommended for developers to ease customization (requires Node.js to be installed).
npm install -g sass
```

## Basic usage

Link the accordion CSS and Javascript file into the head section of your HTML site and initialize the accordion just before the closing body. To change the default settings, just invoke `initializeAccordion` with an optional `option` object. If no user options are defined, the script is invoked with the default settings shown below.

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <title>Accordion - Demo</title>
    <link href="css/main.min.css" rel="stylesheet" type="text/css" />
    <script src="js/accordion.min.js"></script>
  </head>

  <body>
    <h1>Accordion Demo</h1>
    <section id="accordion">
      <h2>Accordion Header 1</h2>
      <div>Accordion content 1.</div>

      <h2>Accordion Header 2</h2>
      <div>Accordion content 2.</div>

      <h2>Accordion Header 3</h2>
      <div>Accordion content 3.</div>
    </section>
  </body>

  <script>
    // You can change default behaviour by passing over a userOption object.
    // Invoking initializeAccordion() without options applies the following defaults.
    const userOptions = {
      // ID of the outer container element holding all accordion items
      accContainerId: "#accordion",
      // Element used for the accordion heading.
      accHeaderElement: "h2",
      // Element used for the accordion content.
      accContentElement: "div",
      // Item number of the initial expanded item (use -1 to show the last item).
      // The startItem can also be set via optional GET parameter (?item=N).
      startItem: 1,
      // Flag to show defined startItem expanded or collapsed.
      expandStartItem: true,
      // Flag to allow multiple items be expanded or only one item.
      allowMultipleExpandedItems: false,
      // Flag to allow collapsing items by clicking on the header.
      allowCollapsingItemsOnClick: true,
      // Flag to scroll viewport to actual clicked item.
      scrollIntoView: true,
    };

    // Initialize accordion (calling function w/o userOptions uses the defaults above).
    initializeAccordion(userOptions);
  </script>
</html>
```

Have fun
cwsoft
