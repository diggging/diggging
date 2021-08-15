CKEDITOR.editorConfig = function( config ) 
{ 
    CKEDITOR.dtd.$removeEmpty['i'] = false;
    config.enterMode = CKEDITOR.ENTER_BR;
    config.fillEmptyBlocks = false;
};

config.fillEmptyBlocks = function( element )
{
    if ( element.name == 'div' )
        return false;
}

CKEDITOR.replace( 'editor1', {
    extraPlugins: 'codesnippetgeshi',
    codeSnippetGeshi_url: '../lib/colorize.php'
} );

config.codeSnippetGeshi_url = 'http:\/\/example.com\/geshi\/colorize.php';

CKEDITOR.editorConfig = function( config ) {

    //   config.enterMode = 2; //disabled <p> completely
         config.enterMode = CKEDITOR.ENTER_BR; // pressing the ENTER KEY input <br/>
         config.shiftEnterMode = CKEDITOR.ENTER_P; //pressing the SHIFT + ENTER KEYS input <p>
         config.autoParagraph = false; // stops automatic insertion of <p> on focus
     };