var contents = [];

function getContent(sec){
	var result = contents[0];
	for (var i = 0; i < contents.length; i++) {
		curCon = contents[i];
		result = curCon;
		if (curCon.second<sec){
			continue;
		}
		if (curCon.second > sec){
			result = curCon;
			break;
		}
	};
	return result;
}

function setText(res){
	$("#preview").html(res.content);
}

function setFile(res){
	var fileType = res.content.substr(res.content.lastIndexOf('.')).toLowerCase();
	if (fileType == ".png" || fileType == ".jpg" || fileType == ".jpeg" || fileType == ".gif"){
		//TODO change the file path of the production
		$("#preview").html('<img style="width:200px;height:200px;" src="file:///Users/meschiany/Developer/lecturus/app/assets/uploads/'+res.video_id+'/'+res.content+'">');
	}else{
		$("#preview").html('<a target="_blank" style="width:200px;height:200px;" href="file:///Users/meschiany/Developer/lecturus/app/assets/uploads/'+res.video_id+'/'+res.content+'">View/Download file:'+res.content+' </a>');
	}
	
}

function setPreview(){
	if (contents.length === 0){
		return;
	}
	var res = getContent(vit.currentTime);
	switch (res.content_type){
		case "text":
			setText(res);
			break;
		case "file":
			setFile(res);
			break;
	}
}

function printData(){
	$("#contents").html("");
	contents.sort(sortfunction);
	if (contents.length === 0){
		return;
	}
	if (contents[0].content_type == "text"){
		$("#contents").append(contents[0].content);		
	}else{
		$("#contents").append("FILE NAME: "+ contents[0].content);	
	}
	
	for (var i = 1; i < contents.length; i++) {
		$("#contents").append("<div class=lineSep></div>");
		if (contents[i].content_type == "text"){
			$("#contents").append(contents[i].content);		
		}else{
			$("#contents").append("FILE NAME: "+contents[i].content);	
		}
	}
}