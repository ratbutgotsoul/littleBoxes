<!DOCTYPE html>
<html>

<head>

<script src="../js/jquery.js"></script>

<script src="../js/littleBoxes.js"></script>

<link rel="stylesheet" type="text/css" href="../css/littleBoxes.css" />

</head>

<body>

<h3>Simple</h3>
<input id="simple" placeholder="Start typing..">

<h3>Full Width</h3>
<input id="fullWidth" placeholder="Start typing..">

<script>
$(document).ready(function(){
    $('input#simple').each(function(){
        $(this).littleBoxes({
            'apiUrl':'api.php',
            'initialValue':[
                {'id':999,'box':'Rat'},
                {'id':888,'box':'but'},
                {'id':777,'box':'got'},
                {'id':666,'box':'soul'}           ]
        });
    });
    $('input#fullWidth').each(function(){
        $(this).littleBoxes({
            'apiUrl':'api.php',
            'initialValue':[
                {'id':999,'box':'Ratbutgotsoul'},
            ],
            'type':'full-width'
        });
    });
});
</script>

</body>

</html>

