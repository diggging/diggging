<<<<<<< HEAD
/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	config.enterMode =CKEDITOR.ENTER_BR;	
};

=======
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
>>>>>>> post-html2
