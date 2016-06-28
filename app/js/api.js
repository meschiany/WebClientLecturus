function _addContentToDB(second, text){
    var formData = {
        'video_id' : _videoId,
        'second' : second,
        'content' : text,
        'content_type': "text",
        'debug':true
    };

    /* Send the data using post with element id name and name2*/
    var posting = $.get( "http://localhost:3000/post/new", formData );

    //TODO on server if token is invalid redirect to login page
    posting.done(function( data ) {
        
    });
}

function _addFileToDB(second, text){
    var files = $("#file")[0].files;
    var file = files[0];


    var formData = new FormData();
    formData.append('file', file);
    formData.append('video_id',_videoId);
    formData.append('second' , second);
    formData.append('content' , text);
    formData.append('content_type', "file");
    formData.append('debug',true);
    /* Send the data using post with element id name and name2*/

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/post/new_file",
        data: formData,
        contentType: false,
        processData: false
    }).done(function(data){
        
    });
}

function uploadNewFile(){
    var files = $("#file")[0].files;
    var file = files[0];
    
    var data = new FormData();
    data.append('file', file);
    data.append('video_id',_videoId);
    data.append('debug',true);
    /* Send the data using post with element id name and name2*/

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/post/upload_file",
        data: data,
        contentType: false,
        processData: false
    }).done(function(data){
        
    });
}