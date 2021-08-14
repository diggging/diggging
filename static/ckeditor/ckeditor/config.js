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