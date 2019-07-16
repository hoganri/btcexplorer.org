var latestBlock = '';
window.onload = function() {
	url = "https://chain.api.btc.com/v3/block/latest";
	var blockHeight = new XMLHttpRequest();
	blockHeight.open("GET", url);
	blockHeight.onload = function() {
		var currentHeight = JSON.parse(blockHeight.responseText);
		latestBlock = currentHeight['data']['height'];
	}
	blockHeight.send();
}
setTimeout(function() {
	getInfo(10, latestBlock);
}, 2000);

var blockCount = document.getElementById('blockCount');

// Pull new data on select change
blockCount.addEventListener('change', function() {
	var blockAmount = parseInt(blockCount.value);
	getInfo(blockAmount, latestBlock);
});

/*
All functions below
*/

// Get data based on amount user has selected
function getInfo(blocks, latestBlock) {
	url = "https://chain.api.btc.com/v3/block/latest";
	var x = blocks;
	var y = latestBlock-x;
	var i = 1;
	while (i < blocks) {
		url += ","+(latestBlock-i);
		i+=1;
	}
	console.log(url);
	var blockInfo = new XMLHttpRequest();
	blockInfo.open("GET", url);
	blockInfo.onload = function() {
		var ourInfo = JSON.parse(blockInfo.responseText);
		addInfo(ourInfo);
	}
	blockInfo.send();
}

// Add the info to the DOM
function addInfo(data) {
	document.getElementById('table').innerText='';
	document.getElementById('table').innerHTML="<thead><tr><th style='font-weight:600;'>Height</th><th style='font-weight:600;'>Transactions</th><th style='font-weight:600;'>Reward Fees</th><th style='font-weight:600;'>Average Fee per Transaction</th><th style='font-weight:600;'>Mined By</th></tr></thead>";
	var htmlString = "";
	var data = data['data'];
	var transactionsArr = [];
	var sizeArr = [];
	var heightsArr = [];
	for (var i in data) {
		htmlString += "<tr>";
		htmlString += "<td style='font-weight:600;'>"+ data[i]['height'] + "</td>";
		heightsArr.push(data[i]['height']);
		htmlString += "<td>"+ data[i]['tx_count'] + "</td>";
		transactionsArr.push(data[i]['tx_count']);
		htmlString += "<td>"+ data[i]['reward_fees']/100000000 +"</td>";
		htmlString += "<td>"+ ((data[i]['reward_fees']/100000000)/data[i]['tx_count']).toFixed(8) +"</td>";
		sizeArr.push(((data[i]['reward_fees']/100000000)/data[i]['tx_count']).toFixed(8));
		htmlString += "<td><a href="+(data[i]['extras']['pool_link'])+">"+(data[i]['extras']['pool_name'])+"</a></td>";
		htmlString += "</tr>";
		i++;
	}
	document.getElementById('table').insertAdjacentHTML('beforeend', htmlString);
	document.getElementById('chartHolder').innerHTML = '&nbsp;';
	document.getElementById("chartHolder").innerHTML = '<canvas id="myChart" width="800px" height="180px"></canvas>';
	startChart(transactionsArr, heightsArr, sizeArr);
}

// Display data in the chart
function startChart(transactions, heights, sizes){
	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
	    data: {
	        datasets: [{
	            label: 'Transaction Count',
	            data: transactions.reverse(),
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 0.2)',
				pointBackgroundColor: 'rgba(75, 192, 192, 0.2)',
				type: 'line',
				fill: false,
				yAxisID: 'left-y-axis'
	        },{
	        	label: 'Average Tx Fee',
				data: sizes.reverse(),
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				yAxisID: 'right-y-axis'
	        }],
	        labels: heights.reverse()
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                id: 'left-y-axis',
	                type: 'linear',
	                position: 'left',
	                gridLines: {
                        display:false
                    }
	            }, {
	                id: 'right-y-axis',
	                type: 'linear',
	                position: 'right',
	                gridLines: {
                        display:false
                    }
	            }],
	        },
	    }
	});
}