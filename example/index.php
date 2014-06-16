
<html>

<head>

<meta http-equiv="refresh" content="40">

<script src="./js/jquery.js"></script>

<script src="./js/littleBoxes.js"></script>

<link rel="stylesheet" type="text/css" href="./css/littleBoxes.css" />

</head>

<body>

<h3>Simple</h3>
<input id="simple" placeholder="Type..">

<h3>Full Width</h3>
<input id="fullWidth" placeholder="Type..">

<h3>Monitor</h3>
<div id="m"> Monitor </div>

<script>

$(document).ready(function(){
    $('input#simple').each(function(){
        $(this).littleBoxes({
            'apiUrl':'api.php',
            'initialValue':[
                {'id':23,'box':'Nikos'}, //'suggestion':''},
                {'id':223,'box':'Nick'}//,'suggestion':''}
            ]
        });
    });
    $('input#fullWidth').each(function(){
        $(this).littleBoxes({
            'apiUrl':'api.php',
            'initialValue':[
                {'id':254,'box':'Nk'}, //'suggestion':''},
                {'id':22,'box':'Nick'}//,'suggestion':''}
            ],
            'type':'full-width'

        });
    });
});

</script>


</body>

</html>

