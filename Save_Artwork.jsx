var mainDoc = app.activeDocument;
mainDoc.selection.deselect();
var height = mainDoc.height.as("px");

// Artwork Middle
var selectionShape = [ [0,0], [506,0], [506,height], [0,height] ];
mainDoc.selection.select(selectionShape);
mainDoc.selection.copy(true);

var artworkMiddleDoc = app.documents.add(new UnitValue("506 px"), mainDoc.height, 72, "artwork-middle", NewDocumentMode.RGB);
artworkMiddleDoc.paste();

var suffix = '_GG';
var saveName = new File(decodeURI(mainDoc.path)+'/ARTWORK-MIDDLE'+suffix+'.jpg');
saveJPEG( artworkMiddleDoc, saveName, 10 );

artworkMiddleDoc.close(SaveOptions.DONOTSAVECHANGES);


// Set active document
app.activeDocument = mainDoc;


// Artwork Right
var left = mainDoc.width.as("px")-100;
selectionShape = [ [left,0], [left+100,0], [left+100,height], [left,height] ];
mainDoc.selection.select(selectionShape);
mainDoc.selection.copy(true);

var artworkRightDoc = app.documents.add(new UnitValue("100 px"), mainDoc.height, 72, "artwork-right", NewDocumentMode.RGB);
artworkRightDoc.paste();

var saveName = new File(decodeURI(mainDoc.path)+'/ARTWORK-RIGHT'+suffix+'.jpg');
saveJPEG( artworkRightDoc, saveName, 10 );

artworkRightDoc.close(SaveOptions.DONOTSAVECHANGES);

stepHistoryBack();stepHistoryBack();

function saveJPEG(doc, saveFile, qty) {  
  var saveOptions = new JPEGSaveOptions();  
  saveOptions.embedColorProfile = true;  
  saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
  saveOptions.matte = MatteType.NONE;  
  saveOptions.quality = qty;   
  doc.saveAs(saveFile, saveOptions, true);  
} 
function stepHistoryBack() {
  var desc = new ActionDescriptor();
  var ref = new ActionReference();
  ref.putEnumerated(charIDToTypeID("HstS"), charIDToTypeID("Ordn"), charIDToTypeID("Prvs"));
  desc.putReference(charIDToTypeID("null"), ref);
  executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
}