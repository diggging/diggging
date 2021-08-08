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