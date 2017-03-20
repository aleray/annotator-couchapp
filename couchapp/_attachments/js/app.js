var annotator = require('annotator');
var anno = new annotator.App();
anno
    .include(annotator.ui.main,
    {
        element: document.getElementById('article'),
        // editorExtensions: [annotator.ui.tags.editorExtension],
        // viewerExtensions: [
        //     annotator.ui.markdown.viewerExtension,
        //     annotator.ui.tags.viewerExtension
        // ]
        editorExtensions: [myEditorExtension],
    })
    .include(function()
    {
        return {
            beforeAnnotationCreated: function(annotation)
            {
                annotation.uri = window.location.href;
            }
        }
    })
    .include(require('annotator-pouchdb').pouch,
    {
        name: 'annotator-offline'
    })
    .start()
    .then(function()
    {
        anno.annotations.load(
        {
            key: location.href
        });
    });



// fade the text out through time
var startDate = new Date(2017, 1, 20);
var dueDate = new Date(2017, 3, 20);
var currentDate = new Date();
var delta = dueDate - currentDate;
var remaining_days = Math.round(delta / (1000 * 60 * 60 *24));
var gray = Math.round(remaining_days * (255 / 30));
var pc = (currentDate - startDate) / (dueDate - startDate) * 100;
var article = document.getElementById("article").setAttribute("style", 'color: rgb(' + pc + '%,' + pc + '%,' + pc + '%)');
console.log('rgb(' + pc + '%,' + pc + '%,' + pc + '%)');
