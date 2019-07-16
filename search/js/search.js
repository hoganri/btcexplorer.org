var submitBtn = document.getElementById('searchBlocks');
submitBtn.addEventListener('click', function() {
	var height = parseInt(document.getElementById('blockHeight').value);
	searchBlocks(height);
});

var randBtn = document.getElementById('randomBlocks');
randBtn.addEventListener('click', function() {
	var height = Math.floor(Math.random() * (585723 - 0 + 1) ) + 0;
	document.getElementById('blockHeight').value=height;
	searchBlocks(height);
});


/*
All functions below
*/

// Search blocks
function searchBlocks(data){
	document.getElementById('errorRow').style.display="none";
	document.getElementById('results').style.display="none";
	url = "https://chain.api.btc.com/v3/block/"+data;
	var blockInfo = new XMLHttpRequest();
	blockInfo.open("GET", url);
	blockInfo.onload = function() {
		if (JSON.parse(blockInfo.responseText)['data'] == null){
			displayErr();
		} else {
			displayBlock(JSON.parse(blockInfo.responseText));		
		}
	}
	blockInfo.send();
}
// Display search block error
function displayErr(){
	document.getElementById('errorRow').style.display="block";
}
// Display block data
function displayBlock(data){
	data = data['data'];
	convertTime(data['curr_max_timestamp']);
	document.getElementById('height').innerText=data['height'];
	document.getElementById('confirmations').innerText=data['confirmations'];
	document.getElementById('size').innerText=data['size'];
	document.getElementById('stripped_size').innerText=data['stripped_size'];
	document.getElementById('weight').innerText=data['weight'];
	document.getElementById('tx_count').innerText=data['confirmations'];
	document.getElementById('confirmations').innerText=data['tx_count'];
	var total_reward = (data['reward_block']+data['reward_fees'])/100000000;
	document.getElementById('reward_fees').innerText=total_reward;
	document.getElementById('bits').innerText=data['bits'];
	document.getElementById('nonce').innerText=data['nonce'];
	document.getElementById('version').innerText=data['version'];
	if (data['extras']['pool_name'] == 'unknown'){
		document.getElementById('minedBy').innerHTML="<a href='#'>"+data['extras']['pool_name']+"</a>";
	} else {
		document.getElementById('minedBy').innerHTML="<a href='"+data['extras']['pool_link']+"'>"+data['extras']['pool_name']+"</a>";
	}
	document.getElementById('hash').innerText=data['hash'];
	document.getElementById('root').innerText=data['mrkl_root'];
	document.getElementById('results').style.display="block";
}
function convertTime(timeStamp){
	// Unixtimestamp
	var unixtimestamp = timeStamp;
	var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	// Convert timestamp to milliseconds
	var date = new Date(unixtimestamp*1000);
	var year = date.getFullYear();
	var month = months_arr[date.getMonth()];
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	document.getElementById('time').innerHTML = convdataTime;
}