const DOMPurify = require('isomorphic-dompurify'); console.log(DOMPurify.sanitize('<span class=\"text-primary italic\">identity.</span>'));
