/*
 *  Development by: Nikos P. Kallitsis
 *  Email: ratbutgotsoul@gmail.com
 *  Licence: .. 
 */
(function($) { 
    $.fn.littleBoxes = function( options ){     
        var defaults = {
            boxClass:'box',
            boxListClass:'box-list',
            boxContainerClass:'box-container',
            inputClass:'input-box',
            suggestionClass:'suggestion',
            suggestionListClass:'suggestion-list',
            suggestionContainerClass:'suggestion-container',
            containerClass:'little-boxes-container',
            type:'inline', // inline or full-width
            disableDrop:false,
            apiUrl:null,
            disableInput:false,
            allowDuplicates:false,
            duplicateClass:'flash-duplicate',
            initialValue:null
        }; 
        var $mom=null,$boxes=null,$suggestions=null,$input=null,$output=$(this),stopTyping=null,tmp='',options=$.extend(true,{},defaults,options);
         
        $(this).wrap('<div>').hide();
        $mom=$(this).parent();
        $mom.ids=[];

        $mom.addClass(options['containerClass']).append(
            $boxes=$('<ul>',{'class':options['boxListClass']}).append($('<li>',{'class':options['inputClass']}).append($input=$('<input>'))),
            $mom.loading=$('<span>',{'class':'loading'}).hide(), 
            $('<div>',{'class':'dropdown-list'}).append($suggestions=$('<ul>',{'class':options['suggestionListClass']}))
        ).click(function(){$input.trigger('focus');});    
        
        if(options['type']!='inline'){$mom.addClass('full-width');}

        $input.clear=function(){$(this).val($output.attr('placeholder'));};
        $input.focus(function(){$(this).val('');}).clear();

        $boxes.add=function(s){
            var id=s.data('id'),$check=$boxes.find("li[data-id='"+id+"']"),$e=null;
            if(!s.data('box-layout')){return;}
            if($check.length && !options['allowDuplicates'] ) 
            { 
                $check.addClass(options['duplicateClass']);
                setTimeout(function(e){e.removeClass(options['duplicateClass']);},500,$check);
                return ; 
            }
            $input.parent('li').before($e=$('<li>',{'class':options['boxClass'],'html':s.data('box-layout'),'data-id':id}));
            if(!options['disableDrop'])
            {
                $e.append($('<div>',{'html':'<div></div><div class="m45"></div>','class':'drop','title':'Click to delete'}).click(function(){$(this).parent('li').remove();$mom.output();}));
            }
            $mom.output();
            $input.clear();
            $suggestions.clear();
        };

        $input.setWidth=function(){
            if($mom.hasClass('full-width')){
                $input.width($boxes.width()-30);
                return;
            }
            var last=$boxes.find('li.box').last(); 
            if(!last.length){width=$mom.width()-30;return;} 
            var width=($mom.width()-50)-(last.offset().left+last.width())-$mom.offset().left-20; 
            if(width<30){width=$mom.width()-30;}
            if(width>$mom.width()){width=$mom.width()-70;} 
            $input.width(width); 
        };

        $mom.output=function(){
            $mom.ids=[];
            $boxes.children('li.'+options['boxClass']).each(function(){$mom.ids.push($(this).data('id'));});
            $output.val($mom.ids.join(','));
            $input.setWidth();
            $mom.trigger('change');
        };

        $suggestions.add=function(s){ 
            if(!s.suggestion){s.suggestion=s.box;}
            if(!s.id){s.id=s.box;}
            $(this).append($suggestion=$('<li>',{'html':s.suggestion,'class':options['suggestionClass']})
                .data({'id':s.id,'box-layout':s.box})
                .click(function(){$boxes.add($(this));})
                .mouseover(function(){
                    $suggestions.find('li.selected').removeClass('selected');
                    $(this).addClass('selected');
                })
            );
            return $suggestion;
        };

        $suggestions.clear=function(){$(this).hide().find('li').remove();};

        //$suggestions.next=function(){$(this).children('li.selected');};

        $input.keydown(function(e){
            var key=e.keyCode;
            var $selected=$suggestions.find('li.selected');
            var v=$(this).val();

            $mom.loading.hide();

            if(key==8&&$(this).val()=='')
            {
                $boxes.find('li.'+options['boxClass']).last().remove();
                $mom.output();
            }
            else if(key==40 )
            {
                if( $suggestions.find('li').last().data('id')!=$selected.data('id') )
                {
                    $selected.removeClass('selected').next('li').addClass('selected');
                }
            }
            else if(key==38 )
            {
                if( $suggestions.find('li').first().data('id')!=$selected.data('id') )
                {
                    $selected.removeClass('selected').prev('li').addClass('selected');
                }    
            }
            else if(key==13) // Enter
            {
                $boxes.add($selected);
            }
            else 
            {
                if( $(this).val()==$output.attr('placeholder') )
                {
                    $(this).val('');
                }
                if(stopTyping){clearTimeout(stopTyping);}
                stopTyping=setTimeout(function(){$input.trigger('search');},250);
            }    
        }).bind({'search':function(){
            $mom.loading.show();
            var value=$input.val();
            tmp=value;
            $suggestions.clear();
            if(value==''){$mom.loading.hide();return;}
            $.ajax({
                url:options['apiUrl'],
                data:{'search':value,'current':$mom.ids.join('+'),id:$output.attr('id')}
            }).done(function(r){
                r=$.parseJSON(r);
                for(var i=0;i<r.count;i++){$suggestions.add(r.results[i]);}
                $suggestions.show().find('li').first().addClass('selected');
                setTimeout(function(){$mom.loading.hide()},444);
            });
        }}).blur(function(){setTimeout(function(){$suggestions.clear();},100);});

        if(options['initialValue']){for(var i=0;i<options['initialValue'].length;i++){
            $suggestions.add(options['initialValue'][i]).trigger('click').remove();
        }}
        $input.setWidth();
    };
})(jQuery);
