# btcexplorer.org
 Block Explorer

You can view a live version of the website at btcexplorer.org

This website uses the btc.com API, as well as the chart.js library and bootstrap

- https://www.btc.com/api-doc
- https://www.chartjs.org/
- https://getbootstrap.com

If running locally, internet access is required to receive data from the API. To run locally, open the index.html file contained within this (main) project folder.

## Homepage

The homepage displays the latest block data in a mixed-type chart using chart.js, allowing the user to visualize the average transaction fee and total transactions for each block. Below the chart is a table displaying the same data, as well as total transaction fees paid for each block (reward fees) and the pool responsible for mining the block (with link to pool's website, if available).

## Search Page

To access the search page, click on the search button in the top menu. Here you will be prompted to either enter a block height, or alternatively, you can pick a random block. You will then see a message confirming that the API call was successful or failed. If successful, block data will populate a responsive table below the success message.

