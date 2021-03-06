(function($) {


    // ui js ------------
    var fileSwitch = false;
    function clearForm(){
        $("#file").val("");
        $("#inpSec").val("");
        $("textarea").val("");
        fileSwitch = true;
        toggleFile();

    }

    function publish(){

    var formData = {    
        'id' : _videoId,
        'debug' : true
    };

    var posting = $.get( consts.SERVER+"/video/publish", formData );

    posting.done(function(data){window.location = data.data.videoUrl});

    }

    function toggleFile(){
        
        if (fileSwitch){
            //Text
            $("#fileToggle").css({"background-color":"#2a2a2a", "color":"#2abfd5"});
            $("textarea").removeAttr("disabled");
            $("textarea").css("background-color","#fff");

            $("#file").attr("disabled","disabled");
        }else{
            //File
            $("#fileToggle").css({"background-color":"#2abfd5", "color":"#2a2a2a"});
            $("textarea").attr("disabled","disabled");
            $("textarea").css("background-color","#ccc");

            $("#file").removeAttr("disabled");
        }
        fileSwitch = !fileSwitch;
    }


    function bindUIEvents(){

        $("#clearForm").bind("click",clearForm);

        $("#fileToggle").bind("click",toggleFile);

        $("#publish").bind("click",publish);        

        $(window).keypress(function (e) {
            if (e.keyCode === 0 || e.keyCode === 32) {
                e.preventDefault()
                vidPlayer = $("video")[0];
                if (vidPlayer.paused == false) {
                    vidPlayer.pause();
                } else {
                    vidPlayer.play();
                }
            }
        });

    }

    // ui js ------------

    $.fn.videoPlayer = function(options) {

        var settings = {
            playerWidth : '0.95', // Default is 95%
            videoClass : 'video'  // Video Class
        };

        // Extend the options so they work with the plugin
        if(options) {
            $.extend(settings, options);
        }
        // For each so that we keep chainability.
        return this.each(function() {
            
            $(this)[0].addEventListener('loadedmetadata', function() {

                // Basic Variables 
                var $this = $(this);
                var $settings = settings;

                // Wrap the video in a div with the class of your choosing
                $this.wrap('<div class="'+$settings.videoClass+'"></div>');

                // Select the div we just wrapped our video in for easy selection.
                var $that = $this.parent('.'+$settings.videoClass);
                var divs = "";
                var duration = $(this)[0].duration;
                var progressWidth = $this.width() * $settings.playerWidth * 0.6;
                var btnWidth = 9; // 9 is half the width of the progress btn.

                // The Structure of our video player
                //TODO order this struecutr
                {
                    $( '<div class="player">'
                        + '<div class="play-pause play">'
                            + '<span class="play-button">&#9658;</span>'
                            + '<div class="pause-button">'
                                + '<span> </span>'
                                + '<span> </span>'
                            + '</div>'
                        + '</div>'
                        + '<div class="timebar">'
                            + '<div class="progress">'
                                + '<div class="progress-bar">'
                                    + '<div class="button-holder">'
                                        + '<div class="progress-button"> </div>'
                                    + '</div>'
                                + '</div>'
                                + '<div class="time">'
                                    + '<span class="ctime">00:00</span>'
                                    + '<span class="stime"> / </span>'
                                    + '<span class="ttime">00:00</span>'
                                + '</div>'
                            + '</div>'
                            + '<div class="contents">'
                            + '</div>'
                        + '</div>'
                        + '<div class="addContent">+'
                        + '</div>'
                        + '<div class="volume">'
                            + '<div class="volume-holder">'
                                + '<div class="volume-bar-holder">'
                                    + '<div class="volume-bar">'
                                        + '<div class="volume-button-holder">'
                                            + '<div class="volume-button"> </div>'
                                        + '</div>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                            + '<div class="volume-icon v-change-0">'
                                + '<span> </span>'
                            + '</div>'
                        + '</div>'
                        + '<div class="fullscreen"> '
                            + '<a href="#"> </a>'
                        + '</div>' 
                    + '</div>').appendTo($that);
                
                    $('<div id="addPostForm" style="width: 100%;transition: all 0.3s ease-in-out;height: 95px;position: absolute;background: #2a2a2a;top: 35px;border-radius: 5px;opacity:0;padding: 10px;box-sizing: border-box;">'
                        +'<div style="margin-right:10px;width:80px;float: left;">  <span class="label">Time on video (seconds)</span>'
                        +'<input type="text" id="inpSec" style="width:50px;margin-top:17px;">  </div>'
                        +'<div id="fileToggle" style="color: #2abfd5;margin-left: 90px;text-align: center;cursor: pointer;position: absolute;padding: 5px;border: 2px solid #2abfd5;">Add File</div>'
                        +'<input id="file" disabled style="z-index:1;margin-top:4px;margin-left:60px;position: absolute;color:#fff;" type="file" id="filePicker">'
                        +'<textarea type="text" id="inpContent" style="margin-top:18px;position: relative;float: left;resize: none;height:42px;bottom: -10px;width:300px;"/>'
                        +'<div style="float: right;width: 190px;">'
                        +'<button alt="Save new" class="btnlnk" id="saveContent">'
                        +'<svg style="width: 30px;fill: #2abfd5;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><g><path d="M580.1,854.4c-20.3,0-37,16.6-37,37s16.6,37,37,37h339c20.3,0,37-16.6,37-37V302.8c0-10.5-4.3-20.3-11.7-27.1L667,19.9c-6.8-6.2-16-9.9-25.3-9.9h-413c-20.3,0-37,16.6-37,37v400.6c0,20.3,16.6,37,37,37s37-16.6,37-37V84h295.8v320.5c0,20.3,16.6,37,37,37H876c1.8,0,4.3,0,6.2-0.6v413.6L580.1,854.4L580.1,854.4z M876,367.5H635.6V91.4l246.5,227.4v49.3C880.3,367.5,877.8,367.5,876,367.5z M43.9,798.9c0-20.3,16.6-37,37-37h110.9V644.8c0-20.3,16.6-37,37-37c20.3,0,37,16.6,37,37V762h123.3c20.3,0,37,16.6,37,37s-16.6,37-37,37H265.8V953c0,20.3-16.6,37-37,37c-20.3,0-37-16.6-37-37V835.9H80.9C60.5,835.9,43.9,819.3,43.9,798.9z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g></svg>'
                        +'</button>'
                        +'<button alt="Update" class="btnlnk" id="update">'
                        +'<svg style="width: 30px;fill: #2abfd5;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M966.7,215.5L836.1,81.7c-0.1-0.1-0.2-0.2-0.3-0.3c-15.1-15.2-35.3-23.5-56.7-23.5c-21.4,0-41.6,8.3-56.7,23.5L276.9,526.9l-37.6,282L521,774.3l445.5-445.5c15.2-15.2,23.5-35.3,23.5-56.7C990,250.7,981.7,230.6,966.7,215.5z M307.2,738.7l14.1-106l91.9,92.9L307.2,738.7z M917.9,280.2L492.4,705.6L345.2,555.9L771,130c2.9-2.9,6.3-3.4,8.1-3.4c1.8,0,5.1,0.4,8,3.3l130.5,133.7c0.1,0.1,0.2,0.2,0.3,0.3c2.9,2.9,3.4,6.3,3.4,8.1C921.3,273.8,920.8,277.2,917.9,280.2z"/><path d="M866,691.6c0-13.9-14.1-25.2-31.5-25.2S803,677.7,803,691.6c0,0.5,0,0.9,0,1.3v179.2c0,5.1-5.3,9.4-11.6,9.4h-707c-6.3,0-11.6-4.3-11.6-9.4V127.9c0-5.1,5.3-9.4,11.6-9.4h229.6c0.4,0,0.9,0,1.3,0c13.9,0,25.2-14.1,25.2-31.5c0-17.4-11.3-31.5-25.2-31.5c-0.5,0-0.9,0-1.4,0.1H84.5C43.4,55.5,10,88,10,127.9v744.3c0,39.9,33.4,72.4,74.5,72.4h707c41.1,0,74.5-32.5,74.5-72.4V693C866,692.5,866,692.1,866,691.6z"/></g></svg>'
                        +'</button>'
                        +'<button alt="Remove" class="btnlnk" id="deactivate">'
                        +'<svg style="width: 30px;fill: #2abfd5;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M316.2,806.2c16.9,0,30.6-13.7,30.6-30.6V438.7c0-16.9-13.7-30.6-30.6-30.6c-16.9,0-30.6,13.7-30.6,30.6v336.9C285.6,792.6,299.3,806.2,316.2,806.2z M500,806.2c16.9,0,30.6-13.7,30.6-30.6V438.7c0-16.9-13.7-30.6-30.6-30.6c-16.9,0-30.6,13.7-30.6,30.6v336.9C469.4,792.6,483.1,806.2,500,806.2z M683.8,806.2c16.9,0,30.6-13.7,30.6-30.6V438.7c0-16.9-13.7-30.6-30.6-30.6c-16.9,0-30.6,13.7-30.6,30.6v336.9C653.1,792.6,666.8,806.2,683.8,806.2z M836.9,101.9H710C696.3,49.2,648.8,10,591.9,10H408.1c-56.9,0-104.5,39.2-118.2,91.9H163.1c-67.6,0-122.5,55-122.5,122.5V255h30.6v30.6h61.2v581.9C132.5,935,187.4,990,255,990h490c67.6,0,122.5-55,122.5-122.5V285.6h61.2V255h30.6v-30.6C959.4,156.8,904.4,101.9,836.9,101.9z M408.1,71.3h183.8c22.5,0,42.1,12.4,52.7,30.6H355.4C366,83.7,385.6,71.3,408.1,71.3z M806.2,867.5c0,33.8-27.5,61.3-61.2,61.3H255c-33.8,0-65.5-27.5-65.5-61.3l4.2-581.9h612.5V867.5z M101.9,224.4c0-33.8,27.5-61.3,61.3-61.3h673.7c33.8,0,61.3,27.5,61.3,61.3H101.9z"/></g></svg>'
                        +'</button>'
                        +'<button alt="Clear form" class="btnlnk" id="clearForm">'
                        +'<svg style="width: 30px;fill: #2abfd5;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M740.4,401.4c-46-25.4-92.5-49.9-139.1-74.2c-36.3-18.9-73.3-19.2-110-0.9c-22,11-38.8,27.5-50.4,49.9c116.5,62,232.2,123.6,348.7,185.6c2.2-5.1,4.4-9.3,6-13.7C816.7,491.3,794.5,431.2,740.4,401.4z"/><path d="M875.6,35.1c-9.2-12.8-21.9-20.4-37.2-23.8c-16.7-3.7-26.1,0.2-35,14.3c-53,84.6-106,169.2-159,253.8c-1.7,2.7-3.2,5.4-4.8,8.1c1,1.1,1.5,2,2.3,2.4c36.2,19.3,72.4,38.6,109.1,58.2c1.3-2.1,2-3.1,2.6-4.2c41.6-93.9,83.1-187.8,124.8-281.6C882.7,52.3,881.7,43.5,875.6,35.1z"/><path d="M754.3,597.7c7.1-18.1-1.8-38.5-19.9-45.6c-18-7.2-38.5,1.7-45.6,19.8c-3.7,9.4-80.7,208.2-18.2,347.6c-29.6-0.3-76.3-7.1-141.9-31.8c-12.2-38-20.9-97.3,5.7-166.9c0,0-63.7,72.8-74.3,137.5c-13.7-6.6-28-13.8-43-21.8c-15-8.1-28.9-16-42-23.8c48.1-44.6,73.5-137.9,73.5-137.9c-43.3,60.6-97.5,86.2-135.9,97c-57.1-41.1-88.6-76.3-105.1-100.6c150.8-25,273.9-199.1,279.7-207.4c11.1-15.9,7.2-37.9-8.7-48.9c-15.9-11.2-37.8-7.2-49,8.7c-1.4,1.9-137.8,193.7-271.7,179.5c-10.4-1.1-21,2.5-28.6,10c-7.5,7.5-11.3,17.9-10.2,28.5c1.3,12.4,19.5,125.3,264.8,256.9C522.1,972.6,615.5,990,672.6,990c44.3,0,66.9-10.4,71.7-13c9.4-4.9,16-13.8,18.1-24.3c2.1-10.4-0.7-21.2-7.5-29.4C668.7,819.5,753.5,599.9,754.3,597.7z"/></g></svg>'
                        +'</button>'
                        +'<button alt="Publish" class="btnlnk" id="publish">'
                        +'<svg style="width: 30px;fill: #2abfd5;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M979.9,62.6c-4.3-3.6-9.5-5.8-14.8-6.5c-5.4-0.7-11.1,0.1-16.3,2.7L25.9,515.3c-9.5,4.7-15.6,14.3-15.9,24.9c-0.2,10.6,5.4,20.5,14.6,25.6l210.1,117.3l80.6,195.8c3.9,9.4,12.4,16,22.4,17.4c0.1,0,0.2,0,0.3,0c9.9,1.3,19.9-2.8,26-10.6l71.5-90.5L696,940.5c3.2,1.8,6.7,2.9,10.2,3.4c4.8,0.6,9.8,0,14.4-1.9c8-3.2,14.1-9.9,16.7-18.2L988.8,92.6C992.1,81.8,988.6,69.9,979.9,62.6z M99.9,542.4l712.9-352.7L269.5,638.8c-2.3-1.8-4.3-4.1-6.9-5.6L99.9,542.4z M287.6,661.4c-0.1-0.1-0.1-0.2-0.1-0.3l610.7-504.8L348.6,809.7L287.6,661.4z M692.8,873.4l-229.3-128c-5.5-3-11.4-4.6-17.2-5.7l447.2-529.2L692.8,873.4z"/></g></svg>'
                        +'</button>'
                        +'</div>'
                        +'</div>').appendTo($(".player"));
                }

                bindUIEvents();

                //TODO set only as content callback
                var currentPostId;
                setTimeout(function(){
                    for (var i = 0; i < contents.length; i++) {
                        _setContentOnPlayer(contents[i].second, contents[i].id);
                    }
                    // catch change content value
                    $("input[type='range']").on("change", function(){

                        updateContent(this.getAttribute("data-content"), $(this).val());
                        _getPosts(updateCallback);
                    });
                    
                    $("input[type='range']").on("mouseup", function(){
                        currentPostId = this.getAttribute("data-content");
                        fillFields(this);
                    });
                },1000);


                function addTimePosts(){
                    for (var i = 0; i < contents.length; i++) {
                        _setContentOnPlayer(contents[i].second, contents[i].id);
                    }
                }

                function _setContentOnPlayer(second, id){
                    $('<input type="range" value='
                        + second + ' data-content='+id
                        + ' style="width:' + progressWidth + 'px" min="0" max="' 
                        + duration + '" />').appendTo($(".contents"));
                }

                function getContentByPostId(postId){
                    for (var i = 0; i < contents.length; i++) {
                        if (contents[i].id == postId){
                            return contents[i];
                        }
                    }
                }

                

                function updateContent(postId, newSec){
                    var type = "text";
                    content = getContentByPostId(postId);

                    var cont = content.content;
                    if ($("#file").val() || content.content_type == "file"){
                        cont = $("#file")[0].files[0].name || content.content_type;
                        type = "file";
                        //upload new file
                        uploadNewFile();
                    }
                                        
                    var formData = {    
                        'id' : postId,
                        'content': cont,
                        'second': newSec,
                        'content_type':type,
                        'debug' : true
                    };
                    
                    $("#inpSec")[0].value = newSec;
                    
                    var posting = $.get( consts.SERVER+"/post/updater", formData );

                    posting.done(updateCallback);

                    
                    
                }

                function updateContentFromForm(){
                    for (var i = 0; i < contents.length; i++) {
                        if (contents[i].id == currentPostId){
                            contents[i].content = $("#inpContent")[0].value
                            contents[i].seconds = $("#inpSec")[0].value
                            contents[i].content_type = "text"
                            if ($("#file").val()){
                                contents[i].content_type = "file"
                            }
                            break;
                        }
                    }
                }

                function _updateCurrentPostId(){
                    updateContentFromForm()
                    updateContent(currentPostId, $("#inpSec")[0].value);
                }

                function _deactivate(){
                    var formData = {    
                        'id' : currentPostId,
                        'debug' : true
                    };

                    var posting = $.get( consts.SERVER+"/post/deactivate", formData );
                    
                    $("input[data-content='"+currentPostId+"']").css("display", "none");
                    for (var i = 0; i < contents.length; i++) {
                        if (contents[i].id == currentPostId){
                            currentPostId = null;
                            contents.splice(i, 1);
                            break;
                        }
                    }

                    posting.done(printData);
                }

                function fillFields(elm){
                    postId=elm.getAttribute("data-content");
                    content = getContentByPostId(postId);
                    if (content.content_type != "file"){
                        $("#inpContent").val(content.content);    
                    }else{
                        $("#inpContent").val("");
                    }
                    $("#inpSec").val(content.second);
                }


				// Width of the video
                $videoWidth = $this.width();
                $that.width($videoWidth+'px');

                // Set width of the player based on previously noted settings
                $that.find('.player').css({'width' : ($settings.playerWidth*100)+'%', 'left' : ((100-$settings.playerWidth*100)/2)+'%'});


                // Video information
                var $spc = $(this)[0]; // Specific video
                var $duration = $spc.duration; // Video Duration
                var $volume = $spc.volume; // Video volume
                var currentTime;

                // Some other misc variables to check when things are happening
                var $mclicking = false;
				var $vclicking = false;
				var $vidhover = false;
				var $volhover = false;
				var $playing = false;
				var $drop = false;
				var $begin = false;
				var $draggingProgess = false;
				var $storevol;
				var x = 0;
				var y = 0;
				var vtime = 0;
				var updProgWidth = 0;
				var volume = 0;

                // Setting the width, etc of the player
                var $volume = $spc.volume;

                // So the user cant select text in the player
                $that.bind('selectstart', function() { return false; });

                // Set some widths
                var progWidth = $that.find('.progress').width();



                var bufferLength = function() {

                    // The buffered regions of the video
                    var buffered = $spc.buffered;

                    // Rest all buffered regions everytime this function is run
                    $that.find('[class^=buffered]').remove();

                    // If buffered regions exist
                    if(buffered.length > 0) {

                        // The length of the buffered regions is i
                        var i = buffered.length;

                        while(i--) {
                            // Max and min buffers
                            $maxBuffer = buffered.end(i);
                            $minBuffer = buffered.start(i);

                            // The offset and width of buffered area				
                            var bufferOffset = ($minBuffer / $duration) * 100;
                            var bufferWidth = (($maxBuffer - $minBuffer) / $duration) * 100;

                            // Append the buffered regions to the video
                            $('<div class="buffered"></div>').css({"left" : bufferOffset+'%', 'width' : bufferWidth+'%'}).appendTo($that.find('.progress'));

                        }
                    }
                }

                // Run the buffer function
                bufferLength();
                $("#inpSec").dblclick(_setCurrentTime);
                $("#saveContent").bind('click',_saveContent);
                $("#update").bind('click',_updateCurrentPostId);
                $("#deactivate").bind('click',_deactivate);

                function _saveContent(){
                    // if 
                    var type = "text"
                    var cont = $("#inpContent")[0].value
                    if ($("#file").val()){
                        type = "file"
                        cont = $("#file")[0].files[0].name
                    }

                    contents.push({"second":$("#inpSec")[0].value,"content":cont,"content_type":type})
					_setContentOnPlayer($("#inpSec")[0].value, 3, progressWidth, duration);
                    printData();
                    if ($("#file").val()){
                        _addFileToDB($("#inpSec")[0].value, $("#file").val());
                    }else{
                        _addContentToDB($("#inpSec")[0].value, $("#inpContent")[0].value);
                    }
                }

                function _setCurrentTime(){
                	$("#inpSec")[0].value = Math.round($spc.currentTime);

                }

                function showNewPostForm(){
                    $that.find('.addContent').css("background-color","#4f4f4f");
                    $that.find('#addPostForm').css("display","block");
                    setTimeout(function(){
                        $that.find('#addPostForm').css("opacity","1");
                    },0)
                }

                function hideNewPostForm(){
                    $that.find('.addContent').css("background-color","#2a2a2a");
                    $that.find('#addPostForm').css("opacity","0");
                    setTimeout(function(){
                        $that.find('#addPostForm').css("display","none");
                    },300);
                }

                // The timing function, updates the time.
                var timeUpdate = function($ignore) {

                    // The current time of the video based on progress bar position
                    var time = Math.round(($('.progress-bar').width() / progWidth) * $duration);

                    // The 'real' time of the video
                    var curTime = $spc.currentTime;

                    // Seconds are set to 0 by default, minutes are the time divided by 60
                    // tminutes and tseconds are the total mins and seconds.
                    var seconds = 0,
                        minutes = Math.floor(time / 60),
                        tminutes = Math.round($duration / 60),
                        tseconds = Math.round(($duration) - (tminutes*60));

                    // If time exists (well, video time)
                    if(time) {
                        // seconds are equal to the time minus the minutes
                        seconds = Math.round(time) - (60*minutes);

                        // So if seconds go above 59
                        if(seconds > 59) {
                            // Increase minutes, reset seconds
                            seconds = Math.round(time) - (60*minutes);
                            if(seconds == 60) {
                                minutes = Math.round(time / 60);
                                seconds = 0;
                            }
                        }

                    }

                    // Updated progress width
                    updProgWidth = (curTime / $duration) * progWidth

                    // Set a zero before the number if its less than 10.
                    if(seconds < 10) { seconds = '0'+seconds; }
                    if(tseconds < 10) { tseconds = '0'+tseconds; }

                    // A variable set which we'll use later on
                    if($ignore != true) {
                        $that.find('.progress-bar').css({'width' : updProgWidth+'px'});
                        $that.find('.progress-button').css({'left' : (updProgWidth-10-$that.find('.progress-button').width())+'px'});
                    }

                    // Update times
                    $that.find('.ctime').html(minutes+':'+seconds)
                    $that.find('.ttime').html(tminutes+':'+tseconds);

                    // If playing update buffer value
                    if($spc.currentTime > 0 && $spc.paused == false && $spc.ended == false) {
                        bufferLength();
                    }
                }

                // Run the timing function twice, once on init and again when the time updates.
                timeUpdate();
                $spc.addEventListener('timeupdate', timeUpdate);

                // When the user clicks play, bind a click event	
                $that.find('.play-pause').bind('click', function() {

                    // Set up a playing variable
                    if($spc.currentTime > 0 && $spc.paused == false && $spc.ended == false) {
                        $playing = false;
                    } else { $playing = true; }

                    // If playing, etc, change classes to show pause or play button
                    if($playing == false) {
                        $spc.pause();
                        $(this).addClass('play').removeClass('pause');
                        bufferLength();
                    } else {
                        $begin = true;
                        $spc.play();
                        $(this).addClass('pause').removeClass('play');
                    }
                });


                // Bind a function to the progress bar so the user can select a point in the video
                $that.find('.progress').bind('mousedown', function(e) {
                    // Progress bar is being clicked
                    $mclicking = true;

                    // If video is playing then pause while we change time of the video
                    if($playing == true) {
                        $spc.pause();
                    }

                    // The x position of the mouse in the progress bar 
                    x = e.pageX - $that.find('.progress').offset().left;

                    // Update current time
                    currentTime = (x / progWidth) * $duration;

                    $spc.currentTime = currentTime;
                });

                

                // When the user clicks on the volume bar holder, initiate the volume change event
                $that.find('.volume-bar-holder').bind('mousedown', function(e) {

                    // Clicking of volume is true
                    $vclicking = true;

                    // Y position of mouse in volume slider
                    y = $that.find('.volume-bar-holder').height() - (e.pageY - $that.find('.volume-bar-holder').offset().top);

                    // Return false if user tries to click outside volume area
                    if(y < 0 || y > $(this).height()) {
                        $vclicking = false;
                        return false;
                    }

                    // Update CSS to reflect what's happened
                    $that.find('.volume-bar').css({'height' : y+'px'});
                    $that.find('.volume-button').css({'top' : (y-($that.find('.volume-button').height()/2))+'px'});

                    // Update some variables
                    $spc.volume = $that.find('.volume-bar').height() / $(this).height();
                    $storevol = $that.find('.volume-bar').height() / $(this).height();
                    $volume = $that.find('.volume-bar').height() / $(this).height();

                    // Run a little animation for the volume icon.
                    volanim();
                });

                // A quick function for binding the animation of the volume icon
                var volanim = function() {

                    // Check where volume is and update class depending on that.
                    for(var i = 0; i < 1; i += 0.1) {

                        var fi = parseInt(Math.floor(i*10)) / 10;
                        var volid = (fi * 10)+1;

                        if($volume == 1) {
                            if($volhover == true) {
                                $that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-11');
                            } else {
                                $that.find('.volume-icon').removeClass().addClass('volume-icon v-change-11');
                            }
                        }
                        else if($volume == 0) {
                            if($volhover == true) {
                                $that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-1');
                            } else {
                                $that.find('.volume-icon').removeClass().addClass('volume-icon v-change-1');
                            }
                        }
                        else if($volume > (fi-0.1) && volume < fi && !$that.find('.volume-icon').hasClass('v-change-'+volid)) {
                            if($volhover == true) {
                                $that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-'+volid);
                            } else {
                                $that.find('.volume-icon').removeClass().addClass('volume-icon v-change-'+volid);
                            }
                        }

                    }
                }
                // Run the volanim function
                volanim();

                var formVisibile = function() {
                    var myform = false;
                    $that.find('#addPostForm').mouseenter(function() {
                        myform = true;
                    });

                    $that.find('#addPostForm').mouseleave(function() {
                        setTimeout(function(){
                            if (!myform && !formLock){
                                hideNewPostForm();
                            }
                        },10);
                        myform = false;
                    });

                    $that.find('.addContent').hover(function() {
                        myform = true;
                        showNewPostForm();
                    });

                    $that.find('.addContent').mouseleave(function() {
                        setTimeout(function(){
                            if (!myform && !formLock){
                                hideNewPostForm();
                            }
                        },10);
                        myform = false;
                    });
                    var formLock = false;
                    $that.find('.addContent').click(function () {
                        formLock = !formLock;
                        if (formLock){
                            showNewPostForm();
                        }
                    });
                }

                // form handleing so it will be easier to work with.
                formVisibile()
                
                // Check if the user is hovering over the volume button
                $that.find('.volume').hover(function() {
                    $volhover = true;
                }, function() {
                    $volhover = false;
                });

                
                // For usability purposes then bind a function to the body assuming that the user has clicked mouse
                // down on the progress bar or volume bar
                $('body, html').bind('mousemove', function(e) {
                    // Hide the player if video has been played and user hovers away from video
                    if($begin == true) {
                        $that.hover(function() {
                            $that.find('.player').stop(true, false).animate({'opacity' : '1'}, 0.5);
                        }, function() {
                            $that.find('.player').stop(true, false).animate({'opacity' : '0'}, 0.5);
                        });
                    }

                    // For the progress bar controls
                    if($mclicking == true) {

                        // Dragging is happening
                        $draggingProgress = true;
                        // The thing we're going to apply to the CSS (changes based on conditional statements);
                        var progMove = 0;
                        // Width of the progress button (a little button at the end of the progress bar)
                        var buttonWidth = $that.find('.progress-button').width();

                        // Updated x posititon the user is at
                        x = e.pageX - $that.find('.progress').offset().left;

                        // If video is playing
                        if($playing == true) {
                            // And the current time is less than the duration				
                            if(currentTime < $duration) {
                                // Then the play-pause icon should definitely be a pause button 
                                $that.find('.play-pause').addClass('pause').removeClass('play');
                            }
                        }


                        if(x < 0) { // If x is less than 0 then move the progress bar 0px
                            progMove = 0;
                            $spc.currentTime = 0;
                        }
                        else if(x > progWidth) { // If x is more than the progress bar width then set progMove to progWidth
                            $spc.currentTime = $duration;
                            progMove = progWidth;
                        }
                        else { // Otherwise progMove is equal to the mouse x coordinate
                            progMove = x;
                            currentTime = (x / progWidth) * $duration;
                            $spc.currentTime = currentTime;
                        }

                        // Change CSS based on previous conditional statement
                        $that.find('.progress-bar').css({'width' : $progMove+'px'});
                        $that.find('.progress-button').css({'left' : ($progMove-buttonWidth)+'px'});

                    }

                    // For the volume controls
                    if($vclicking == true) {

                        // The position of the mouse on the volume slider
                        y = $that.find('.volume-bar-holder').height() - (e.pageY - $that.find('.volume-bar-holder').offset().top);

                        // The position the user is moving to on the slider.
                        var volMove = 0;

                        // If the volume holder box is hidden then just return false
                        if($that.find('.volume-holder').css('display') == 'none') {
                            $vclicking = false;
                            return false;
                        }

                        // Add the hover class to the volume icon
                        if(!$that.find('.volume-icon').hasClass('volume-icon-hover')) {
                            $that.find('.volume-icon').addClass('volume-icon-hover');
                        }


                        if(y < 0 || y == 0) { // If y is less than 0 or equal to 0 then volMove is 0.

                            $volume = 0;
                            volMove = 0;

                            $that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-11');

                        } else if(y > $(this).find('.volume-bar-holder').height() || (y / $that.find('.volume-bar-holder').height()) == 1) { // If y is more than the height then volMove is equal to the height

                            $volume = 1;
                            volMove = $that.find('.volume-bar-holder').height();

                            $that.find('.volume-icon').removeClass().addClass('volume-icon volume-icon-hover v-change-1');

                        } else { // Otherwise volMove is just y

                            $volume = $that.find('.volume-bar').height() / $that.find('.volume-bar-holder').height();
                            volMove = y;

                        }

                        // Adjust the CSS based on the previous conditional statmeent
                        $that.find('.volume-bar').css({'height' : volMove+'px'});
                        $that.find('.volume-button').css({'top' : (volMove+$that.find('.volume-button').height())+'px'});

                        // Run the animation function
                        volanim();

                        // Change the volume and store volume
                        // Store volume is the volume the user last had in place
                        // in case they want to mute the video, unmuting will then
                        // return the user to their previous volume.
                        $spc.volume = $volume;
                        $storevol = $volume;
                    }

                    // If the user hovers over the volume controls, then fade in or out the volume
                    // icon hover class
                    if($volhover == false) {
                        $that.find('.volume-holder').stop(true, false).fadeOut(100);
                        $that.find('.volume-icon').removeClass('volume-icon-hover');
                    } else {
                        $that.find('.volume-icon').addClass('volume-icon-hover');
                        $that.find('.volume-holder').fadeIn(100);
                    }
                })

                // When the video ends the play button becomes a pause button
                $spc.addEventListener('ended', function() {

                    $playing = false;

                    // If the user is not dragging
                    if($draggingProgress == false) {
                        $that.find('.play-pause').addClass('play').removeClass('pause');
                    }
                });

                // If the user clicks on the volume icon, mute the video, store previous volume, and then
                // show previous volume should they click on it again.
                $that.find('.volume-icon').bind('mousedown', function() {

                    $volume = $spc.volume; // Update volume

                    // If volume is undefined then the store volume is the current volume
                    if(typeof $storevol == 'undefined') {
                        $storevol = $spc.volume;
                    }

                    // If volume is more than 0
                    if($volume > 0) {
                        // then the user wants to mute the video, so volume will become 0
                        $spc.volume = 0;
                        $volume = 0;
                        $that.find('.volume-bar').css({'height' : '0'});
                        volanim();
                    }
                    else {
                        // Otherwise user is unmuting video, so volume is now store volume.
                        $spc.volume = $storevol;
                        $volume = $storevol;
                        $that.find('.volume-bar').css({'height' : ($storevol*100)+'%'});
                        volanim();
                    }
                });

                // If the user lets go of the mouse, clicking is false for both volume and progress.
                // Also the video will begin playing if it was playing before the drag process began.
                // We're also running the bufferLength function
                $('body, html').bind('mouseup', function(e) {

                    $mclicking = false;
                    $vclicking = false;
                    $draggingProgress = false;

                    if($playing == true) {
                        $spc.play();
                    }

                    bufferLength();
                });

                // Check if fullscreen supported. If it's not just don't show the fullscreen icon.
                if(!$spc.requestFullscreen && !$spc.mozRequestFullScreen && !$spc.webkitRequestFullScreen) {
                    $('.fullscreen').hide();
                }

                // Requests fullscreen based on browser.
                $('.fullscreen').click(function() {

                    if ($spc.requestFullscreen) {
                        $spc.requestFullscreen();
                    }

                    else if ($spc.mozRequestFullScreen) {
                        $spc.mozRequestFullScreen();
                    }

                    else if ($spc.webkitRequestFullScreen) {
                        $spc.webkitRequestFullScreen();
                    }
                });
            });

        });
    }
})(jQuery);
