/** @type {Record<string, { title: string, why: string, fix: string }>} */

export const advice = {
	'largest-contentful-paint': {
		title: 'Your main content takes too long to appear',
		why: 'Visitors see a blank or half-loaded page and many leave before it finishes.',
		fix: 'Compress your biggest image or banner, and avoid loading large sliders at the top of the page.'
	},
	'first-contentful-paint': {
		title: 'Nothing shows on screen for too long',
		why: 'The first moments decide whether visitors stay or leave.',
		fix: 'Remove heavy scripts and styles that block the page from displaying, and use faster hosting.'
	},
	'total-blocking-time': {
		title: 'The page freezes while it loads',
		why: 'Visitors tap or scroll and nothing happens, which feels broken.',
		fix: 'Remove unused plugins and scripts, and delay non-essential ones like chat widgets.'
	},
	'cumulative-layout-shift': {
		title: 'Things jump around while the page loads',
		why: 'Visitors click the wrong thing when buttons and text move suddenly.',
		fix: 'Set a width and height on images and embeds so the space is reserved before they load.'
	},
	'render-blocking-resources': {
		title: 'Files are holding up your page from showing',
		why: 'The browser waits for these files before it shows anything.',
		fix: 'Load non-essential scripts later, and combine or trim your CSS files.'
	},
	'uses-optimized-images': {
		title: 'Your images are bigger than they need to be',
		why: 'Large images slow the site down, especially on mobile data.',
		fix: 'Compress images before uploading (tools like Squoosh or TinyPNG are free).'
	},
	'modern-image-formats': {
		title: 'Your images use old file formats',
		why: 'Newer formats like WebP are much smaller with the same quality.',
		fix: 'Convert images to WebP, or use a WordPress image plugin that does it automatically.'
	},
	'uses-responsive-images': {
		title: 'Phones are downloading desktop-sized images',
		why: 'This wastes visitors\u2019 data and slows loading on mobile.',
		fix: 'Upload images at the size they are displayed, and use the responsive image features of your theme.'
	},
	'offscreen-images': {
		title: 'Images far down the page load too early',
		why: 'The page spends time on images the visitor has not scrolled to yet.',
		fix: 'Turn on lazy loading for images below the top of the page.'
	},
	'unused-css-rules': {
		title: 'Your site loads styling it never uses',
		why: 'Extra code makes every visit slower.',
		fix: 'Remove unused plugins and themes, or use a tool that strips unused CSS.'
	},
	'unused-javascript': {
		title: 'Your site loads code it never uses',
		why: 'Extra code slows the page, particularly on cheaper phones.',
		fix: 'Remove plugins and scripts you do not need, and load the rest only on pages that use them.'
	},
	'uses-text-compression': {
		title: 'Your pages are sent without compression',
		why: 'Uncompressed files take longer to reach the visitor.',
		fix: 'Ask your host to turn on Gzip or Brotli compression, or use a caching plugin that enables it.'
	},
	'server-response-time': {
		title: 'Your server is slow to respond',
		why: 'Everything else waits until the server answers.',
		fix: 'Use caching, remove heavy plugins, or move to faster hosting.'
	},
	'uses-long-cache-ttl': {
		title: 'Returning visitors re-download files they already have',
		why: 'Repeat visits are slower than they should be.',
		fix: 'Enable browser caching through your host or a caching plugin.'
	},
	'dom-size': {
		title: 'Your page is overly complex',
		why: 'Pages with too many elements are slow to display and use more memory.',
		fix: 'Simplify page layouts, and avoid stacking many page-builder sections.'
	},
	'color-contrast': {
		title: 'Some text is hard to read',
		why: 'Low contrast makes text difficult for many people, including in bright sunlight.',
		fix: 'Use darker text on light backgrounds (or the reverse). A free contrast checker will tell you if a pair of colours passes.'
	},
	'image-alt': {
		title: 'Images are missing descriptions',
		why: 'Screen reader users and search engines rely on image descriptions.',
		fix: 'Add a short alt text to each meaningful image describing what it shows.'
	},
	'link-name': {
		title: 'Some links have no readable name',
		why: 'Screen reader users cannot tell where these links go.',
		fix: 'Give every link clear text, or an aria-label if it is an icon.'
	},
	'button-name': {
		title: 'Some buttons have no readable name',
		why: 'Screen reader users cannot tell what these buttons do.',
		fix: 'Add visible text or an aria-label to every button.'
	},
	label: {
		title: 'Form fields are missing labels',
		why: 'Visitors using assistive tools do not know what to type in each field.',
		fix: 'Add a label to every form field, such as Name, Email or Phone.'
	},
	'html-has-lang': {
		title: 'The page language is not set',
		why: 'Screen readers may read your text with the wrong accent or pronunciation.',
		fix: 'Set the language on the page, for example lang="en" on the html tag.'
	},
	'document-title': {
		title: 'The page has no title',
		why: 'The title appears in browser tabs and Google search results.',
		fix: 'Give every page a clear, unique title that includes what the business does.'
	},
	'heading-order': {
		title: 'Headings are out of order',
		why: 'A clear heading structure helps both visitors and Google understand the page.',
		fix: 'Use one main heading, then subheadings in order, without skipping levels.'
	},
	'meta-description': {
		title: 'The page has no search description',
		why: 'Google uses this text under your link in search results, so it affects whether people click.',
		fix: 'Write a short description of about 150 characters for each important page (an SEO plugin makes this easy).'
	},
	'link-text': {
		title: 'Some links say things like "click here"',
		why: 'Vague link text does not help visitors or search engines.',
		fix: 'Make link text describe where it goes, such as "See our services".'
	},
	'crawlable-anchors': {
		title: 'Some links cannot be followed by Google',
		why: 'Google cannot discover pages that these links lead to.',
		fix: 'Use normal links with a real address instead of buttons or scripts that only look like links.'
	},
	'is-crawlable': {
		title: 'Google is being told not to list this page',
		why: 'The page may never appear in search results.',
		fix: 'Check for a noindex setting, and in WordPress make sure "Discourage search engines" is off in Settings, then Reading.'
	},
	'robots-txt': {
		title: 'Your robots.txt file has problems',
		why: 'This file tells search engines what they may visit.',
		fix: 'Fix or recreate the file. An SEO plugin can generate a safe one.'
	},
	canonical: {
		title: 'The preferred web address of the page is unclear',
		why: 'Search engines may treat copies of the page as duplicates.',
		fix: 'Set a canonical address for the page, which most SEO plugins do for you.'
	},
	viewport: {
		title: 'The page is not set up for mobile screens',
		why: 'Most of your visitors are on phones, and the page may display shrunken or zoomed out.',
		fix: 'Add the viewport meta tag, or use a responsive theme.'
	},
	'landmark-one-main': {
		title: 'The page has no main content area marked',
		why: 'Screen reader users rely on this to jump straight to the main content, skipping menus and headers.',
		fix: 'Wrap the main content of the page in a main tag, so assistive tools know where it starts.'
	},
	'network-dependency-tree-insight': {
		title: 'Files are loading one after another instead of together',
		why: 'When one file has to finish before the next one starts, the page takes longer to appear.',
		fix: 'Reduce the chain by loading important files directly and removing scripts or fonts that trigger more downloads.'
	},
	'render-blocking-insight': {
		title: 'Files are holding up your page from showing',
		why: 'The browser waits for these files before it shows anything, so visitors see a blank page for longer.',
		fix: 'Load non-essential scripts later, and trim or combine your CSS files.'
	},
	'is-on-https': {
		title: 'Some of your site is not secure',
		why: 'Browsers warn visitors about insecure pages, and many will leave.',
		fix: 'Make sure every page and image loads over https, and ask your host for a free SSL certificate if you do not have one.'
	},
	'redirects-http': {
		title: 'Visitors can still reach the insecure version of your site',
		why: 'Someone who types your address without https may land on a page browsers flag as unsafe.',
		fix: 'Set up a redirect from http to https, which most hosts offer in one click.'
	},
	'errors-in-console': {
		title: 'Your page has hidden errors',
		why: 'Errors behind the scenes can break features like forms, sliders or menus for some visitors.',
		fix: 'Open your browser developer tools, check the Console tab, and fix or remove whatever is causing the errors.'
	},
	'image-aspect-ratio': {
		title: 'Some images look stretched or squashed',
		why: 'Distorted images make a site look unprofessional.',
		fix: 'Upload images at the right proportions, and avoid forcing a width and height that do not match the original.'
	},
	'unsized-images': {
		title: 'Images do not reserve their space',
		why: 'The page jumps around as images load, which is annoying on phones.',
		fix: 'Give every image a width and height so the browser can hold its place.'
	},
	'font-size': {
		title: 'Some text is too small to read on a phone',
		why: 'Visitors have to zoom in, and many give up.',
		fix: 'Use at least 16px for body text, and avoid tiny text for important information.'
	},
	'tap-targets': {
		title: 'Buttons and links are too close together on phones',
		why: 'People tap the wrong thing, which is frustrating.',
		fix: 'Make buttons large enough to tap easily, and leave space between links.'
	},
	'target-size': {
		title: 'Buttons and links are too small to tap',
		why: 'Small targets are hard to hit with a thumb, especially for people with limited dexterity.',
		fix: 'Make clickable elements at least about 44 pixels wide and tall, with space around them.'
	},
	'meta-viewport': {
		title: 'The page does not adapt to phone screens properly',
		why: 'The layout may look zoomed out or force visitors to pinch and scroll sideways.',
		fix: 'Add the viewport meta tag, and allow visitors to zoom.'
	},
	bypass: {
		title: 'No way to skip straight to the main content',
		why: 'Keyboard and screen reader users have to go through the whole menu on every page.',
		fix: 'Add a "Skip to content" link at the top, or mark the main area with a main tag.'
	},
	'link-in-text-block': {
		title: 'Links in text are hard to spot',
		why: 'If links only differ by colour, people who cannot see colour well will miss them.',
		fix: 'Underline links inside paragraphs, or make them clearly different in more than colour.'
	},
	tabindex: {
		title: 'Keyboard navigation order is confusing',
		why: 'People who navigate with the Tab key may jump around the page in an odd order.',
		fix: 'Avoid positive tabindex values, and let the natural page order decide.'
	},
	'select-name': {
		title: 'Dropdown menus are missing labels',
		why: 'Visitors using assistive tools do not know what the dropdown is for.',
		fix: 'Add a label to every select field, such as "Choose a service".'
	},
	'frame-title': {
		title: 'Embedded content has no description',
		why: 'Screen readers cannot tell visitors what an embedded map or video is.',
		fix: 'Add a short title to every iframe, such as "Map showing our location".'
	},
	'font-display': {
		title: 'Text is invisible while fonts load',
		why: 'Visitors see blank spaces where text should be.',
		fix: 'Set font-display to swap so text shows straight away in a fallback font.'
	},
	'total-byte-weight': {
		title: 'Your page is very heavy to download',
		why: 'Large pages are slow on mobile data and cost visitors money.',
		fix: 'Compress images, remove unused plugins and scripts, and avoid autoplaying videos.'
	},
	'unminified-css': {
		title: 'Your styling files are not shrunk down',
		why: 'Extra spaces and comments make files bigger than needed.',
		fix: 'Turn on CSS minification in your caching plugin, or build tool.'
	},
	'unminified-javascript': {
		title: 'Your script files are not shrunk down',
		why: 'Extra spaces and comments make files bigger than needed.',
		fix: 'Turn on JavaScript minification in your caching plugin, or build tool.'
	},
	'third-party-summary': {
		title: 'Outside services are slowing your page down',
		why: 'Chat widgets, analytics and ads all add loading time you do not control.',
		fix: 'Remove third-party tools you do not really need, and load the rest after the page has appeared.'
	},
	'bootup-time': {
		title: 'Scripts take too long to run',
		why: 'Phones with weaker processors struggle most, so the page feels slow.',
		fix: 'Remove heavy plugins and scripts, and delay the ones that are not essential.'
	},
	'mainthread-work-breakdown': {
		title: 'The page is doing too much work while loading',
		why: 'Visitors cannot scroll or tap until the work is finished.',
		fix: 'Cut back on scripts, animations and plugins, especially on the first screen.'
	},
	redirects: {
		title: 'Visitors are bounced through extra addresses before arriving',
		why: 'Every redirect adds waiting time before your page even starts loading.',
		fix: 'Link directly to the final address, and remove unnecessary redirect chains.'
	},
	'prioritize-lcp-image': {
		title: 'Your main image loads later than it should',
		why: 'The biggest picture on screen is what visitors wait for.',
		fix: 'Do not lazy-load the main image at the top of the page, and make sure it is compressed.'
	}
};
